import { taskApi } from "@/utils/api/task";
import { useMutation } from "@tanstack/react-query";

export default function useTaskActions() {
  const createTaskMutation = useMutation({
    mutationKey: [taskApi.createTaskKey],
    mutationFn: taskApi.createTask,
  });

  const createSubtaskMutation = useMutation({
    mutationKey: [taskApi.createSubtaskKey],
    mutationFn: taskApi.createSubtask,
  });

  const updateTaskMutation = useMutation({
    mutationKey: [taskApi.updateTaskKey],
    mutationFn: taskApi.updateTask,
  });

  const deleteTaskMutation = useMutation({
    mutationKey: [taskApi.deleteTaskKey],
    mutationFn: taskApi.deleteTask,
  });

  const deleteParentTaskMutation = useMutation({
    mutationKey: [taskApi.deleteParentTaskKey],
    mutationFn: taskApi.deleteParentTask,
  });

  const restoreTaskMutation = useMutation({
    mutationKey: [taskApi.restoreTaskKey],
    mutationFn: taskApi.restoreTask,
  });

  const changeTaskStatusMutation = useMutation({
    mutationKey: [taskApi.changeTaskStatusKey],
    mutationFn: taskApi.changeTaskStatus,
  });

  const updateStatusOrderMutation = useMutation({
    mutationKey: [taskApi.updateStatusOrderKey],
    mutationFn: taskApi.updateStatusOrder,
  });

  return {
    createTaskMutation,
    createSubtaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    deleteParentTaskMutation,
    restoreTaskMutation,
    changeTaskStatusMutation,
    updateStatusOrderMutation,
  };
}
