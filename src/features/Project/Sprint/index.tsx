import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  OnDragEndResponder,
  DraggableLocation,
  DragDropContextProps,
} from "react-beautiful-dnd";
import MainTaskDisplay from "./MainTaskDisplay";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { taskApi } from "@/utils/api/task";
import { Button, Select, Typography } from "antd";
import useDetailView from "@/hooks/useDetailView";
import { CreateIteration } from "@/components/Modal";
import useProjectDetail from "@/hooks/useProjectDetail";
import { IIteration } from "@/interfaces/iteration";
import { ITask } from "@/interfaces/task";

// Helper functions to reorder and move subtasks
const reorderSubtasks = (
  subtasks: ITask[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(subtasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const moveSubtask = (
  sourceSubtasks: ITask[],
  droppableDestination: DraggableLocation,
  draggableId: string
) => {
  const sourceClone = Array.from(sourceSubtasks);
  const newStatus = droppableDestination.droppableId.split("/")[1];
  const editingItem = sourceClone.find((item) => item.taskId === draggableId);
  editingItem!.statusId = newStatus;

  return sourceClone;
};

export enum TaskType {
  Main = "Work Item",
  Bug = "Bug",
  Task = "Task",
}
const DragDropContextComponent =
  DragDropContext as React.ComponentClass<DragDropContextProps>;

const TaskBoard = () => {
  const [selectedIteration, setSelectedIteration] = useState<
    IIteration | undefined
  >(undefined);
  const [collapsedTasks, setCollapsedTasks] = useState<string[]>([]);
  const {
    openView: openCreateIterationModal,
    onOpenView: onOpenCreateIterationModal,
    onCloseView: onCloseCreateIterationModal,
  } = useDetailView();
  const { projectId } = useParams();

  const { data: statusList } = useQuery({
    queryKey: [taskApi.getTaskStatusesKey, projectId],
    queryFn: ({ signal }) => taskApi.getTaskStatuses(signal, projectId!),
    initialData: [],
  });
  const { iterations, actions } = useProjectDetail(projectId);

  useEffect(() => {
    if (iterations && iterations.length > 0) {
      setSelectedIteration(
        iterations.find((iteration) => iteration.status === "Current") ||
          iterations[0]
      );
    }
  }, [iterations]);

  const onChangeIteration = (interationId: string) => {
    setSelectedIteration(
      iterations?.find((iteration) => iteration.interationId === interationId)
    );
  };

  const onToggleCollapseAllTask = () => {
    if (selectedIteration) {
      if (
        collapsedTasks.length === selectedIteration.workItemResponses.length
      ) {
        setCollapsedTasks([]);
      } else {
        setCollapsedTasks(
          selectedIteration.workItemResponses.map((task) => task.taskId)
        );
      }
    }
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    if (selectedIteration) {
      const { source, destination, draggableId } = result;

      // Dropped outside the list
      if (!destination) {
        return;
      }

      const sourceTask = selectedIteration.workItemResponses.find(
        (task) => task.tasks?.some((subtask) => subtask.taskId === draggableId)
      );

      // Moving within the same list
      if (source.droppableId === destination.droppableId) {
        const newSubtasks = reorderSubtasks(
          sourceTask!.tasks || [],
          source.index,
          destination.index
        );
        // TODO: re-order tasks
        // const newTasks = tasks.map((task) => {
        //   if (task.id === sourceTask!.id) {
        //     return { ...task, subtasks: newSubtasks };
        //   }
        //   return task;
        // });
        // setTasks(newTasks);
      } else {
        // TODO: set new status for task
        // Moving to a different status
        // const newSourceSubtasks = moveSubtask(
        //   sourceTask!.subtasks,
        //   destination,
        //   draggableId
        // );
        // const newTasks = tasks.map((task) => {
        //   if (task.id === sourceTask!.id) {
        //     return {
        //       ...task,
        //       subtasks: newSourceSubtasks,
        //     };
        //   }
        //   return task;
        // }) as Task[];
        // setTasks(newTasks);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Typography.Title>Sprints</Typography.Title>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => onOpenCreateIterationModal()}
        >
          New Sprint
        </Button>
      </div>
      <Select
        options={(iterations || []).map((iteration) => ({
          label: iteration.interationName,
          value: iteration.interationId,
        }))}
        loading={actions.isGettingIterations}
        value={selectedIteration?.interationId || null}
        onChange={onChangeIteration}
        className="mb-4"
      />
      {selectedIteration ? (
        <DragDropContextComponent onDragEnd={onDragEnd}>
          <div>
            <div className="flex w-full gap-x-4">
              <div className="p-2">
                <h4
                  className="select-none cursor-pointer w-56"
                  onClick={onToggleCollapseAllTask}
                >
                  {collapsedTasks.length ===
                  selectedIteration.workItemResponses.length ? (
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
          </div>
          {selectedIteration.workItemResponses.map((task) => (
            <MainTaskDisplay
              task={task}
              key={task.taskId}
              statusList={statusList}
              isCollapsed={collapsedTasks.includes(task.taskId)}
            />
          ))}
        </DragDropContextComponent>
      ) : (
        <Typography.Paragraph>No iteration selected</Typography.Paragraph>
      )}
      {openCreateIterationModal && (
        <CreateIteration
          open={openCreateIterationModal}
          onClose={onCloseCreateIterationModal}
        />
      )}
    </>
  );
};

export default TaskBoard;
