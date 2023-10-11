import React from "react";
import "./SidebarUser.css";
import { Menu } from "antd";
import logoHeader from "../../../../../assets/images/LogoHeader.png";
import { HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const SidebarUser = () => {
  return (
    <div className="sidebar-user">
      <Menu mode="vertical" theme="light">
        <div>
          <img src={logoHeader} alt="logoHeader" />
        </div>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SidebarUser;
