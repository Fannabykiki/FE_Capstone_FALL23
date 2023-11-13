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
import { useAuthContext } from "@/context/Auth";
import { Spin } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "@/features/ForgotPassword";
import VerifyAccount from "@/features/VerifyAccount";
import UserDashboard from "@/features/User";
import ProjectDetail from "@/features/Project/Detail";
import ProjectTrashBin from "@/features/Project/Trash";
import ProjectReport from "@/features/Project/Report";
import ProjectSprint from "@/features/Project/Sprint";
import ProjectSettings from "@/features/Project/Settings";
import ProjectCalendar from "@/features/Project/Calendar";
import WorkItem from "@/features/Project/WorkItem";
import InviteMember from "@/features/InviteMember";
import Notifications from "@/features/Notifications";

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
            path={paths.project.tasks}
            element={<PageContainer Component={WorkItem} title="Work Items" />}
          />
          <Route
            path={paths.project.sprint}
            element={
              <PageContainer Component={ProjectSprint} title="Project Sprint" />
            }
          />
          <Route
            path={paths.project.calendar}
            element={
              <PageContainer
                Component={ProjectCalendar}
                title="Project Calendar"
              />
            }
          />
          <Route
            path={paths.project.trash}
            element={
              <PageContainer
                Component={ProjectTrashBin}
                title="Project Trash Bin"
              />
            }
          />
          <Route
            path={paths.project.report}
            element={
              <PageContainer Component={ProjectReport} title="Project Report" />
            }
          />
          <Route
            path={paths.project.settings}
            element={
              <PageContainer
                Component={ProjectSettings}
                title="Project Settings"
              />
            }
          />
        </Route>
        <Route path={paths.user} element={<Layout />}>
          <Route
            index
            element={
              <PageContainer Component={UserDashboard} title="User Dashboard" />
            }
          />
        </Route>
        {/* Admin */}
        <Route path={paths.admin.index} element={<Layout isAdmin />}>
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
            path={paths.admin.userManagement}
            element={
              <PageContainer
                Component={UserManagement}
                title="User Management"
              />
            }
          />
          <Route
            path={paths.admin.roleManagement}
            element={
              <PageContainer
                Component={RoleManagement}
                title="Role Management"
              />
            }
          />
          <Route
            path={paths.admin.permissionManagement}
            element={
              <PageContainer
                Component={PermissionSchemes}
                title="Permission Schemes"
              />
            }
          />
          <Route
            path={paths.admin.projectPermission}
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
        <Route
          path={paths.joinProject}
          element={
            <PageContainer
              requireAuth={false}
              Component={InviteMember}
              title="Invite Member"
            />
          }
        />
        <Route
          path={paths.notification}
          element={
            <PageContainer
              requireAuth={false}
              Component={Notifications}
              title="Notifications"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
