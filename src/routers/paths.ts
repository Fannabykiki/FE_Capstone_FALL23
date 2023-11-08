import pick from "lodash/pick";

export const paths = {
  dashboard: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  verifyAccount: "/verify-account",
  user: "/user",
  project: {
    index: "/project",
    detail: (projectId = ":projectId") => `/project/${projectId}`,
    tasks: (projectId = ":projectId") => `/project/${projectId}/tasks`,
    sprint: (projectId = ":projectId") => `/project/${projectId}/sprint`,
    calendar: (projectId = ":projectId") => `/project/${projectId}/calendar`,
    trash: (projectId = ":projectId") => `/project/${projectId}/trash`,
    report: (projectId = ":projectId") => `/project/${projectId}/report`,
    settings: (projectId = ":projectId") => `/project/${projectId}/settings`,
  },
  adminDashboard: "/admin",
  adminUserManagement: "/admin/user",
  adminRoleManagement: "/admin/role",
};

export const adminPaths = pick(paths, [
  "adminDashboard",
  "adminUserManagement",
  "adminRoleManagement",
]);
