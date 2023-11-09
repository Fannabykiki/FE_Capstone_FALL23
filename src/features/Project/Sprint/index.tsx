import { classNames } from "@/utils/common";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
  DraggableLocation,
  DraggableProps,
  DragDropContextProps,
  DroppableProps,
} from "react-beautiful-dnd";

// Helper functions to reorder and move subtasks
const reorderSubtasks = (
  subtasks: SubTask[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(subtasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const moveSubtask = (
  sourceSubtasks: SubTask[],
  droppableDestination: DraggableLocation,
  draggableId: string
) => {
  const sourceClone = Array.from(sourceSubtasks);
  const newStatus = droppableDestination.droppableId.split("-")[1];
  const editingItem = sourceClone.find((item) => item.id === draggableId);
  editingItem!.status = newStatus as Status;

  return sourceClone;
};

interface Task {
  id: string;
  content: string;
  subtasks: SubTask[];
}

interface SubTask {
  id: string;
  content: string;
  status: Status;
  type: SubTaskType;
}

enum Status {
  Todo = "todo",
  Review = "review",
  InProgress = "inProgress",
  Done = "done",
}

enum SubTaskType {
  Bug = "bug",
  Task = "task",
}

const DraggableComponent = Draggable as React.ComponentClass<DraggableProps>;
const DragDropContextComponent =
  DragDropContext as React.ComponentClass<DragDropContextProps>;
const DroppableComponent = Droppable as React.ComponentClass<DroppableProps>;

const TaskBoard = () => {
  const initialTasks: Task[] = [
    {
      id: "1",
      content: "Task A",
      subtasks: [
        {
          id: "2",
          content: "Sub task A1",
          status: Status.Todo,
          type: SubTaskType.Bug,
        },
        {
          id: "6",
          content: "Sub task A2",
          status: Status.InProgress,
          type: SubTaskType.Task,
        },
        // ... other subtasks
      ],
    },
    {
      id: "3",
      content: "Task B",
      subtasks: [
        {
          id: "4",
          content: "Sub task B1",
          status: Status.Review,
          type: SubTaskType.Bug,
        },
        {
          id: "5",
          content: "Sub task B2",
          status: Status.Done,
          type: SubTaskType.Task,
        },
        // ... other subtasks
      ],
    },
    // ... other tasks
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    const sourceTask = tasks.find((task) =>
      task.subtasks.some((subtask) => subtask.id === draggableId)
    );

    // Moving within the same list
    if (source.droppableId === destination.droppableId) {
      const newSubtasks = reorderSubtasks(
        sourceTask!.subtasks,
        source.index,
        destination.index
      );
      const newTasks = tasks.map((task) => {
        if (task.id === sourceTask!.id) {
          return { ...task, subtasks: newSubtasks };
        }
        return task;
      });
      setTasks(newTasks);
    } else {
      // Moving to a different status
      const newSourceSubtasks = moveSubtask(
        sourceTask!.subtasks,
        destination,
        draggableId
      );
      const newTasks = tasks.map((task) => {
        if (task.id === sourceTask!.id) {
          return {
            ...task,
            subtasks: newSourceSubtasks,
          };
        }
        return task;
      }) as Task[];
      setTasks(newTasks);
    }
  };

  // Function to render subtasks
  const renderSubtasks = (task: Task, status: string) => {
    return task.subtasks
      .filter((subtask) => subtask.status === status)
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
              className={classNames(
                "select-none p-4 min-h-[50px] rounded shadow",
                snapshot.isDragging ? "bg-neutral-400" : "bg-white",
                "border-0 border-l-4 border-solid",
                subtask.type === SubTaskType.Bug
                  ? "border-red-400"
                  : "border-green-400"
              )}
              style={{
                ...provided.draggableProps.style,
              }}
            >
              <h3>{subtask.content}</h3>
            </div>
          )}
        </DraggableComponent>
      ));
  };

  return (
    <DragDropContextComponent onDragEnd={onDragEnd}>
      {tasks.map((task, idx) => (
        <div key={task.id}>
          <div className="flex w-full gap-x-4">
            <div className="p-2">
              {idx === 0 && <h4>Collapse all</h4>}
              <div
                className={classNames(
                  "w-44 bg-white h-fit p-4 rounded shadow",
                  "border-0 border-l-4 border-solid border-blue-400"
                )}
              >
                <h3>{task.content}</h3>
              </div>
            </div>
            {["todo", "inProgress", "review", "done"].map((status, index) => (
              <DroppableComponent
                key={index}
                droppableId={`${task.id}-${status}`}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className={classNames(
                      "p-2 w-[250px] rounded",
                      snapshot.isDraggingOver && "bg-neutral-200"
                    )}
                    {...provided.droppableProps}
                  >
                    <>
                      {idx === 0 && <h4>{status}</h4>}
                      <div className="flex flex-col gap-y-4">
                        {renderSubtasks(task, status)}
                      </div>
                      {provided.placeholder}
                    </>
                  </div>
                )}
              </DroppableComponent>
            ))}
          </div>
        </div>
      ))}
    </DragDropContextComponent>
  );
};

export default TaskBoard;
