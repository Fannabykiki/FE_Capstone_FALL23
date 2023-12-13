import React, { useState, useMemo } from "react";
import {
  DragDropContext,
  OnDragEndResponder,
  DragDropContextProps,
  Draggable,
  Droppable,
  DroppableProps,
  DraggableProps,
} from "react-beautiful-dnd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "@/utils/api/task";
import useTaskActions from "@/hooks/useTaskActions";
import { Button, Input, Select, Typography } from "antd";
import { toast } from "react-toastify";
import useDetailView from "@/hooks/useDetailView";
import { CreateTask } from "../Modal";
import { ICreateTaskRequest } from "@/interfaces/task";
import TaskDetail from "../Task/Detail";
import { classNames } from "@/utils/common";
import { IProject } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { useAuthContext } from "@/context/Auth";
import { sortBy } from "lodash";
import TaskDraggableDisplay from "./TaskDraggableDisplay";
import useDebounceValue from "@/hooks/useDebounceValue";

export enum TaskType {
  Main = "Work Item",
  Bug = "Bug",
  Task = "Task",
}
const DragDropContextComponent =
  DragDropContext as React.ComponentClass<DragDropContextProps>;
const DraggableComponent = Draggable as React.ComponentClass<DraggableProps>;
const DroppableComponent = Droppable as React.ComponentClass<DroppableProps>;

