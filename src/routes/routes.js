import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/views/LoginPage";
import RegisterPage from "../pages/RegisterPage/views/RegisterPage";
import HomeUser from "../pages/User/HomeUser/views/HomeUser";
import HomeAdmin from "../pages/Admin/HomeAdmin/views/HomeAdmin";
import VerifyMail from "../pages/RegisterPage/views/VerifyMail";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/views/ForgotPasswordPage";
import Home from "../pages/User/Home/views/Home";
import VerifyAccount from "../pages/RegisterPage/views/VerifyAccount";
import CreateNewPassword from "../pages/ForgotPasswordPage/views/CreateNewPassword";
import ProjectSettingDetails from "../pages/User/ProjectSettings/ProjectSettingDetails";
import ProjectDetails from "../pages/User/ProjectSettings/Components/ProjectDetails";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage, layout: null },
  { path: "/register", component: RegisterPage, layout: null },
  { path: "/forgot-password", component: ForgotPasswordPage, layout: null },
  { path: "/verify-mail", component: VerifyMail, layout: null },
  { path: "/user", component: Home, layout: null },
  { path: "/verify-account", component: VerifyAccount, layout: null },
  { path: "/create-newpwd", component: CreateNewPassword, layout: null },

  { path: "/project-settings", component: ProjectSettingDetails, layout: null },

  { path: "/project-settings/details", component: ProjectDetails, layout: null },

];

const privateRoutes = [
  // { path: "/user", component: HomeUser, layout: null },
  { path: "/admin", component: HomeAdmin, layout: null },
];

export { publicRoutes, privateRoutes };
