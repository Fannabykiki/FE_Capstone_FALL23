export enum EProjectPrivacyStatusLabel {
  Public = "Public",
  Private = "Private",
}

export interface ICreateProjectPayload {
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectStatus: string;
  privacyStatus: boolean;
}

export interface IUpdatePrivacyProjectPayload {
  projectId: string;
  privacyStatus: boolean;
}

export interface IUpdateProject
  extends Pick<IProject, "projectName" | "description"> {
  isDeleted?: boolean;
  isDelete?: boolean;
}
export interface IUpdateProjectPayload extends IUpdateProject {
  projectId: string;
}

export interface ICreateMemberRolePayload {
  roleName: string;
  description: string;
}

export interface IUpdateMemberRolePayload {
  memberId: string;
  roleId: string;
}

export interface IProject {
  projectId: string;
  projectName: string;
  description: string;
  projectStatus: string;
  memberRole: string;
  startDate: string;
  endDate: string;
  createBy: string;
  createAt: string;
  deleteAt: string | null;
  expireAt: string | null;
  privacyStatus: boolean;
  totalTaskCreated: number;
  totalTaskCompleted: number;
  projectMembers: IProjectMember[];
}

export interface IProjectMember {
  memberId: string;
  userId: string;
  roleId: string;
  projectId: string;
  roleName: string;
  isOwner: boolean;
  fullname: string;
  email: string;
  statusId: string;
  statusName: string;
  userName: string;
}

export interface IAdminProject {
  projectId: string;
  projectName: string;
  description: string;
  projectStatus: string;
  startDate: Date;
  endDate: Date;
  manager: {
    userId: string;
    userName: string;
    email: string;
    phoneNumber: string;
    statusName: string;
    isAdmin: boolean;
    address: string;
    dob: Date | null;
  };
  member: {
    userId: string;
    userName: string;
    email: string;
    phoneNumber: string;
    statusName: string;
    isAdmin: boolean;
    address: string;
    dob: Date | null;
  }[];
  createAt: Date;
  deleteAt: null;
  expireAt: null;
  privacyStatus: boolean;
  pagination: null;
}

export interface IAdminProjectAnalyzation {
  projectActive: number;
  projectActivePercent: number;
  projectDelete: number;
  projectDeletePercent: number;
  projectInActive: number;
  projectInActivePercent: number;
  totalProject: number;
}

export interface IProjectStatus {
  statusId: string;
  statusName: string;
}

export interface IAdminUserProjectList {
  projectId: string;
  projectName: string;
  description: string;
  projectStatus: string;
  manager: {
    userId: string;
    userName: string;
    email: string;
    phoneNumber: string;
    statusName: string;
    isAdmin: boolean;
    address: string;
    dob: Date | null;
  };
  startDate: Date;
}

export interface IWorkItemList {
  taskId: string;
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  createTime: Date;
  deleteAt: Date;
  assignTo: {
    userId: string;
    userName: string;
    email: string;
    phoneNumber: string;
    statusName: string;
    isAdmin: boolean;
    address: string;
    dob: Date;
  };
  createBy: {
    userId: string;
    userName: string;
    email: string;
    phoneNumber: string;
    statusName: string;
    isAdmin: boolean;
    address: string;
    dob: Date;
  };
  taskType: string;
  prevId: string;
  statusId: string;
  taskStatus: string;
  priority: string;
  interation: string;
}

export interface IInteration {
  interationId: string;
  interationName: string;
  startDate: Date;
  endDate: Date;
  boardId: string;
  statusId: string;
  statusName: string;
}

export interface IInvitationInfo {
  createAt: Date;
  invitationId: string;
  inviteBy: string;
  inviteTo: string;
  projectId: string;
  projectName: string;
  statusId: string;
  statusName: string;
}

export interface IReportProject {
  reportProject: {
    totalTask: number;
    dateTime: Date | null;
    reportStatuses: {
      boardStatusId: string;
      title: string;
      numberTask: number;
      percent: number;
    }[];
  };
  reportRecordByWeek: {
    totalTask: number;
    dateTime: Date;
    reportStatuses: {
      boardStatusId: string;
      title: string;
      numberTask: number;
      percent: number;
    }[];
  }[];
  memberTaks: {
    memberId: string;
    userId: string;
    fullname: string;
    userName: string | null;
    email: string;
    roleId: string;
    roleName: string;
    isOwner: boolean;
    totalTasks: number;
    reportStatuses: {
      boardStatusId: string;
      title: string;
      numberTask: number;
      percent: number;
    }[];
    [key: string]: any;
  }[];
}

export interface IRoleByProjectId {
  roleId: string;
  roleName: string;
  description: string;
}
