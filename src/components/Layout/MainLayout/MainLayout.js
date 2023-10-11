import React from "react";
import { Layout } from "antd";
import SideBarMenu from "./SidebarMenu";
import Header from "./Header";
import Footer from "./Footer";
import LayoutContent from "./Content";

const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBarMenu />
      <Layout>
        <Header />
        <LayoutContent>{children}</LayoutContent>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
