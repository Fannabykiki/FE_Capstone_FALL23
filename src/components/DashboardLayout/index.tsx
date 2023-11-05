import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./Header";
import UserDashboardSider from "./UserSider";
import AdminDashboardSider from "./AdminSider";

interface Props {
  isAdmin?: boolean;
}

export default function DashboardLayout({ isAdmin }: Props) {
  return (
    <Layout style={{ height: "100vh" }}>
      {isAdmin ? <AdminDashboardSider /> : <UserDashboardSider />}
      <Layout>
        <DashboardHeader />
        <Layout.Content className="flex-1 flex flex-col">
          <div className="bg-neutral-50 p-8 flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </Layout.Content>
        {/* <DashboardFooter /> */}
      </Layout>
    </Layout>
  );
}
