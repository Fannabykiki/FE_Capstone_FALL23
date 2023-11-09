export interface IAdminRoles {
  role: {
    roleId: string;
    roleName: string;
    description: string;
  };
  projectsUsed: {
    description: string;
    projectId: string;
    projectName: string;
    projectStatus: string;
  }[];
}
