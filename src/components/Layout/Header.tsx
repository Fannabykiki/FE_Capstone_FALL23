import { Badge, Breadcrumb, Layout, Popover, Typography } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
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
import Notification from "@/components/Notifications/Notification";
import SignalRHandler from "../SignalRHandler";
import { schemaApi } from "@/utils/api/schema";
import { useQuery } from "@tanstack/react-query";
import { ISchema } from "@/interfaces/schema";

interface RouteObj {
  [key: string]: string;
}

export default function Header() {
  const { projectId, schemaId } = useParams();

  const { detail } = useProjectDetail(projectId);

  const navigate = useNavigate();

  const { userInfo } = useAuthContext();

  const { data: schema } = useQuery<ISchema>({
    queryKey: [schemaApi.getAdminSchemaDetailKey, userInfo?.id, schemaId],
    queryFn: ({ signal }) => schemaApi.getAdminSchemaDetail(signal, schemaId!),
    enabled: Boolean(userInfo?.id) && Boolean(schemaId),
  });

  const routes = useMemo<RouteObj>(() => {
    const routeObject = {
      [paths.user]: "Projects",
      [paths.admin.index]: "Admin Dashboard",
      [paths.admin.userManagement]: "User Management",
      [paths.admin.roleManagement]: "Role Management",
      [paths.admin.permissionManagement]: "Permission Schemes",
    };
    if (detail && projectId) {
      routeObject[generatePath(paths.project.detail, { projectId })] =
        "Summary";
      routeObject[generatePath(paths.project.tasks, { projectId })] = "Tasks";
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
    if (schemaId && schema) {
      routeObject[generatePath(paths.admin.projectPermission, { schemaId })] =
        schema.schemaName;
    }
    return routeObject;
  }, [detail, schema, projectId, schemaId]);

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

  const notificationEventHandler = {
    message: "EmitNotification",
    handler: () => {},
  };

  return (
    <Layout.Header className="flex items-center justify-between bg-white shadow-custom">
      <Breadcrumb
        className="whitespace-nowrap font-semibold"
        items={breadcrumbItems}
      />
      <div className="flex gap-x-6 items-center">
        <Popover content={<Notification />} placement="bottom" trigger="click">
          <Badge
            count={11}
            overflowCount={10}
            className="cursor-pointer select-none"
          >
            <BellOutlined className="text-2xl" />
          </Badge>
        </Popover>

        <UserMenu>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer">
              <UserOutlined className="h-10 w-10 bg-neutral-200 border border-solid rounded-full flex justify-center" />
              <div className="flex flex-col">
                <Typography.Text className="font-semibold text-base break-keep">
                  {userInfo?.userName || "User"}
                </Typography.Text>
                <Typography.Text className="break-keep">
                  {userInfo?.email || "Email"}
                </Typography.Text>
              </div>
            </div>
          </div>
        </UserMenu>
      </div>
      <SignalRHandler eventHandlers={[notificationEventHandler]} />
    </Layout.Header>
  );
}
