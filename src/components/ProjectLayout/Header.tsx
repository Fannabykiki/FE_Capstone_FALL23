import { useAuthContext } from "@/context/Auth";
import useProjectDetail from "@/hooks/useProjectDetail";
import { paths } from "@/routers/paths";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Typography } from "antd";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import UserMenu from "../UserMenu";

interface RouteObj {
  [key: string]: string;
}

export default function ProjectHeader() {
  const { projectId } = useParams();
  const { detail } = useProjectDetail(projectId);
  const routes = useMemo<RouteObj>(() => {
    const routeObject = {
      [paths.user]: "Projects",
    };
    if (detail) {
      routeObject[paths.project.detail(detail.projectId)] = detail.projectName;
    }
    return routeObject;
  }, [detail]);

  const { userInfo } = useAuthContext();

  const location = useLocation();

  const breadcrumbItems = useMemo(() => {
    const breadcrumbs = [
      {
        title: "Projects",
        url: paths.user,
      },
      // ...location.pathname
      //   .slice(1)
      //   .split("/")
      //   .map((item) => ({
      //     title: routes[item],
      //     url: item,
      //   })),
    ];
    return breadcrumbs;
  }, [location.pathname, routes]);

  console.log(breadcrumbItems);

  return (
    <Layout.Header className="flex items-center justify-between bg-white">
      <Breadcrumb
        className="whitespace-nowrap font-semibold"
        items={breadcrumbItems}
      />
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
    </Layout.Header>
  );
}
