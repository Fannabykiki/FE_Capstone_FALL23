import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/views/LoginPage";
import RegisterPage from "../pages/RegisterPage/views/RegisterPage";
import HomeUser from "../pages/User/HomeUser/views/HomeUser";
import HomeAdmin from "../pages/Admin/HomeAdmin/views/HomeAdmin";
import VerifyMail from "../pages/RegisterPage/views/VerifyMail";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/views/ForgotPasswordPage";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage, layout: null },
  { path: "/register", component: RegisterPage, layout: null },
  { path: "/forgot-password", component: ForgotPasswordPage, layout: null },
  { path: "/verify-mail", component: VerifyMail, layout: null },
  { path: "/user", component: HomeUser, layout: null },
];

const privateRoutes = [
  // { path: "/user", component: HomeUser, layout: null },
  { path: "/admin", component: HomeAdmin, layout: null },
];

export { publicRoutes, privateRoutes };
