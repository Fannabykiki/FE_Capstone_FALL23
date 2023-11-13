import React, { useState } from "react";
import {
  DragDropContext,
  OnDragEndResponder,
  DraggableLocation,
  DragDropContextProps,
} from "react-beautiful-dnd";
import MainTaskDisplay from "./MainTaskDisplay";
import { DoubleLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { taskApi } from "@/utils/api/task";
import { Button, Typography } from "antd";

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

export interface Task {
  id: string;
  content: string;
  type?: TaskType;
  subtasks: SubTask[];
  dueDate: Date;
}

export interface SubTask {
  id: string;
  content: string;
  status: Status;
  type: TaskType;
  dueDate: Date;
}

export enum Status {
  Todo = "todo",
  Review = "review",
  InProgress = "inProgress",
  Done = "done",
}

export enum TaskType {
  Main = "main",
  Bug = "bug",
  Task = "task",
}
const DragDropContextComponent =
  DragDropContext as React.ComponentClass<DragDropContextProps>;

const TaskBoard = () => {
  const initialTasks: Task[] = [
    {
      id: "1",
      content: "Task A",
      dueDate: new Date("2023-11-20"),
      subtasks: [
        {
          id: "2",
          content: "Sub task A1",
          status: Status.Todo,
          type: TaskType.Bug,
          dueDate: new Date("2023-11-15"),
        },
        {
          id: "6",
          content: "Sub task A2",
          status: Status.InProgress,
          type: TaskType.Task,
          dueDate: new Date("2023-11-09"),
        },
        // ... other subtasks
      ],
    },
    {
      id: "3",
      content: "Task B",
      dueDate: new Date("2023-11-20"),
      subtasks: [
        {
          id: "4",
          content: "Sub task B1",
          status: Status.Review,
          type: TaskType.Bug,
          dueDate: new Date("2023-11-15"),
        },
        {
          id: "5",
          content: "Sub task B2",
          status: Status.Done,
          type: TaskType.Task,
          dueDate: new Date("2023-11-09"),
        },
        // ... other subtasks
      ],
    },
    // ... other tasks
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const { projectId } = useParams();

  const { data: statusList } = useQuery({
    queryKey: [taskApi.getTaskStatusesKey, projectId],
    queryFn: ({ signal }) => taskApi.getTaskStatuses(signal, projectId!),
    initialData: [],
  });

  const { data } = useQuery({
    queryKey: [taskApi.getKanbanTasksKey, projectId],
    queryFn: ({ signal }) => taskApi.getKanbanTasks(signal, projectId!),
  });
  console.log(data);

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

  return (
    <>
      <div className="flex items-center justify-between">
        <Typography.Title>Sprints</Typography.Title>
        <Button icon={<PlusOutlined />} type="primary">
          New Sprint
        </Button>
      </div>
      <DragDropContextComponent onDragEnd={onDragEnd}>
        <div>
          <div className="flex w-full gap-x-4">
            <div className="p-2">
              <h4 className="select-none cursor-pointer w-56">
                <DoubleLeftOutlined className="rotate-90" /> Collapse all
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
        </div>
        {tasks.map((task) => (
          <MainTaskDisplay task={task} key={task.id} statusList={statusList} />
        ))}
      </DragDropContextComponent>
    </>
  );
};

export default TaskBoard;
