import React from "react";
import "./HomeAdmin.css";
import Footer from "../../../../components/Layout/DefaultLayout/Footer/Footer";
import HeaderUser from "../../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
import SidebarAdmin from "../../../../components/Layout/DefaultLayout/Sidebar/Admin/SidebarAdmin";
import { Divider } from "antd";

const HomeAdminLayout = ({ children }) => {
  return (
    <div className="HomeAdmin">
      <SidebarAdmin />
      <div className="Container">
        <div>
          <HeaderUser />
          <Divider className="divider-custom" />
        </div>
        {children}
        <div className="FooterAdmin">
          <Divider className="divider-custom" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeAdminLayout;
