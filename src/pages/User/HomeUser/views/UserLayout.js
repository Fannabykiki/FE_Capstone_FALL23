import React from "react";
import SidebarProject from "../../../../components/Layout/DefaultLayout/Sidebar/User/SidebarProject";
import HeaderUser from "../../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
import Footer from "../../../../components/Layout/DefaultLayout/Footer/Footer";

const UserLayout = ({ children }) => {
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
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
