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
};
