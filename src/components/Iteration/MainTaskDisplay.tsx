import { calcTaskDueDateColor, classNames } from "@/utils/common";
import { DATE_FORMAT } from "@/utils/constants";
import {
  CommentOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
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
import TaskDraggableDisplay from "./TaskDraggableDisplay";
import { ICreateTaskRequest, ITask, ITaskStatus } from "@/interfaces/task";
import useDebounceValue from "@/hooks/useDebounceValue";

interface Props {
  task: ITask;
  isCollapsed?: boolean;
  statusList: ITaskStatus[];
  onToggleCollapseTask: VoidFunction;
  onOpenCreateTaskModal: (_: Partial<ICreateTaskRequest> | undefined) => void;
  filterData: { name: string; statusId: string };
}

const DraggableComponent = Draggable as React.ComponentClass<DraggableProps>;
const DroppableComponent = Droppable as React.ComponentClass<DroppableProps>;

export default function MainTaskDisplay({
  task,
  isCollapsed = false,
  statusList,
  onToggleCollapseTask,
  onOpenCreateTaskModal,
  filterData,
}: Props) {
  const filterTaskName = useDebounceValue(filterData.name, 1000);
  if (isCollapsed) {
    return (
      <div className="p-2">
        <div
          className={classNames(
            "border-0 border-l-4 border-solid border-blue-400 shadow",
            "bg-white p-2 rounded flex gap-x-4 items-center"
          )}
        >
          <DoubleRightOutlined
            className="rotate-90 cursor-pointer"
            onClick={onToggleCollapseTask}
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
        <Button
          type="text"
          className="font-semibold"
          onClick={onToggleCollapseTask}
          icon={<DoubleLeftOutlined className="rotate-90" />}
        >
          {task.title}
        </Button>
        <div className="flex w-full gap-x-4">
          <div className="p-2">
            <div className={classNames("w-56 h-fit")}>
              <TaskDraggableDisplay task={task} />
            </div>
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
                      "w-[250px] rounded p-2 flex-grow",
                      snapshot.isDraggingOver && "bg-neutral-200"
                    )}
                    {...provided.droppableProps}
                  >
                    <>
                      <div className="flex flex-col gap-y-4">
                        <SubTasks
                          subTasks={
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
                          }
                          status={status}
                        />
                      </div>
                      {provided.placeholder}
                    </>
                    {index === 0 && (
                      <div className="flex-grow flex flex-col items-start">
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
  subTasks: ITask[];
  status: ITaskStatus;
}

const SubTasks = ({ subTasks, status }: SubTasksProps) => {
  return (
    <>
      {subTasks.map((subtask, index) => (
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
              <TaskDraggableDisplay snapshot={snapshot} task={subtask} />
            </div>
          )}
        </DraggableComponent>
      ))}
    </>
  );
};
