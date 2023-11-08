import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import AdminDashboardSider from "./AdminSider";
import UserHeader from "./Header";
import UserSider from "./Sider";

interface IProps {
  isAdmin?: boolean;
}

export default function UserLayout({ isAdmin }: IProps) {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Layout>
          {isAdmin ? <AdminDashboardSider /> : <UserSider />}
          <Layout.Content className="flex-1 flex flex-col">
            <UserHeader />
            <div className="p-8 flex-1 overflow-y-auto">
              <Outlet />
            </div>
          </Layout.Content>
          {/* <DashboardFooter /> */}
        </Layout>
      </Layout>
    </>
  );
}
