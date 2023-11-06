import { useAuthContext } from "@/context/Auth";
import { paths } from "@/routers/paths";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Typography } from "antd";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import UserMenu from "../UserMenu";

interface RouteObj {
  [key: string]: string;
}

export default function UserHeader() {
  const routes = useMemo<RouteObj>(
    () => ({
      [paths.dashboard]: "Dashboard",
    }),
    []
  );

  const { userInfo } = useAuthContext();

  const location = useLocation();

  const breadcrumbItems = useMemo(
    () =>
      location.pathname
        .slice(1)
        .split("/")
        .map((item) => ({
          title: routes[item],
        })),
    [location.pathname, routes]
  );

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
