import React from "react";
import SidebarProject from "../../../../components/Layout/DefaultLayout/Sidebar/User/SidebarProject";
import HeaderUser from "../../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
import Footer from "../../../../components/Layout/DefaultLayout/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Summary from "../../Overview/Summary/Summary";
import Dashboard from "../../Overview/Dashboard/Dashboard";

const HomeProject = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SidebarProject />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <HeaderUser />
        <Routes>
          <Route path="/overview/summary" element={<Summary />} />
          <Route path="/overview/Dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default HomeProject;
