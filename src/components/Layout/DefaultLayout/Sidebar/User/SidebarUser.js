import React from "react";
import "./Sidebar.css";
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
  UserOutlined,
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

const SidebarUser = () => {
  return (
    <div className="sidebar-user">
      <Menu mode="vertical" theme="light">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Overview
        </Menu.Item>
        <SubMenu key="overview" title="Overview" icon={<UserOutlined />}>
          <Menu.Item key="summary">
            <Link to="/user/overview/summary">Summary</Link>
          </Menu.Item>
          {/* Add more sub-items as needed */}
        </SubMenu>
        <SubMenu key="user" title="User" icon={<UserOutlined />}>
          <Menu.Item key="profile">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          {/* Add more sub-items as needed */}
        </SubMenu>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
      <div className="imgSidebar">
        <img src={logoHeader} alt="logoHeader" />
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  );
};

export default SidebarUser;
