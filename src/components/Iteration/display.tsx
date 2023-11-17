import React, { useEffect, useState } from "react";
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
import { ICreateTaskRequest } from "@/interfaces/task";

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
    statusId: "",
  });
  const { projectId } = useParams();
  const {
    openView: isModalCreateTaskOpen,
    onCloseView: onCloseCreateTaskModal,
    onOpenView: onOpenCreateTaskModal,
    detail: initTaskData,
  } = useDetailView<Partial<ICreateTaskRequest>>();

  const handleOpenCreateTaskModal = (
    initData: Partial<ICreateTaskRequest> = {}
  ) => {
    onOpenCreateTaskModal({
      ...initData,
      interationId: iterationId,
    });
  };

  const { data: iteration, refetch: refetchIteration } = useQuery({
    queryKey: [iterationApi.getTasksKey, iterationId],
    queryFn: ({ signal }) => iterationApi.getTasks(signal, iterationId),
  });

  useEffect(() => {
    if (iteration) {
      setSelectedIteration(iteration);
    }
  }, [iteration]);

  const { data: statusList } = useQuery({
    queryKey: [taskApi.getTaskStatusesKey, projectId],
    queryFn: ({ signal }) => taskApi.getTaskStatuses(signal, projectId!),
    initialData: [],
  });

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
  const queryClient = useQueryClient();

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
          },
          {
            onSuccess: () => {
              toast.success("Change task status succeed!");
            },
            onError: () => {
              toast.error("Change task status failed!");
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
  if (selectedIteration)
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
              options={statusList.map((status) => ({
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
            <div className="flex flex-grow justify-end">
              <Button
                icon={<PlusOutlined />}
                onClick={() => handleOpenCreateTaskModal()}
              >
                New task
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-x-4">
              <div className="p-2">
                <h4
                  className="select-none cursor-pointer w-56"
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
              {statusList.map((status) => (
                <div
                  className="basis-[250px] rounded p-2 shrink-0"
                  key={status.boardStatusId}
                >
                  <h4>{status.title}</h4>
                </div>
              ))}
            </div>
            {selectedIteration.tasks.map((task) => (
              <div
                key={task.taskId}
                className="py-4 border-0 border-b border-solid border-neutral-300 w-fit"
              >
                <MainTaskDisplay
                  task={task}
                  statusList={statusList}
                  isCollapsed={collapsedTasks.includes(task.taskId)}
                  onToggleCollapseTask={() => onToggleCollapseTask(task.taskId)}
                  onOpenCreateTaskModal={handleOpenCreateTaskModal}
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
      </>
    );
  return null;
};

export default IterationDisplay;
