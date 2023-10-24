import React from "react";
import "./SideBarSetting.css"
import { Menu } from "antd";
import logoHeader from "../../../../../assets/images/LogoHeader.png";
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

const items = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("Option 3", "3", <ContainerOutlined />),
    getItem("Navigation One", "sub1", <MailOutlined />, [
        getItem("Option 5", "5"),
        getItem("Option 6", "6"),
        getItem("Option 7", "7"),
        getItem("Option 8", "8"),
    ]),
    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
        getItem("Option 9", "9"),
        getItem("Option 10", "10"),
        getItem("Submenu", "sub3", null, [
            getItem("Option 11", "11"),
            getItem("Option 12", "12"),
        ]),
    ]),
];

const SidebarSettingProject = () => {
    return (
        <div className="sidebar-setting">
            <Menu mode="vertical" theme="light">
                <h2 style={{ textAlign: "center", color: "#227e79" }}>Project Setting</h2>
                <Menu.Item key="ProjectDetails" icon={<ExportOutlined />}>
                    Project Details
                    <Link to={"/loon"}></Link>
                </Menu.Item>
                <Menu.Item key="UserandRoles" icon={<TeamOutlined />}>
                    User and Roles
                </Menu.Item>
                <Menu.Item key="Permission" icon={<FileProtectOutlined />}>
                    Permission
                </Menu.Item>



                {/* <SubMenu href="/hihi" key="user-roles" title="User and Roles" icon={<UserOutlined />}>
                    <Link to="hihi"></Link>
                </SubMenu>
                <SubMenu href="/hihi" key="" title="Permission" icon={<UserOutlined />}>
                    <Link to="hihi"></Link>
                </SubMenu> 
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                    Setting
                </Menu.Item> */}
            </Menu>


        </div>
    );
};

export default SidebarSettingProject;
