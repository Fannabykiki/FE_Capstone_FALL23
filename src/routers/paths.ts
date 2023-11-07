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
