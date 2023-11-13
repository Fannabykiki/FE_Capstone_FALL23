import axiosClient from "./axios-client";
import { HTTP_METHODS } from "../constants";
import {
  ITask,
  ICreateTaskRequest,
  ITaskStatus,
  ISubtask,
  IGetTypeListResponse,
  IGetStatusListResponse,
  IGetPriorityListResponse,
} from "@/interfaces/task";

const getKanbanTasks = (
  signal: AbortSignal | undefined,
  projectId: string
): Promise<ITask[]> => {
  return axiosClient({
    url: "/api/task-management/kanban-task",
    method: HTTP_METHODS.GET,
    params: { projectId },
    signal,
  }).then((resp) => resp.data);
};

const getTaskById = (taskId: string): Promise<ITask> => {
  return axiosClient({
    url: `/api/task-management/task/${taskId}`,
    method: HTTP_METHODS.GET,
  }).then((resp) => resp.data);
};

const getTaskStatuses = (
  signal: AbortSignal | undefined,
  projectId: string
): Promise<ITaskStatus[]> => {
  return axiosClient({
    url: "/api/task-management/task-status",
    method: HTTP_METHODS.GET,
    params: { projectId },
    signal,
  }).then((resp) => resp.data);
};

const postTaskStatus = (status: ITaskStatus): Promise<ITaskStatus> => {
  return axiosClient({
    url: "/api/task-management/task-status",
    method: HTTP_METHODS.POST,
    data: status,
  }).then((resp) => resp.data);
};

const getTaskTypes = (): Promise<any[]> => {
  return axiosClient({
    url: "/api/task-management/task-type",
    method: HTTP_METHODS.GET,
  }).then((resp) => resp.data);
};

const createTask = (task: ICreateTaskRequest): Promise<ITask> => {
  return axiosClient({
    url: "/api/task-management/tasks",
    method: HTTP_METHODS.POST,
    data: task,
  }).then((resp) => resp.data);
};

const createSubtask = (subtask: ISubtask): Promise<ISubtask> => {
  return axiosClient({
    url: "/api/task-management/subtask",
    method: HTTP_METHODS.POST,
    data: subtask,
  }).then((resp) => resp.data);
};

const updateTask = (taskId: string, task: ITask): Promise<ITask> => {
  return axiosClient({
    url: `/api/task-management/task/${taskId}`,
    method: HTTP_METHODS.PUT,
    data: task,
  }).then((resp) => resp.data);
};

const deleteTask = (taskId: string): Promise<void> => {
  return axiosClient({
    url: `/api/task-management/task/delete/${taskId}`,
    method: HTTP_METHODS.PUT, // This should be DELETE if you are actually deleting the resource
  }).then((resp) => resp.data);
};

const getTaskPriority = (
  signal: AbortSignal | undefined
): Promise<IGetPriorityListResponse[]> => {
  return axiosClient({
    url: "/api/task-management/tasks/priority",
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);
};

const getTaskStatus = (
  signal: AbortSignal | undefined,
  projectId: string | undefined
): Promise<IGetStatusListResponse[]> => {
  return axiosClient({
    url: "/api/task-management/tasks/status",
    method: HTTP_METHODS.GET,
    signal,
    params: {
      projectId,
    },
  }).then((resp) => resp.data);
};

const getTaskType = (
  signal: AbortSignal | undefined
): Promise<IGetTypeListResponse[]> => {
  return axiosClient({
    url: "/api/task-management/tasks/type",
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);
};

export const taskApi = {
  getKanbanTasks,
  getKanbanTasksKey: "taskGetKanbanTasks",
  getTaskById,
  getTaskByIdKey: "taskGetTaskById",
  getTaskStatuses,
  getTaskStatusesKey: "taskGetTaskStatuses",
  postTaskStatus,
  postTaskStatusKey: "taskPostTaskStatus",
  getTaskTypes,
  getTaskTypesKey: "taskGetTaskTypes",
  createTask,
  createTaskKey: "taskCreateTask",
  createSubtask,
  createSubtaskKey: "taskCreateSubtask",
  updateTask,
  updateTaskKey: "taskUpdateTask",
  deleteTask,
  deleteTaskKey: "taskDeleteTask",
  getTaskPriority,
  getTaskPriorityKey: "taskgetTaskPriorityKey",
  getTaskStatus,
  getTaskStatusKey: "taskgetTaskStatusKey",
  getTaskType,
  getTaskTypeKey: "taskgetTaskTypeKey",
};
