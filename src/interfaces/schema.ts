import { IAdminRoles } from "./role";

export interface IPermissionSchemes {
  schemaId: string;
  schemaName: string;
  description: string;
}

export interface ISchema {
  schemaId: string;
  schemaName: string;
  description: string;
  rolePermissions: {
    permissionId: string;
    name: string;
    description: string;
    roles: IAdminRoles["role"][];
  }[];
}

export interface IGrantPermissionRequest {
  id: string;
  data: {
    schemaId: string;
    roleId: string;
    permissionIds: string[];
  };
}

export interface IRevokePermissionRequest {
  id: string;
  data: {
    schemaId: string;
    permissionId: string;
    roleIds: string[];
  };
}
