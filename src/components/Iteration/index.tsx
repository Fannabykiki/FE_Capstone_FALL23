import React, { useEffect, useState, useMemo } from "react";
import {
  DragDropContext,
  OnDragEndResponder,
  DragDropContextProps,
} from "react-beautiful-dnd";
import MainTaskDisplay from "./MainTaskDisplay";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "@/utils/api/task";
import { iterationApi } from "@/utils/api/iteration";
import useTaskActions from "@/hooks/useTaskActions";
import { Button, Input, Select } from "antd";
import { toast } from "react-toastify";
import { IIteration } from "@/interfaces/iteration";
import useDetailView from "@/hooks/useDetailView";
import { CreateTask } from "../Modal";
import { ICreateTaskRequest, ITask } from "@/interfaces/task";
import TaskDetail from "../Task/Detail";
import { classNames } from "@/utils/common";
import { IProject } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { useAuthContext } from "@/context/Auth";
import SubTaskNoParentDisplay from "./SubTaskNoParentDisplay";

export enum TaskType {
  Main = "Work Item",
  Bug = "Bug",
  Task = "Task",
}
const DragDropContextComponent =
  DragDropContext as React.ComponentClass<DragDropContextProps>;
interface Props {
  iterationId: string;
}

const IterationDisplay = ({ iterationId }: Props) => {
  const [collapsedTasks, setCollapsedTasks] = useState<string[]>([]);
  const [selectedIteration, setSelectedIteration] = useState<IIteration>();
  const [filterData, setFilterData] = useState({
    name: "",
    statusId: null,
  });

  const queryClient = useQueryClient();

  const { projectId } = useParams();
  const {
    openView: isModalCreateTaskOpen,
    onCloseView: onCloseCreateTaskModal,
    onOpenView: onOpenCreateTaskModal,
    detail: initTaskData,
  } = useDetailView<Partial<ICreateTaskRequest>>();
  const {
    openView: isModalDetailTaskOpen,
    onOpenView: onOpenViewDetailTask,
    onCloseView: onCloseViewDetailTask,
    detail: taskId,
  } = useDetailView<string>();

  const handleOpenCreateTaskModal = (
    initData: Partial<ICreateTaskRequest> = {}
  ) => {
    onOpenCreateTaskModal({
      ...initData,
      interationId: iterationId,
    });
  };

  const { data: statusList } = useQuery({
    queryKey: [taskApi.getTaskStatusKey, projectId, "Iteration"],
    queryFn: ({ signal }) => taskApi.getTaskStatus(signal, projectId),
    initialData: [],
  });

  const { data: iteration, refetch: refetchIteration } = useQuery({
    queryKey: [iterationApi.getTasksKey, iterationId],
    queryFn: ({ signal }) => iterationApi.getTasks(signal, iterationId),
  });

  useEffect(() => {
    if (iteration) {
      setSelectedIteration(iteration);
    }
  }, [iteration]);

  const onToggleCollapseTask = (taskId: string) => {
    setCollapsedTasks((c) => {
      if (c.includes(taskId)) {
        return c.filter((task) => task !== taskId);
      }
      return [...c, taskId];
    });
  };

  const onToggleCollapseAllTask = () => {
    if (collapsedTasks.length === selectedIteration!.tasks.length) {
      setCollapsedTasks([]);
    } else {
      setCollapsedTasks(selectedIteration!.tasks.map((task) => task.taskId));
    }
  };

  const { changeTaskStatusMutation } = useTaskActions();

  const project: IProject | undefined = queryClient.getQueryData([
    projectApi.getInfoKey,
    projectId,
  ]);

  const { userInfo } = useAuthContext();

  const member = useMemo(() => {
    return project?.projectMembers.find((mem) => mem.userId === userInfo!.id);
  }, [userInfo, project]);

  const onDragEnd: OnDragEndResponder = (result) => {
    if (selectedIteration) {
      const { source, destination, draggableId } = result;
      // Dropped outside the list
      if (!destination) {
        return;
      }

      const sourceTask = selectedIteration.tasks.find(
        (task) =>
          task.subTask?.some((subtask) => subtask.taskId === draggableId)
      );

      // Moving within the same list
      if (source.droppableId !== destination.droppableId) {
        // Moving to a different status
        const newStatusId = destination.droppableId.split("/")[1];
        const selectedSubtask = sourceTask!.subTask!.find(
          (subtask) => subtask.taskId === draggableId
        );
        const originalIteration = { ...selectedIteration };
        setSelectedIteration((c) => {
          return {
            ...c!,
            tasks: c!.tasks.map((task) => {
              if (task.taskId === sourceTask!.taskId) {
                return {
                  ...task,
                  subTask: task.subTask!.map((subTask) => {
                    if (subTask.taskId === selectedSubtask!.taskId) {
                      return { ...selectedSubtask!, statusId: newStatusId }!;
                    }
                    return subTask;
                  }),
                };
              }
              return task;
            }),
          };
        });
        changeTaskStatusMutation.mutate(
          {
            id: selectedSubtask!.taskId,
            statusId: newStatusId,
            memberId: member?.memberId || "",
          },
          {
            onSuccess: () => {
              toast.success("Change task status succeed!");
            },
            onError: () => {
              toast.error("Change task status failed!");
              setSelectedIteration(originalIteration);
            },
            onSettled: () => {
              queryClient
                .invalidateQueries({
                  queryKey: [iterationApi.getTasksKey, iterationId],
                })
                .then(() =>
                  queryClient.refetchQueries({
                    queryKey: [iterationApi.getTasksKey, iterationId],
                  })
                );
            },
          }
        );
      }
    }
  };

  if (selectedIteration) {
    const deletedTasks = selectedIteration.tasks.filter(
      (task) => task.isDelete
    );
    const subTaskNoParent: ITask[] = [];
    deletedTasks.forEach((task) => subTaskNoParent.push(...task.subTask!));

    return (
      <>
        <DragDropContextComponent onDragEnd={onDragEnd}>
          <div className="flex gap-x-2 mb-2">
            <Input
              placeholder="Filter by task name"
              className="w-[200px]"
              value={filterData.name}
              onChange={(e) =>
                setFilterData((c) => ({ ...c, name: e.target.value }))
              }
            />
            <Select
              options={statusList
                .filter((status) => status.title !== "Deleted")
                .map((status) => ({
                  label: status.title,
                  value: status.boardStatusId,
                }))}
              placeholder="Filter by status"
              className="min-w-[200px]"
              onChange={(statusId) =>
                setFilterData((c) => ({ ...c, statusId }))
              }
              allowClear
              value={filterData.statusId}
            />
            {project?.projectStatus !== "Done" && (
              <div className="flex flex-grow justify-end">
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => handleOpenCreateTaskModal()}
                >
                  New task
                </Button>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-x-4 items-center">
              <div>
                <h4
                  className="select-none cursor-pointer w-56 mb-0"
                  onClick={onToggleCollapseAllTask}
                >
                  {collapsedTasks.length === selectedIteration.tasks.length ? (
                    <DoubleRightOutlined className="rotate-90" />
                  ) : (
                    <DoubleLeftOutlined className="rotate-90" />
                  )}{" "}
                  Collapse all
                </h4>
              </div>
              <div
                className={classNames(
                  "flex gap-x-4 items-center flex-grow rounded"
                )}
              >
                {statusList
                  .filter((status) => status.title !== "Deleted")
                  .map((status, index) => (
                    <div
                      key={status.boardStatusId}
                      className="w-[240px] shrink-0"
                    >
                      <div>
                        <h4 className="mb-0">{status.title}</h4>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div
              className={classNames(
                "py-4 border-0 border-b border-solid border-neutral-300 w-fit"
                // !collapsedTasks.includes(task.taskId) && "w-fit"
              )}
            >
              <SubTaskNoParentDisplay
                statusList={statusList}
                onViewTask={onOpenViewDetailTask}
                filterData={filterData}
                subTasks={subTaskNoParent}
              />
            </div>
            {selectedIteration.tasks
              .filter((task) => !task.isDelete)
              .map((task) => (
                <div
                  key={task.taskId}
                  className={classNames(
                    "py-4 border-0 border-b border-solid border-neutral-300",
                    !collapsedTasks.includes(task.taskId) && "w-fit"
                  )}
                >
                  <MainTaskDisplay
                    task={task}
                    statusList={statusList}
                    isCollapsed={collapsedTasks.includes(task.taskId)}
                    onToggleCollapseTask={() =>
                      onToggleCollapseTask(task.taskId)
                    }
                    onOpenCreateTaskModal={handleOpenCreateTaskModal}
                    onViewTask={onOpenViewDetailTask}
                    filterData={filterData}
                  />
                </div>
              ))}
          </div>
        </DragDropContextComponent>
        {isModalCreateTaskOpen && (
          <CreateTask
            isOpen={isModalCreateTaskOpen}
            handleClose={onCloseCreateTaskModal}
            initTaskData={initTaskData || undefined}
            onSuccess={() => refetchIteration()}
          />
        )}
        {isModalDetailTaskOpen && (
          <TaskDetail
            taskId={taskId || ""}
            isOpen={isModalDetailTaskOpen}
            onClose={onCloseViewDetailTask}
          />
        )}
      </>
    );
  }
  return null;
};

export default IterationDisplay;
