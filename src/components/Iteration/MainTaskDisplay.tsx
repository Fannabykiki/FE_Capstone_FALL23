import { calcTaskDueDateColor, classNames } from "@/utils/common";
import { DATE_FORMAT } from "@/utils/constants";
import {
  CommentOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  PaperClipOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
} from "react-beautiful-dnd";
import TaskDraggableDisplay from "./TaskDraggableDisplay";
import { ICreateTaskRequest, ITask, ITaskStatus } from "@/interfaces/task";
import useDebounceValue from "@/hooks/useDebounceValue";
import AvatarWithColor from "../AvatarWithColor";
import { IProject } from "@/interfaces/project";
import { useQueryClient } from "@tanstack/react-query";
import { projectApi } from "@/utils/api/project";
import { useParams } from "react-router-dom";

const DraggableComponent = Draggable as React.ComponentClass<DraggableProps>;
const DroppableComponent = Droppable as React.ComponentClass<DroppableProps>;

interface Props {
  task: ITask;
  isCollapsed?: boolean;
  statusList: ITaskStatus[];
  onToggleCollapseTask: VoidFunction;
  onOpenCreateTaskModal: (_: Partial<ICreateTaskRequest> | undefined) => void;
  filterData: { name: string; statusId: string | null };
  onViewTask: (_taskId?: string | undefined) => void;
}

export default function MainTaskDisplay({
  task,
  isCollapsed = false,
  statusList,
  onToggleCollapseTask,
  onOpenCreateTaskModal,
  onViewTask,
  filterData,
}: Props) {
  const filterTaskName = useDebounceValue(filterData.name, 1000);
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const project: IProject | undefined = queryClient.getQueryData([
    projectApi.getInfoKey,
    projectId,
  ]);
  if (isCollapsed) {
    return (
      <div className="p-2">
        <div
          className={classNames(
            "border-0 border-l-4 border-solid border-blue-400",
            "bg-white p-2 rounded flex gap-x-4 items-center shadow hover:shadow-lg cursor-pointer"
          )}
          onClick={() => onViewTask(task.taskId)}
        >
          <DoubleRightOutlined
            className="rotate-90 cursor-pointer"
            onClick={(e) => {
              onToggleCollapseTask();
              e.stopPropagation();
            }}
          />
          <div
            className={classNames(
              "w-fit px-2 py-1 rounded-full text-xs",
              calcTaskDueDateColor(task.dueDate)
            )}
          >
            <span>{dayjs(task.dueDate).format(DATE_FORMAT)}</span>
          </div>
          <p className="mb-0">{task.title}</p>
          <div className="flex-grow flex justify-end items-center gap-x-2">
            <div>
              <PaperClipOutlined /> {task.totalAttachment}
            </div>
            <div>
              <CommentOutlined /> {task.totalComment}
            </div>
            <AvatarWithColor stringContent={task.assignTo}>
              {task.assignTo.slice(0, 1).toUpperCase()}
            </AvatarWithColor>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex">
          <Button
            type="text"
            className="font-semibold"
            onClick={onToggleCollapseTask}
            icon={<DoubleLeftOutlined className="rotate-90" />}
          >
            {task.title}
          </Button>
          {project?.projectStatus !== "Done" && (
            <div className={"flex-grow flex flex-col items-start pb-4"}>
              <Button
                type="text"
                icon={<PlusOutlined />}
                className="w-fit"
                onClick={() =>
                  onOpenCreateTaskModal({
                    taskId: task.taskId,
                  })
                }
              >
                New sub task
              </Button>
            </div>
          )}
        </div>
        <div className="flex w-full gap-x-4">
          <div className={classNames("w-56 h-fit")}>
            <TaskDraggableDisplay task={task} onViewTask={onViewTask} />
          </div>
          {statusList.map((status, index) => (
            <div className="flex flex-col" key={status.boardStatusId}>
              <DroppableComponent
                key={status.boardStatusId}
                droppableId={`${task.taskId}/${status.boardStatusId}`}
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
                          task.subTask?.filter(
                            (subtask) =>
                              subtask.statusId === status.boardStatusId &&
                              (!filterTaskName ||
                                subtask.title
                                  .toLowerCase()
                                  .includes(filterTaskName.toLowerCase())) &&
                              (!filterData.statusId ||
                                filterData.statusId === subtask.statusId)
                          ) || []
                        ).map((subtask, index) => (
                          <DraggableComponent
                            key={subtask.taskId}
                            draggableId={subtask.taskId}
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
                                  task={subtask}
                                  onViewTask={onViewTask}
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
    </>
  );
}
