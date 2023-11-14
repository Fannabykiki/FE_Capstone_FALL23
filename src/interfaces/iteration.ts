import { ITask } from "./task";

export interface ICreateIterationPayload {
  interationName: string;
  startDate: Date;
  endDate: Date;
  projectId: string;
}

export interface IUpdateIterationPayload {
  id: string;
  data: Partial<ICreateIterationPayload>;
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
