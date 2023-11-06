import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import UserHeader from "./Header";
import UserSider from "./Sider";

export default function UserLayout() {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Layout>
          <UserSider />
          <Layout.Content className="flex-1 flex flex-col">
            <UserHeader />
            <div className="bg-neutral-50 p-8 flex-1 overflow-y-auto">
              <Outlet />
            </div>
          </Layout.Content>
          {/* <DashboardFooter /> */}
        </Layout>
      </Layout>
    </>
  );
}