const KanbanDisplay = () => {
  const { projectId } = useParams();

  const { data: tasks, refetch: refetchTasks } = useQuery({
    queryKey: [taskApi.getKanbanTasksKey, projectId],
    queryFn: ({ signal }) => taskApi.getKanbanTasks(signal, projectId!),
    enabled: Boolean(projectId),
    placeholderData: [],
  });

  const [filterData, setFilterData] = useState({
    name: "",
    statusId: null,
  });

  const queryClient = useQueryClient();

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

  const { data: statusList } = useQuery({
    queryKey: [taskApi.getTaskStatusKey, projectId, "kanban"],
    queryFn: ({ signal }) => taskApi.getTaskStatus(signal, projectId),
    initialData: [],
  });

  const { changeTaskStatusMutation, updateStatusOrderMutation } =
    useTaskActions();

  const project: IProject | undefined = queryClient.getQueryData([
    projectApi.getInfoKey,
    projectId,
  ]);

  const { userInfo } = useAuthContext();

  const member = useMemo(() => {
    return project?.projectMembers.find((mem) => mem.userId === userInfo!.id);
  }, [userInfo, project]);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination, draggableId } = result;
    // Dropped outside the list
    if (!destination) {
      return;
    }

    if (
      source.droppableId === "status-drop-zone" &&
      destination.droppableId === "status-drop-zone"
    ) {
      if (source.index !== destination.index) {
        const originalStatusList = [...statusList];
        const newStatusList = sortBy(
          statusList.map((status, index) => {
            if (status.boardStatusId === draggableId) {
              return { ...status, order: destination.index + 1 };
            }
            if (index >= destination.index && index < source.index) {
              return { ...status, order: status.order + 1 };
            } else if (index > source.index && index <= destination.index) {
              return { ...status, order: status.order - 1 };
            }
            return status;
          }),
          "order"
        );
        queryClient.setQueryData(
          [taskApi.getTaskStatusKey, projectId],
          newStatusList
        );
        updateStatusOrderMutation.mutate(
          {
            statusId: draggableId,
            order: destination.index + 1,
          },
          {
            onSuccess: async () => {
              toast.success("Change status order succeed!");
              await queryClient.invalidateQueries({
                queryKey: [taskApi.getTaskStatusKey, projectId],
              });
              await queryClient.refetchQueries({
                queryKey: [taskApi.getTaskStatusKey, projectId],
              });
            },
            onError: (err: any) => {
              console.error(err);
              toast.error("Change status order failed! Please try again later");
              queryClient.setQueryData(
                [taskApi.getTaskStatusKey, projectId],
                originalStatusList
              );
            },
          }
        );
      }
    } else {
      // Moving within the same list
      if (source.droppableId !== destination.droppableId) {
        // Moving to a different status
        const newStatusId = destination.droppableId;
        const originalTasks = [...tasks!];
        const newTasks = tasks!.map((task) => {
          if (task.taskId === draggableId) {
            return { ...task, statusId: newStatusId };
          }
          return task;
        });
        queryClient.setQueryData(
          [taskApi.getKanbanTasksKey, projectId],
          newTasks
        );
        changeTaskStatusMutation.mutate(
          {
            id: draggableId,
            statusId: newStatusId,
            memberId: member?.memberId || "",
          },
          {
            onSuccess: () => {
              toast.success("Change task status succeed!");
              refetchTasks();
            },
            onError: () => {
              toast.error("Change task status failed!");
              queryClient.setQueryData(
                [taskApi.getKanbanTasksKey, projectId],
                originalTasks
              );
            },
          }
        );
      }
    }
  };

  const filterTaskName = useDebounceValue(filterData.name, 1000);

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
            onChange={(statusId) => setFilterData((c) => ({ ...c, statusId }))}
            allowClear
            value={filterData.statusId}
          />
          {project?.projectStatus !== "Done" && (
            <div className="flex flex-grow justify-end">
              <Button
                icon={<PlusOutlined />}
                onClick={() => onOpenCreateTaskModal()}
              >
                New task
              </Button>
            </div>
          )}
        </div>
        {tasks && tasks.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <div className="flex gap-x-4 items-center mb-4">
                <div
                  className={classNames("flex gap-x-4 items-center flex-grow")}
                >
                  {statusList
                    .filter((status) => status.title !== "Deleted")
                    .map((status, index) => (
                      <div className="w-[240px] shrink-0">
                        <div>
                          <h4 className="mb-0">{status.title}</h4>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <div className="flex w-full gap-x-4">
                  {statusList
                    .filter((status) => status.title !== "Deleted")
                    .map((status, index) => (
                      <div className="flex flex-col" key={status.boardStatusId}>
                        <DroppableComponent
                          key={status.boardStatusId}
                          droppableId={status.boardStatusId}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              className={classNames(
                                "w-[240px] rounded flex-grow",
                                snapshot.isDraggingOver && "bg-neutral-200"
                              )}
                              {...provided.droppableProps}
                            >
                              <>
                                <div className="flex flex-col gap-y-4">
                                  {(
                                    tasks.filter(
                                      (task) =>
                                        task.statusId ===
                                          status.boardStatusId &&
                                        (!filterTaskName ||
                                          task.title
                                            .toLowerCase()
                                            .includes(
                                              filterTaskName.toLowerCase()
                                            )) &&
                                        (!filterData.statusId ||
                                          filterData.statusId === task.statusId)
                                    ) || []
                                  ).map((task, index) => (
                                    <DraggableComponent
                                      key={task.taskId}
                                      draggableId={task.taskId}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          <TaskDraggableDisplay
                                            snapshot={snapshot}
                                            task={task}
                                            onViewTask={onOpenViewDetailTask}
                                            refetchTasks={refetchTasks}
                                          />
                                        </div>
                                      )}
                                    </DraggableComponent>
                                  ))}
                                </div>
                                {provided.placeholder}
                              </>
                            </div>
                          )}
                        </DroppableComponent>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-x-2 justify-center items-center mt-16">
              <InboxOutlined className="text-4xl" />
              <Typography.Text className="text-lg">
                This project has no data. Create some tasks first before start
                working
              </Typography.Text>
            </div>
          </>
        )}
      </DragDropContextComponent>
      {isModalCreateTaskOpen && (
        <CreateTask
          isOpen={isModalCreateTaskOpen}
          handleClose={onCloseCreateTaskModal}
          initTaskData={initTaskData || undefined}
          onSuccess={() => refetchTasks()}
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
};

export default KanbanDisplay;
