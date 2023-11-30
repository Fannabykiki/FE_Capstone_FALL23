import { IComment } from "./comment";
import { IAttachment } from "./attachment";

export interface ITask {
  commentResponse?: IComment[];
  attachmentResponse?: IAttachment[];
  taskId: string;
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  expireTime: Date | null;
  createTime: Date;
  deleteAt: string | null;
  isDelete: boolean | null;
  assignTo: string;
  createBy: string;
  typeName: string;
  statusName: string;
  statusId: string;
  typeId: string;
  priorityName: string;
  interationName: string;
  subTask?: ITask[];
  taskHistories?: ITaskHistory[];
  totalAttachment: number;
  totalComment: number;
}

interface ITaskHistory {
  historyId: string;
  changeAt: Date;
  taskId: string;
  title: string;
}

export interface ITaskStatus {
  baseResponse: string | null;
  boardId: string;
  boardStatusId: string;
  order: number;
  title: string;
  hexColor: string;
}

export interface ICreateTaskRequest {
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  assignTo: string;
  priorityId: string;
  priorityName?: string;
  interationId: string;
  interationName?: string;
  projectId: string;
  prevId: string | null;
  statusId: string;
  typeId: string;
  taskId?: string;
}

export interface IGetPriorityListResponse {
  levelId: string;
  level: number;
  title: string;
}

export interface IGetTypeListResponse {
  typeId: string;
  title: string;
}

export interface ICreateStatusPayload {
  title: string;
  order: number;
  projectId: string;
}

export interface IUpdateTaskPayload {
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  assignTo: string;
  priorityId: string;
  priorityName?: string;
  interationId: string;
  interationName?: string;
  projectId: string;
  prevId: string | null;
  statusId: string;
  typeId: string;
  taskId?: string;
  memberId?: string;
}

export interface IChangeTaskStatusPayload {
  id: string;
  statusId: string;
  memberId?: string;
}
export interface ITrashBinRecord {
  taskId: string;
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  expireTime: Date;
  createTime: Date;
  deleteAt: Date;
  isDelete: boolean;
  assignTo: string;
  createBy: string;
  typeName: string;
  statusName: string;
  statusId: string;
  typeId: string;
  priorityName: string;
  interationName: string;
  subTask: string[];
}

export interface IUpdateStatusOrderPayload {
  statusId: string;
  order: number;
}
