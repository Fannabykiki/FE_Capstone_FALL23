import { classNames } from "@/utils/common";
import React from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
} from "react-beautiful-dnd";
import TaskDraggableDisplay from "./TaskDraggableDisplay";
import { ITask, ITaskStatus } from "@/interfaces/task";
import useDebounceValue from "@/hooks/useDebounceValue";

const DraggableComponent = Draggable as React.ComponentClass<DraggableProps>;
const DroppableComponent = Droppable as React.ComponentClass<DroppableProps>;

interface Props {
  task: ITask;
  statusList: ITaskStatus[];
  filterData: { name: string; statusId: string | null };
  onViewTask: (_taskId?: string | undefined) => void;
}

export default function MainTaskDisplay({
  task,
  statusList,
  onViewTask,
  filterData,
}: Props) {
  const filterTaskName = useDebounceValue(filterData.name, 1000);
  return (
    <>
      <div>
        <div className="flex w-full gap-x-4">
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
                      "w-[240px] rounded p-2 flex-grow",
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
