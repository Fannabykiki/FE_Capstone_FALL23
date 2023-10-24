import React from "react";
import "./HomeAdmin.css";
import Footer from "../../../../components/Layout/DefaultLayout/Footer/Footer";
import HeaderUser from "../../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
import SidebarAdmin from "../../../../components/Layout/DefaultLayout/Sidebar/Admin/SidebarAdmin";
import { Divider } from "antd";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Dashboard/views/Dashboard";
import ListUser from "../../UserManage/ListUser/views/ListUser";
import ListProject from "../../ProjectManage/ListProject";
import ViewUser from "../../UserManage/ViewUser/views/ViewUser";

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
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/*User*/}
          <Route path="/user" element={<ListUser />} />
          <Route path="/user/view/:id" element={<ViewUser />} />
          {/*Project*/}
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
