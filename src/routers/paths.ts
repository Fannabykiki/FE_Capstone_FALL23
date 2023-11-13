import pick from "lodash/pick";

export const paths = {
  dashboard: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  verifyAccount: "/verify-account",
  user: "/user",
  joinProject: "/user/invite",
  notification: "/user/notifications",
  project: {
    index: "/project",
    detail: `/project/:projectId`,
    tasks: `/project/:projectId/tasks`,
    sprint: `/project/:projectId/sprint`,
    calendar: `/project/:projectId/calendar`,
    trash: `/project/:projectId/trash`,
    report: `/project/:projectId/report`,
    settings: `/project/:projectId/settings`,
  },
  admin: {
    index: "/admin",
    userManagement: "/admin/user",
    roleManagement: "/admin/role",
    permissionManagement: "/admin/permission",
    projectPermission: "/admin/permission/:schemaId",
  },
};

export const adminPaths = Object.assign(
  pick(paths.admin, [
    "index",
    "userManagement",
    "roleManagement",
    "permissionManagement",
    "projectPermission",
  ]),
  pick(paths.project, [
    "index",
    "detail",
    "tasks",
    "sprint",
    "calendar",
    "trash",
    "report",
    "settings",
  ])
);

export const userPaths = Object.assign(
  {
    ...pick(paths, ["user", "joinProject", "notification"]),
    ...pick(paths.project, [
      "index",
      "detail",
      "tasks",
      "sprint",
      "calendar",
      "trash",
      "report",
      "settings",
    ]),
  },
  {}
);
