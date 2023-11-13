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
