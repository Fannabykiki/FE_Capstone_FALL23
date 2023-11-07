import pick from "lodash/pick";

export const paths = {
  dashboard: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  verifyAccount: "/verify-account",
  userPages: {
    index: "/user",
    dashboard: "/user",
    project: {
      index: "/user/project",
      detail: (projectId = ":projectId") => `/user/project/${projectId}`,
    },
  },
  adminDashboard: "/admin",
  adminUserManagement: "/admin/user",
  adminRoleManagement: "/admin/role",
  adminPermissionManagement: "/admin/permission",
  adminProjectPermission: "/admin/permission/:projectId",
};

export const adminPaths = pick(paths, [
  "adminDashboard",
  "adminUserManagement",
  "adminRoleManagement",
  "adminPermissionManagement",
  "adminProjectPermission",
]);
