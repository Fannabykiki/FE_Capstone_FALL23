import React from "react";
import { Divider } from "antd";
import SidebarHome from "../../../components/Layout/DefaultLayout/Sidebar/User/SidebarHome";
import HeaderUser from "../../../components/Layout/DefaultLayout/Header/HeaderUser/HeaderUser";
import { Footer } from "antd/es/layout/layout";
import SidebarSettingProject from "../../../components/Layout/DefaultLayout/Sidebar/User/SideBarSettingProject";
import "./ProjectSetting.css";
import SidebarUser from "../../../components/Layout/DefaultLayout/Sidebar/User/SidebarHome";
import ProjectDetails from "src/pages/User/ProjectSettings/Components/ProjectDetails" ;
import ProjectPermission from "src/pages/User/ProjectSettings/Components/ProjectPermission" ;
import ProjectRolesUser from "src/pages/User/ProjectSettings/Components/ProjectRolesUser" ;
import { useState } from 'react';
const ProjectSettingDetails = () => {


    const [selectedKey, setSelectedKey] = useState('');

    const handleMenuClick = (key) => {
        setSelectedKey(key);
    };
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
            <div>
           {selectedKey === 'ProjectDetails' && (
                <div>
                    <ProjectDetails></ProjectDetails>
                </div>
            )}
            {selectedKey === 'UserandRoles' && (
                <div>
                    <ProjectRolesUser></ProjectRolesUser>
                </div>
            )}
            {selectedKey === 'Permission' && (
                <div>
                    <ProjectPermission></ProjectPermission>
                </div>
            )}
            </div>
            
        </>
    );
};

export default ProjectSettingDetails;
