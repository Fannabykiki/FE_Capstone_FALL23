import axiosClient from "./axios-client";
import { HTTP_METHODS } from "../constants";
import {
  ITask,
  ICreateTaskRequest,
  ITaskStatus,
  IGetTypeListResponse,
  ITrashBinRecord,
  IGetPriorityListResponse,
  IUpdateTaskPayload,
  IChangeTaskStatusPayload,
  ICreateStatusPayload,
  IUpdateStatusOrderPayload,
} from "@/interfaces/task";
import { orderBy } from "lodash";

const getKanbanTasks = (
  signal: AbortSignal | undefined,
  projectId: string
): Promise<ITask[]> => {
  return axiosClient({
    url: "/api/task-management/tasks/kanban",
    method: HTTP_METHODS.GET,
    params: { projetcId: projectId },
    signal,
  }).then((resp) => resp.data);
};

const getDetail = (
  signal: AbortSignal | undefined,
  taskId: string
): Promise<ITask> => {
  return axiosClient({
    url: "/api/task-management/tasks/detail",
    method: HTTP_METHODS.GET,
    params: { taskId },
    signal,
  }).then((resp) => resp.data);
};

const getTaskById = (taskId: string): Promise<ITask> => {
  return axiosClient({
    url: `/api/task-management/task/${taskId}`,
    method: HTTP_METHODS.GET,
  }).then((resp) => resp.data);
};

const createTaskStatus = (data: ICreateStatusPayload): Promise<ITaskStatus> => {
  return axiosClient({
    url: "/api/task-management/tasks/status",
    method: HTTP_METHODS.POST,
    data,
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

const createSubtask = (subtask: ICreateTaskRequest): Promise<ITask> => {
  return axiosClient({
    url: "/api/task-management/tasks/subtask",
    method: HTTP_METHODS.POST,
    data: subtask,
  }).then((resp) => resp.data);
};

const updateTask = (data: IUpdateTaskPayload): Promise<ITask> => {
  return axiosClient({
    url: `/api/task-management/tasks`,
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);
};

const deleteTask = (data: {
  taskId: string;
  memberId: string;
}): Promise<void> => {
  return axiosClient({
    url: `/api/task-management/tasks/deletion`,
    method: HTTP_METHODS.PUT, // This should be DELETE if you are actually deleting the resource
    data,
  }).then((resp) => resp.data);
};

const restoreTask = (data: {
  taskId: string;
  memberId: string;
}): Promise<void> => {
  return axiosClient({
    url: `/api/task-management/tasks/restoration`,
    method: HTTP_METHODS.PUT,
    data,
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
): Promise<ITaskStatus[]> => {
  return axiosClient({
    url: "/api/task-management/tasks/status",
    method: HTTP_METHODS.GET,
    signal,
    params: {
      projectId,
    },
  }).then((resp) =>
    orderBy(
      resp.data?.filter((status: ITaskStatus) => status.boardStatusId) || [],
      "order",
      "asc"
    )
  );
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

const changeTaskStatus = ({
  id,
  statusId,
  memberId,
}: IChangeTaskStatusPayload): Promise<any> => {
  return axiosClient({
    url: `/api/task-management/tasks/status`,
    method: HTTP_METHODS.PUT,
    data: { taskId: id, statusId, memberId },
  });
};
const getAllTaskInTrashBin = (
  signal: AbortSignal | undefined,
  projectId: string | undefined,
  queryString: string
): Promise<ITrashBinRecord[]> => {
  return axiosClient({
    url: "/api/task-management/tasks/task-bin" + queryString,
    method: HTTP_METHODS.GET,
    signal,
    params: {
      projetcId: projectId,
    },
  }).then((resp) => resp.data);
};

const updateStatusOrder = (data: IUpdateStatusOrderPayload) =>
  axiosClient({
    url: "/api/task-management/tasks/status/order",
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

export const taskApi = {
  getKanbanTasks,
  getKanbanTasksKey: "taskGetKanbanTasks",
  getDetail,
  getDetailKey: "taskGetDetail",
  getTaskById,
  getTaskByIdKey: "taskGetTaskById",
  createTaskStatus,
  createTaskStatusKey: "taskCreateTaskStatus",
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
  restoreTask,
  restoreTaskKey: "taskRestoreTask",
  getTaskPriority,
  getTaskPriorityKey: "taskGetTaskPriority",
  getTaskStatus,
  getTaskStatusKey: "taskGetTaskStatus",
  getTaskType,
  getTaskTypeKey: "taskGetTaskType",
  changeTaskStatus,
  changeTaskStatusKey: "taskChangeTaskStatus",
  getAllTaskInTrashBin,
  getAllTaskInTrashBinKey: "taskGetAllTaskInTrashBin",
  updateStatusOrder,
  updateStatusOrderKey: "taskUpdateStatusOrder",
};
