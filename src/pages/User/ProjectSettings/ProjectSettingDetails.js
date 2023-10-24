import React from "react";
import { Divider } from "antd";
import SidebarHome from "../../../components/Layout/DefaultLayout/Sidebar/User/SidebarHome";
import HeaderUser from "../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
import { Footer } from "antd/es/layout/layout";
import SidebarSettingProject from "../../../components/Layout/DefaultLayout/Sidebar/User/SideBarSettingProject";
import "./ProjectSetting.css";

const ProjectSettingDetails = () => {
  return (
    <>
      <div className="Container">
        <div className="HomeUser">
          <SidebarHome />
          <SidebarSettingProject></SidebarSettingProject>
        </div>
      </div>
      <div>
        <div>
          <HeaderUser />
          <Divider className="divider-custom" />
        </div>
        <div className="FooterUser">
          <Divider className="divider-custom" />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProjectSettingDetails;
