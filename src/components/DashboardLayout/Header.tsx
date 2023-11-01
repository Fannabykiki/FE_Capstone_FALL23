import { paths } from "@/routers/paths";
import { Breadcrumb, Layout } from "antd";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

interface RouteObj {
  [key: string]: string;
}

export default function DashboardHeader() {
  const routes = useMemo<RouteObj>(
    () => ({
      [paths.dashboard]: "Dashboard",
    }),
    []
  );

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
    <Layout.Header className="flex items-center justify-between">
      <Breadcrumb
        className="whitespace-nowrap font-semibold"
        items={breadcrumbItems}
      />
    </Layout.Header>
  );
}
