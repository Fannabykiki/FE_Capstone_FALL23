import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/views/LoginPage";
import RegisterPage from "../pages/RegisterPage/views/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage, layout: null },
];

const privateRoutes = [
  { path: "/forgotpassword", component: ForgotPasswordPage },
];

export { publicRoutes, privateRoutes };
