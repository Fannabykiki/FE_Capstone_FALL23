import { Breadcrumb, Layout, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useMemo } from "react";
import { useAuthContext } from "@/context/Auth";
import UserMenu from "../UserMenu";
import useProjectDetail from "@/hooks/useProjectDetail";
import { paths } from "@/routers/paths";
import { classNames, getPathSegments } from "@/utils/common";

interface RouteObj {
  [key: string]: string;
}

export default function Header() {
  const { projectId } = useParams();
  const { detail } = useProjectDetail(projectId);
  const navigate = useNavigate();
  const routes = useMemo<RouteObj>(() => {
    const routeObject = {
      [paths.user]: "Projects",
      [paths.adminDashboard]: "Admin Dashboard",
      [paths.adminUserManagement]: "User Management",
      [paths.adminRoleManagement]: "Role Management",
      [paths.adminPermissionManagement]: "Permission Schemes",
    };
    if (detail && projectId) {
      routeObject[generatePath(paths.project.detail, { projectId })] =
        "Summary";
      routeObject[generatePath(paths.project.tasks, { projectId })] =
        "Work Items";
      routeObject[generatePath(paths.project.sprint, { projectId })] =
        "Sprints";
      routeObject[generatePath(paths.project.calendar, { projectId })] =
        "Calendar";
      routeObject[generatePath(paths.project.trash, { projectId })] =
        "Trash Bin";
      routeObject[generatePath(paths.project.report, { projectId })] = "Report";
      routeObject[generatePath(paths.project.settings, { projectId })] =
        "Settings";
      routeObject[generatePath(paths.project.detail, { projectId })] =
        detail.projectName;
    }
    return routeObject;
  }, [detail, projectId]);

  const { userInfo } = useAuthContext();

  const location = useLocation();

  const breadcrumbItems = useMemo(() => {
    const pathSegments = getPathSegments(location.pathname);
    const activePaths = pathSegments.map((url, idx) => ({
      title: routes[url],
      onClick: () => navigate(url),
      className: classNames(
        idx !== pathSegments.length - 1 ? "cursor-pointer" : "select-none"
      ),
    }));
    const breadcrumbs = [...activePaths];
    if (projectId) {
      breadcrumbs.unshift({
        title: "Projects",
        onClick: () => navigate(paths.user),
        className: classNames("cursor-pointer"),
      });
    }
    return breadcrumbs;
  }, [location.pathname, routes, navigate, projectId]);

  return (
    <Layout.Header className="flex items-center justify-between bg-white shadow-custom">
      <Breadcrumb
        className="whitespace-nowrap font-semibold"
        items={breadcrumbItems}
      />
      <UserMenu>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <UserOutlined className="h-10 w-10 bg-neutral-200 border border-solid rounded-full flex justify-center" />
            <div className="flex flex-col">
              <Typography.Text className="font-semibold text-base break-keep">
                {userInfo?.fullname || "User"}
              </Typography.Text>
              <Typography.Text className="break-keep">
                {userInfo?.email || "Email"}
              </Typography.Text>
            </div>
          </div>
        </div>
      </UserMenu>
    </Layout.Header>
  );
}
