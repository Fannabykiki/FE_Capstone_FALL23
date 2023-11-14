import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import Header from "../Layout/Header";
import ProjectSider from "./Sider";
import Footer from "../Layout/Footer";

export default function ProjectLayout() {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Layout>
          <ProjectSider />
          <Layout.Content className="flex-1 flex flex-col">
            <Header />
            <div className="p-8 flex-1 overflow-y-auto">
              <Outlet />
            </div>
            <Footer />
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
}
