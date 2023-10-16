import React from "react";
import SidebarHome from "../../../../components/Layout/DefaultLayout/Sidebar/User/SidebarHome";
import HeaderUser from "../../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
import Footer from "../../../../components/Layout/DefaultLayout/Footer/Footer";
import ProjectList from "../../Project/views/ProjectList";
import "./Home.css";
import { Divider } from "antd";

const HomeUser = () => {
  console.log(sessionStorage.isAdmin);

  return (
    <div className="HomeUser">
      <SidebarHome />
      <div className="Container">
        <div>
          <HeaderUser />
          <Divider className="divider-custom" />
        </div>
        <div>
          <ProjectList />
        </div>
        <div className="FooterUser">
          <Divider className="divider-custom" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
