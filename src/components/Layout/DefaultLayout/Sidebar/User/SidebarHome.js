import React from "react";
import "./SidebarUser.css";
import { Menu, Button } from "antd";
import logoHeader from "../../../../../assets/images/LogoHeader.png";
import { HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const SidebarUser = () => {
  return (
    <div className="sidebar-user-home">
      <Menu mode="vertical" theme="light">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logoHeader} alt="logoHeader" />
        </div>
        <SubMenu key="overview" title="Overview" icon={<UserOutlined />}>
          <Menu.Item key="summary">
            <Link to="/user/overview/summary">Summary</Link>
          </Menu.Item>
          {/* Add more sub-items as needed */}
        </SubMenu>
      </Menu>
      <div className="sidebar-footer">
        <Button className="logout-button">Logout</Button>
      </div>
    </div>
  );
};

export default SidebarUser;
