import React from "react";
import SidebarHome from "../../../../components/Layout/DefaultLayout/Sidebar/User/SidebarHome";
import HeaderUser from "../../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
import Footer from "../../../../components/Layout/DefaultLayout/Footer/Footer";
import ProjectList from "../../Project/ListProject/ProjectList";
import "./Home.css";
import { Divider } from "antd";

const HomeUser = () => {
  return (
    <div className="Container">
      <HeaderUser />
      <Divider className="divider-custom" />
      <div className="HomeUser">
        <SidebarHome />
        <div className="list-project">
          <ProjectList />
        </div>
      </div>
      <div>
        <div className="FooterUser">
          <Divider className="divider-custom" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
