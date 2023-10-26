import React from "react";
import { pick, omit } from "lodash";

import LoginPage from "../pages/LoginPage/views/LoginPage";
import RegisterPage from "../pages/RegisterPage/views/RegisterPage";
import LogoutPage from "../pages/LogoutPage/Logout";
import VerifyMail from "../pages/RegisterPage/views/VerifyMail";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/views/ForgotPasswordPage";
import Home from "../pages/User/Home/views/Home";
import VerifyAccount from "../pages/RegisterPage/views/VerifyAccount";
// import CreateNewPassword from "../pages/ForgotPasswordPage/views/CreateNewPassword";
// import ProjectSettingDetails from "../pages/User/ProjectSettings/ProjectSettingDetails";
// import ProjectDetails from "../pages/User/ProjectSettings/Components/ProjectDetails";
import DefaultLayout from "../components/Layout/DefaultLayout/DefaulLayout";
import AdminDashboard from "../pages/Admin/Dashboard/views/Dashboard";
import UserDashboard from "../pages/User/Overview/Dashboard/view";
import ListUser from "../pages/Admin/UserManage/ListUser/views/ListUser";
import ViewUser from "../pages/Admin/UserManage/ViewUser/views/ViewUser";
import ListProject from "../pages/Admin/ProjectManage/ListProject";
import Summary from "../pages/User/Project/Overview/Summary/views/Summary";
import ChangePasswordPage from "../pages/User/ChangePassword/views/ChangePassword";
import UserProfilePage from "../pages/User/UserProfile/views/UserProfile";

export const routes = {
  // User routes
  HomePage: {
    index: true,
    path: "/",
    element: <DefaultLayout />,
  },
  Login: {
    path: "/login",
    element: <LoginPage />,
  },
  Logout: {
    path: "/logout",
    element: <LogoutPage />,
  },
  Register: {
    path: "/register",
    element: <RegisterPage />,
  },
  ForgotPassword: {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  VerifyEmail: {
    path: "/verify-mail",
    element: <VerifyMail />,
  },
  User: {
    path: "/user",
    element: <Home />,
  },
  VerifyAccount: {
    path: "/verify-account",
    element: <VerifyAccount />,
  },
  UserOverViewSummary: {
    path: "/user/overview/summary",
    element: <Summary />,
  },
  UserOverViewDashboard: {
    path: "/user/overview/dashboard",
    element: <UserDashboard />,
  },
  UserProjectId: {
    path: "/user/project/:id",
    element: null,
  },
  UserProfile: {
    path: "/user/profile",
    element: <UserProfilePage />,
  },
  ChangePassword: {
    path: "/user/password/change",
    element: <ChangePasswordPage />,
  },
  // CreateNewPWD: {
  //   path: "/create-newpwd",
  //   element: <CreateNewPassword />,
  // },
  // ProjectSettings: {
  //   path: "/project-settings",
  //   element: <ProjectSettingDetails />,
  // },
  // ProjectSettingsDetail: {
  //   path: "/project-settings/details",
  //   element: <ProjectDetails />,
  // },

  //Admin routes
  AdminDashboard: {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  AdminUser: {
    path: "/admin/user",
    element: <ListUser />,
  },
  AdminView: {
    path: "/admin/user/view/:id",
    element: <ViewUser />,
  },
  AdminProject: {
    path: "/admin/project",
    element: <ListProject />,
  },
};

const publicKeys = ["HomePage", "Login", "Register", "VerifyEmail"];

export const publicRoutes = pick(routes, publicKeys);

export const privateRoutes = omit(routes, publicKeys);
