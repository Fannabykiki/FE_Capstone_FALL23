export enum EProjectStatus {
  Open = 1,
  Close = 2,
}

export enum EProjectPrivacyStatusLabel {
  Public = "Public",
  Private = "Private",
}

export interface ICreateProjectPayload {
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectStatus: EProjectStatus;
  privacyStatus: boolean;
}

export interface IUpdatePrivacyProjectPayload {
  id: string;
  privacyStatus: boolean;
}

export interface IUpdateInfoProjectPayload {
  id: string;
  data: Partial<ICreateProjectPayload>;
}

export interface IProject {
  projectId: string;
  projectName: string;
  description: string;
  projectStatus: EProjectStatus;
  startDate: string;
  endDate: string;
  createBy: string;
  createAt: string;
  deleteAt: string | null;
  expireAt: string | null;
  privacyStatus: boolean;
}
