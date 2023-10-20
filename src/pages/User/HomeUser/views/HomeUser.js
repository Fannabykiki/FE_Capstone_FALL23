import React from "react";
import SidebarUser from "../../../../components/Layout/DefaultLayout/Sidebar/User/SidebarUser";
import HeaderUser from "../../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
import Footer from "../../../../components/Layout/DefaultLayout/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Summary from "../../../User/Overview/Summary/Summary";
import Dashboard from "../../../User/Overview/Dashboard/Dashboard";

const HomeUser = ({ chidlren }) => {
  console.log(sessionStorage.isAdmin);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SidebarUser />
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

export default HomeUser;
