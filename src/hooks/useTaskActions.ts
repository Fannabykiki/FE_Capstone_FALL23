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

  const changeTaskStatusMutation = useMutation({
    mutationKey: [taskApi.changeTaskStatusKey],
    mutationFn: taskApi.changeTaskStatus,
  });

  return {
    createTaskMutation,
    createSubtaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    changeTaskStatusMutation,
  };
}
