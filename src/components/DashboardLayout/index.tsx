import { useAuthContext } from "@/context/Auth";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { UpdateProfile } from "../Modal";
import DashboardHeader from "./Header";
import DashboardSider from "./Sider";

export default function DashboardLayout() {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <DashboardSider />
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
    </>
  );
}
