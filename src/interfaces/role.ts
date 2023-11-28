export interface IAdminRoles {
  roleId: string;
  roleName: string;
  description: string;
  projectsUsed: {
    description: string;
    projectId: string;
    projectName: string;
    projectStatus: string;
  }[];
}

export interface IAdminGrantPermissionList {
  roleId: string;
  roleName: string;
  description: string;
}

export interface IAdminRevokePermissionList {
  roleId: string;
  roleName: string;
  description: string;
}
