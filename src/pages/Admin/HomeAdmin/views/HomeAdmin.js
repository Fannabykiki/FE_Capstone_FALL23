import React from "react";
import "./HomeAdmin.css";
import Footer from "../../../../components/Layout/DefaultLayout/Footer/Footer";
import HeaderUser from "../../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
import SidebarAdmin from "../../../../components/Layout/DefaultLayout/Sidebar/Admin/SidebarAdmin";
import { Divider } from "antd";

const HomeAdmin = () => {
  return (
    <div className="HomeAdmin">
      <SidebarAdmin />
      <div className="Container">
        <div>
          <HeaderUser />
          <Divider className="divider-custom" />
        </div>
        <div>List</div>
        <div className="FooterAdmin">
          <Divider className="divider-custom" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
