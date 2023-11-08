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
    detail: "/project/:projectId",
    trash: "/project/:projectId/trash",
    report: "/project/:projectId/report",
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
