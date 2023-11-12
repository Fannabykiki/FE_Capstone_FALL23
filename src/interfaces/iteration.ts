export interface ICreateIterationPayload {
  iterationName: string;
  startDate: Date;
  endDate: Date;
  boardId: string;
}

export interface IUpdateIterationPayload {
  id: string;
  data: Partial<ICreateIterationPayload>;
}

export interface IIteration {
  interationId: string;
  interationName: string;
  startDate: Date;
  endDate: Date;
  boardId: string;
  statusId: string;
  workItemResponses: [];
}
