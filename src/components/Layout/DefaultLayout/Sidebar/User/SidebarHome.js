import React from "react";
import "./Sidebar.css";
import { Menu, Button, Typography } from "antd";
import logoHeader from "../../../../../assets/images/LogoHeader.png";
import Avatar from "react-avatar";
import { LogoutOutlined } from "@ant-design/icons";

const { Text } = Typography;

const SidebarUser = () => {
  return (
    <div className="sidebar-user-home">
      <Menu mode="vertical" theme="light">
        <div className="imgSidebar">
          <img src={logoHeader} alt="logoHeader" />
        </div>
        <Menu.Item key="overview" title="Overview">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar className="avatar" square size="35" textSizeRatio={2} />
            <Text style={{ marginLeft: "15px" }}>ABC</Text>
          </div>
        </Menu.Item>
      </Menu>
      <div className="sidebar-footer">
        <Button
          size="middle"
          icon={<LogoutOutlined />}
          className="logout-button"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default SidebarUser;
