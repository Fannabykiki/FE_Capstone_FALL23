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
      <div className="HomeUser">
        <SidebarHome />
      </div>
      <div>

        <div>
          <HeaderUser />
          <Divider className="divider-custom" />
        </div>
        <ProjectList />

        <div>

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
