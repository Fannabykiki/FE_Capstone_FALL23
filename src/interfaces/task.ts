export interface ITask {
  taskId: string;
  title: string;
  decription: string;
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
}

export interface ITaskStatus {
  boardStatusId: string;
  title: string;
  boardId: string;
  baseResponse: string | null;
}

export interface ICreateTaskRequest {
  title: string;
  decription: string;
  startDate: Date;
  dueDate: Date;
  assignTo: string;
  priorityId: string;
  interationId: string;
  projectId: string;
  prevId: string | null;
  statusId: string;
  typeId: string;
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

export interface IUpdateTaskPayload {
  id: string;
  data: ITask;
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
