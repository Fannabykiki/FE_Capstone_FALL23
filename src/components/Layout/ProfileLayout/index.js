import React from "react";

import SidebarProfile from "../DefaultLayout/Sidebar/User/SidebarProfile";
import HeaderUser from "../DefaultLayout/Header/HeaderUser/HeaderUser";
import Footer from "../DefaultLayout/Footer/Footer";

const ProfileLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SidebarProfile />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <HeaderUser />
        <div
          style={{
            minHeight: "calc(100vh - 110px)",
          }}
        >
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProfileLayout;
