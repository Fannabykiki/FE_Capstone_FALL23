import Dashboard from "@/features/Dashboard";
import AdminDashboard from "@/features/Admin/Dashboard";
import UserManagement from "@/features/Admin/UserManagement";
import RoleManagement from "@/features/Admin/RoleManagement";
import PermissionSchemes from "@/features/Admin/PermissionSchemes";
import ProjectPermission from "@/features/Admin/PermissionSchemes/ProjectPermission";
import Login from "@/features/Login";
import Register from "@/features/Register";

import { paths } from "./paths";
import { PageContainer, ProjectLayout, Layout } from "@/components";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "@/features/ForgotPassword";
import VerifyAccount from "@/features/VerifyAccount";
import UserMainPage from "@/features/User";
import ProjectDetail from "@/features/Project/detail";
import { useAuthContext } from "@/context/Auth";
import { Spin } from "antd";
import ProjectTrashBin from "@/features/Project/Trash";
import ProjectReport from "@/features/Project/Report";

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
        <Route path={paths.dashboard} element={<Layout />}>
          <Route
            index
            element={<PageContainer Component={Dashboard} title="Dashboard" />}
          />
        </Route>
        <Route path={paths.project.index} element={<ProjectLayout />}>
          <Route
            path={paths.project.detail}
            element={
              <PageContainer Component={ProjectDetail} title="Project Detail" />
            }
          />
          <Route
            path={paths.project.trash}
            element={
              <PageContainer
                Component={ProjectTrashBin}
                title="Project Trash"
              />
            }
          />
          <Route
            path={paths.project.report}
            element={
              <PageContainer Component={ProjectReport} title="Project Report" />
            }
          />
        </Route>
        <Route path={paths.user} element={<Layout />}>
          <Route
            index
            element={
              <PageContainer Component={UserMainPage} title="User Dashboard" />
            }
          />
        </Route>
        {/* Admin */}
        <Route path={paths.adminDashboard} element={<Layout isAdmin />}>
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
          <Route
            path={paths.adminPermissionManagement}
            element={
              <PageContainer
                Component={PermissionSchemes}
                title="Permission Schemes"
              />
            }
          />
          <Route
            path={paths.adminProjectPermission}
            element={
              <PageContainer
                Component={ProjectPermission}
                title="Project Permission"
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
