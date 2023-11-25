import { IAdminRoles } from "./role";

export interface IPermissionSchemes {
  schemaId: string;
  schemaName: string;
  description: string;
  projectsUsed: {
    projectId: string;
    projectName: string;
    description: string;
    projectStatus: string;
  }[];
}

export interface ISchema {
  schemaId: string;
  schemaName: string;
  description: string;
  rolePermissions: {
    permissionId: string;
    name: string;
    description: string;
    roles: IAdminRoles[];
  }[];
}

export interface IGrantPermissionRequest {
  schemaId: string;
  roleId: string;
  permissionIds: string[];
}

export interface IRevokePermissionRequest {
  schemaId: string;
  permissionId: string;
  roleIds: string[];
}
