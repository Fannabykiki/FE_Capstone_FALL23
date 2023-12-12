import pick from "lodash/pick";

export const paths = {
  dashboard: "/",
  notFound: "*",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  verifyAccount: "/verify-account",
  user: "/user",
  joinProject: "/invitation",
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
    kanban: `/project/:projectId/kanban`,
  },
  admin: {
    index: "/admin",
    userManagement: "/admin/user",
    roleManagement: "/admin/role",
    permissionManagement: "/admin/permission",
    projectPermission: "/admin/permission/:schemaId",
    notification: "/user/notifications",
  },
};

const projectPath = pick(paths.project, [
  "index",
  "detail",
  "tasks",
  "sprint",
  "calendar",
  "trash",
  "report",
  "settings",
  "kanban",
]);

export const adminPaths = Object.assign(
  pick(paths.admin, [
    "index",
    "userManagement",
    "roleManagement",
    "permissionManagement",
    "projectPermission",
    "notification",
  ]),
  projectPath
);

export const userPaths = Object.assign(
  pick(paths, ["user", "joinProject", "notification"]),
  projectPath
);
