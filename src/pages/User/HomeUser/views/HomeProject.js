import React from "react";
import "./HomeProject.css";
import SidebarProject from "../../../../components/Layout/DefaultLayout/Sidebar/User/SidebarProject";
import HeaderUser from "../../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
import Footer from "../../../../components/Layout/DefaultLayout/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Summary from "../../Overview/Summary/Summary";
import Dashboard from "../../Overview/Dashboard/Dashboard";
import Board from "../../Project/Board/Board/views/Board";
import { Divider } from "antd";

const HomeProject = () => {
  return (
    <div className="HomeProject">
      <SidebarProject />
      <div className="container-homeproject">
        <div>
          <HeaderUser />
          <Divider className="divider-custom" />
        </div>
        <Routes>
          <Route path="/overview/summary" element={<Summary />} />
          <Route path="/overview/Dashboard" element={<Dashboard />} />
          <Route path="/board/boards" element={<Board />} />
        </Routes>
        <div className="FooterHomeProject">
          <Divider className="divider-custom" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeProject;
