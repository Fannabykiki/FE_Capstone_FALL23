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

export interface ICreateMemberRolePayload {
  roleName: string;
  description: string;
}

export interface IUpdateMemberRolePayload {
  id: string;
  data: {
    roleId: string;
  };
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

export interface IAdminProject {
  totalProject: number;
  activeProject: number;
  percentActive: number;
  closeProject: number;
  percentClose: number;
  otherProject: number;
  percentOther: number;
  getAllProjectViewModels: {
    projectId: string;
    projectName: string;
    description: string;
    projectStatus: string;
    startDate: Date;
    endDate: Date;
    manager: {
      id: string;
      name: string;
      email: string;
      phoneNumber: string | null;
      statusName: string;
      isAdmin: boolean;
    };
    member: {
      id: string;
      name: string;
      email: string;
      phoneNumber: string | null;
      statusName: string;
      isAdmin: boolean;
    }[];
    createAt: Date;
    deleteAt: Date | null;
    expireAt: Date | null;
    privacyStatus: boolean;
  }[];
}
