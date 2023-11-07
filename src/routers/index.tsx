import Dashboard from "@/features/Dashboard";
import Login from "@/features/Login";
import Register from "@/features/Register";
import NotFound from "@/features/404/404";
import AccessDenied from "@/features/403/403";
import HomePage from "@/features/HomePage";

import { paths } from "./paths";
import { DashboardLayout, PageContainer } from "@/components";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "@/features/ForgotPassword";
import VerifyAccount from "@/features/VerifyAccount";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.dashboard} element={<DashboardLayout />}>
          <Route
            index
            element={<PageContainer Component={Dashboard} title="Dashboard" />}
          />
        </Route>
        <Route
          path={paths.notFound}
          element={
            <PageContainer
              requireAuth={false}
              Component={NotFound}
              title="Not Found"
            />
          }
        />
        <Route
          path={paths.accessDenied}
          element={
            <PageContainer
              requireAuth={false}
              Component={AccessDenied}
              title="Access Denied"
            />
          }
        />
        <Route
          path={paths.homePage}
          element={
            <PageContainer
              requireAuth={false}
              Component={HomePage}
              title="Home Page"
            />
          }
        />
        <Route
          path={paths.login}
          element={
            <PageContainer
              requireAuth={false}
              Component={Login}
              title="Login"
            />
          }
        />
        <Route
          path={paths.register}
          element={
            <PageContainer
              requireAuth={false}
              Component={Register}
              title="Register"
            />
          }
        />
        <Route
          path={paths.forgotPassword}
          element={
            <PageContainer
              requireAuth={false}
              Component={ForgotPassword}
              title="Forgot Password"
            />
          }
        />
        <Route
          path={paths.verifyAccount}
          element={
            <PageContainer
              requireAuth={false}
              Component={VerifyAccount}
              title="Verify Account"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
