export enum EProjectStatus {
  Open = 1,
  Close = 2,
}

export interface ICreateProjectPayload {
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectStatus: EProjectStatus;
  privacyStatus: boolean;
}
