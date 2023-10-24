import React from "react";
import "./SideBarSetting.css"
import { Menu } from "antd";
import logoHeader from "../../../../../assets/images/LogoHeader.png";
import ProjectDetails from "src/pages/User/ProjectSettings/Components/ProjectDetails";
import ProjectPermission from "src/pages/User/ProjectSettings/Components/ProjectPermission";
import ProjectRolesUser from "src/pages/User/ProjectSettings/Components/ProjectRolesUser";

import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    HomeOutlined,
    MailOutlined,
    PieChartOutlined,
    SettingOutlined,
    ExportOutlined,
    TeamOutlined,
    UserOutlined,
    FileProtectOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from 'react';

const { SubMenu } = Menu;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}



const SidebarSettingProject = () => {


    return (
        <div className="sidebar-setting">
            <Menu mode="vertical" theme="light" >
                <h2 style={{ textAlign: "center", color: "#227e79" }}>Project Setting</h2>


                <Menu.Item key="ProjectDetails" icon={<ExportOutlined />}>
                    <Link to={"/project-settings/details"}>Project Details</Link>
                </Menu.Item>
                <Menu.Item key="UserandRoles" icon={<TeamOutlined />}>
                    <Link to={"user-roles"}>User and Roles</Link>

                </Menu.Item>
                <Menu.Item key="Permission" icon={<FileProtectOutlined />}>
                    <Link to={"permission"} >Permission</Link>
                </Menu.Item>


            </Menu>

        </div>
    );
};

export default SidebarSettingProject;
