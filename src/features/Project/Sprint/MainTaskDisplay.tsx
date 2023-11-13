import { calcTaskDueDateColor, classNames } from "@/utils/common";
import { DATE_FORMAT } from "@/utils/constants";
import {
  CommentOutlined,
  DoubleLeftOutlined,
  PaperClipOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import { Avatar, Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
} from "react-beautiful-dnd";
import { Task } from ".";
import TaskDraggableDisplay from "./TaskDraggableDisplay";
import { ITaskStatus } from "@/interfaces/task";

interface Props {
  task: Task;
  isCollapsed?: boolean;
  statusList: ITaskStatus[];
}

const DraggableComponent = Draggable as React.ComponentClass<DraggableProps>;
const DroppableComponent = Droppable as React.ComponentClass<DroppableProps>;

export default function MainTaskDisplay({
  task,
  isCollapsed = false,
  statusList,
}: Props) {
  if (isCollapsed) {
    return (
      <div className="p-2">
        <div
          className={classNames(
            "border-0 border-l-4 border-solid border-blue-400",
            "bg-white p-2 rounded flex gap-x-4 items-center"
          )}
        >
          <div
            className={classNames(
              "w-fit px-2 py-1 rounded-full text-xs",
              calcTaskDueDateColor(task.dueDate)
            )}
          >
            <span>{dayjs(task.dueDate).format(DATE_FORMAT)}</span>
          </div>
          <p className="mb-0">{task.content}</p>
          <div className="flex-grow flex justify-end items-center gap-x-2">
            <div>
              <PaperClipOutlined /> 0
            </div>
            <div>
              <CommentOutlined /> 0
            </div>
            <Avatar src={faker.image.avatarGitHub()} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div>
        <div className="flex w-full gap-x-4">
          <div className="p-2">
            <div className={classNames("w-56 h-fit")}>
              <TaskDraggableDisplay task={task} />
            </div>
            <Button icon={<PlusOutlined />} className="mt-4" type="text">
              New task
            </Button>
          </div>
          {statusList.map((status) => (
            <div className="flex flex-col">
              <DroppableComponent
                key={status.boardStatusId}
                droppableId={`${task.id}-${status.boardStatusId}`}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className={classNames(
                      "w-[250px] rounded p-2",
                      snapshot.isDraggingOver && "bg-neutral-200"
                    )}
                    {...provided.droppableProps}
                  >
                    <>
                      <div className="flex flex-col gap-y-4">
                        <SubTasks task={task} status={status} />
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

interface SubTasksProps {
  task: Task;
  status: ITaskStatus;
}

const SubTasks = ({ task, status }: SubTasksProps) => (
  <>
    {task.subtasks
      .filter((subtask) => subtask.statusId === status.boardStatusId)
      .map((subtask, index) => (
        <DraggableComponent
          key={subtask.id}
          draggableId={subtask.id}
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
              <TaskDraggableDisplay snapshot={snapshot} task={subtask} />
            </div>
          )}
        </DraggableComponent>
      ))}
  </>
);
