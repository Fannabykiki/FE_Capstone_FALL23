import { useAuthContext } from "@/context/Auth";
import useProjectDetail from "@/hooks/useProjectDetail";
import { paths } from "@/routers/paths";
import { classNames, getPathSegments } from "@/utils/common";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Breadcrumb, Layout, Typography } from "antd";
import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserMenu from "../UserMenu";

interface RouteObj {
  [key: string]: string;
}

export default function ProjectHeader() {
  const { projectId } = useParams();
  const { detail } = useProjectDetail(projectId);
  const navigate = useNavigate();
  const routes = useMemo<RouteObj>(() => {
    const routeObject = {
      [paths.user]: "Projects",
      [paths.project.detail(projectId)]: "Summary",
      [paths.project.tasks(projectId)]: "Work Items",
      [paths.project.sprint(projectId)]: "Sprints",
      [paths.project.calendar(projectId)]: "Calendar",
      [paths.project.trash(projectId)]: "Trash Bin",
      [paths.project.report(projectId)]: "Report",
      [paths.project.settings(projectId)]: "Settings",
    };
    if (detail) {
      routeObject[paths.project.detail(detail.projectId)] = detail.projectName;
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
    const breadcrumbs = [
      {
        title: "Projects",
        onClick: () => navigate(paths.user),
        className: classNames("cursor-pointer"),
      },
      ...activePaths,
    ];
    return breadcrumbs;
  }, [location.pathname, routes, navigate]);

  return (
    <Layout.Header className="flex items-center justify-between bg-white">
      <Breadcrumb
        className="whitespace-nowrap font-semibold"
        items={breadcrumbItems}
      />
      <div className="flex gap-x-6 items-center">
        <Badge
          count={100}
          overflowCount={10}
          size="small"
          className="select-none cursor-pointer"
        >
          <BellOutlined className="text-2xl" />
        </Badge>
        <UserMenu>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
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
      </div>
    </Layout.Header>
  );
}
