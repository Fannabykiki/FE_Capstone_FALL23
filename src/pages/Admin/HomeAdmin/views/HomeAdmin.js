import React from "react";
import "./HomeAdmin.css";
import Footer from "../../../../components/Layout/DefaultLayout/Footer/Footer";
import HeaderUser from "../../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
import SidebarAdmin from "../../../../components/Layout/DefaultLayout/Sidebar/Admin/SidebarAdmin";
import { Divider } from "antd";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Dashboard/Dashboard";
import ListUser from "../../UserManage/ListUser/views/ListUser";
import ListProject from "../../ProjectManage/ListProject";

const HomeAdmin = () => {
  return (
    <div className="HomeAdmin">
      <SidebarAdmin />
      <div className="Container">
        <div>
          <HeaderUser />
          <Divider className="divider-custom" />
        </div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<ListUser />} />
          <Route path="/project" element={<ListProject />} />
        </Routes>
        <div className="FooterAdmin">
          <Divider className="divider-custom" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
