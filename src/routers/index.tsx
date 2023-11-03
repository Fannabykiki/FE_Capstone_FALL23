import Dashboard from "@/features/Dashboard";
import Login from "@/features/Login";
import Register from "@/features/Register";

import { paths } from "./paths";
import { DashboardLayout, PageContainer, UserLayout } from "@/components";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "@/features/ForgotPassword";
import VerifyAccount from "@/features/VerifyAccount";
import UserMainPage from "@/features/User";
import Project from "@/features/User/Project";

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
        <Route path={paths.userPages.index} element={<UserLayout />}>
          <Route
            index
            element={
              <PageContainer Component={UserMainPage} title="User Dashboard" />
            }
          />
          <Route
            element={<PageContainer Component={Project} title="Project" />}
          />
        </Route>
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
