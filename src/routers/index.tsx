import Dashboard from "@/features/Dashboard";
import AdminDashboard from "@/features/Admin/Dashboard";
import UserManagement from "@/features/Admin/UserManagement";
import RoleManagement from "@/features/Admin/RoleManagement";
import Login from "@/features/Login";
import Register from "@/features/Register";

import { paths } from "./paths";
import { DashboardLayout, PageContainer } from "@/components";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "@/features/ForgotPassword";
import VerifyAccount from "@/features/VerifyAccount";
import { useAuthContext } from "@/context/Auth";
import { Spin } from "antd";

export default function Routers() {
  const { isAuthenticated, userInfo } = useAuthContext();

  if (isAuthenticated && !userInfo) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spin />
      </div>
    );
  }

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
          path={paths.adminDashboard}
          element={<DashboardLayout isAdmin />}
        >
          <Route
            index
            element={
              <PageContainer
                Component={AdminDashboard}
                title="Admin Dashboard"
              />
            }
          />
          <Route
            path={paths.adminUserManagement}
            element={
              <PageContainer
                Component={UserManagement}
                title="User Management"
              />
            }
          />
          <Route
            path={paths.adminRoleManagement}
            element={
              <PageContainer
                Component={RoleManagement}
                title="Role Management"
              />
            }
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
