import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/views/LoginPage";
import RegisterPage from "../pages/RegisterPage/views/RegisterPage";
import LogoutPage from "../pages/LogoutPage/Logout";
import HomeUser from "../pages/User/HomeUser/views/HomeUser";
import HomeAdmin from "../pages/Admin/HomeAdmin/views/HomeAdmin";
import VerifyMail from "../pages/RegisterPage/views/VerifyMail";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/views/ForgotPasswordPage";
import Home from "../pages/User/Home/views/Home";
import VerifyAccount from "../pages/RegisterPage/views/VerifyAccount";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage, layout: null },
  { path: "/logout", component: LogoutPage, layout: null },
  { path: "/register", component: RegisterPage, layout: null },
  { path: "/forgot-password", component: ForgotPasswordPage, layout: null },
  { path: "/verify-mail", component: VerifyMail, layout: null },
  { path: "/user", component: Home, layout: null },
<<<<<<< HEAD
  { path: "/admin", component: HomeAdmin, layout: null },
=======
  { path: "/verify-account", component: VerifyAccount, layout: null },
>>>>>>> 57552be7733a9c303485cf3c2ede82e2b33f496b
];

const privateRoutes = [
  // { path: "/user", component: HomeUser, layout: null },
];

export { publicRoutes, privateRoutes };
