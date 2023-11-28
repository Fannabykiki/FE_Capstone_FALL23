import { ITask } from "./task";

export interface ICreateIterationPayload {
  interationName: string;
  startDate: Date;
  endDate: Date;
  projectId: string;
}

export interface IUpdateIterationPayload {
  interationId: string;
  interationName: string;
  startDate: Date;
  endDate: Date;
  statusId: string;
}

export interface IIteration {
  interationId: string;
  interationName: string;
  status: string;
  startDate: Date;
  endDate: Date;
  boardId: string;
  tasks: ITask[];
}
