export interface ITask {
  taskId: string;
  title: string;
  taskType: string;
  taskTypeId: string;
  statusId: string;
  taskStatus: string;
  endDate: Date;
  tasks?: ITask[];
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

export interface IGetStatusListResponse {
  boardStatusId: string;
  title: string;
  boardId: string;
  order: number;
  baseResponse: string | null;
}

export interface IGetTypeListResponse {
  typeId: string;
  title: string;
}
