import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Helper functions to reorder and move subtasks
const reorderSubtasks = (subtasks, startIndex, endIndex) => {
  const result = Array.from(subtasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const moveSubtask = (
  sourceSubtasks,
  destinationSubtasks,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(sourceSubtasks);
  const destClone = Array.from(destinationSubtasks);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  removed.status = droppableDestination.droppableId;
  destClone.splice(droppableDestination.index, 0, removed);

  return destClone;
};

const TaskBoard = () => {
  const initialTasks = [
    {
      id: "1",
      content: "Task A",
      subtasks: [
        { id: "2", content: "Sub task A1", status: "todo" },
        { id: "6", content: "Sub task A2", status: "todo" },
        // ... other subtasks
      ],
    },
    {
      id: "3",
      content: "Task B",
      subtasks: [
        { id: "4", content: "Sub task B1", status: "todo" },
        { id: "5", content: "Sub task B2", status: "review" },
        // ... other subtasks
      ],
    },
    // ... other tasks
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    const sourceTask = tasks.find((task) =>
      task.subtasks.some((subtask) => subtask.id === draggableId)
    );
    const destinationTask = tasks.find(
      (task) => task.id === destination.droppableId
    );

    // Moving within the same list
    if (source.droppableId === destination.droppableId) {
      const newSubtasks = reorderSubtasks(
        sourceTask.subtasks,
        source.index,
        destination.index
      );
      const newTasks = tasks.map((task) => {
        if (task.id === sourceTask.id) {
          return { ...task, subtasks: newSubtasks };
        }
        return task;
      });
      setTasks(newTasks);
    } else {
      // Moving to a different list
      const newDestinationSubtasks = moveSubtask(
        sourceTask.subtasks,
        destinationTask.subtasks,
        source,
        destination
      );
      const newTasks = tasks.map((task) => {
        if (task.id === sourceTask.id) {
          return {
            ...task,
            subtasks: sourceTask.subtasks.filter(
              (subtask) => subtask.id !== draggableId
            ),
          };
        } else if (task.id === destinationTask.id) {
          return { ...task, subtasks: newDestinationSubtasks };
        }
        return task;
      });
      setTasks(newTasks);
    }
  };

  // Function to render subtasks
  const renderSubtasks = (task, status) => {
    return task.subtasks
      .filter((subtask) => subtask.status === status)
      .map((subtask, index) => (
        <Draggable key={subtask.id} draggableId={subtask.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                userSelect: "none",
                padding: "16px",
                margin: "0 0 8px 0",
                minHeight: "50px",
                backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                color: "white",
                ...provided.draggableProps.style,
              }}
            >
              {subtask.content}
            </div>
          )}
        </Draggable>
      ));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              marginBottom: "20px",
              alignItems: "flex-start",
            }}
          >
            <div style={{ marginRight: "20px" }}>
              <h3>{task.content}</h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {["todo", "inProgress", "review", "done"].map((status, index) => (
                <Droppable key={index} droppableId={`${task.id}-${status}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                        padding: 8,
                        width: 250,
                        minHeight: 500,
                      }}
                      {...provided.droppableProps}
                    >
                      {index === 0 ? <h4>{status}</h4> : null}{" "}
                      {/* Only show the column title on the first column */}
                      {renderSubtasks(task, status)}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
