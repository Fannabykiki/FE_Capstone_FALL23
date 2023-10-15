import React from "react";
import "./SidebarUser.css";
import { Menu } from "antd";
import logoHeader from "../../../../../assets/images/LogoHeader.png";
import { HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const SidebarUser = () => {
  return (
    <div className="sidebar-user">
      <Menu mode="vertical" theme="light">
        <div>
          <img src={logoHeader} alt="logoHeader" />
        </div>
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
    </div>
  );
};

export default SidebarUser;
