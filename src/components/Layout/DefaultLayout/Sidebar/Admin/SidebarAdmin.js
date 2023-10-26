import React from "react";
import "./SidebarAdmin.css";
import logoHeader from "../../../../../assets/images/LogoHeader.png";
import { Button, Menu, Typography } from "antd";
import {
  LogoutOutlined,
  ProjectFilled,
  SignalFilled,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../../navigations/routes";

const { Text } = Typography;

const items = [
  {
    label: "Dashboard",
    key: "/admin/dashboard",
    icon: <SignalFilled />,
  },
  {
    label: "User",
    key: "/admin/user",
    icon: <UserOutlined />,
  },
  {
    label: "Project",
    key: "/admin/project",
    icon: <ProjectFilled />,
  },
  {
    label: "Permission",
    key: "/admin/permission",
  },
];

const SidebarAdmin = () => {
  const navigate = useNavigate();

  const signOutHandler = () => {
    navigate(routes.Logout.path);
  };

  return (
    <div className="sidebar-admin">
      <div className="imgSidebar">
        <img src={logoHeader} alt="logoHeader" />
      </div>
      <Menu
        onClick={(items) => {
          navigate(items.key);
        }}
        mode="inline"
        items={items}
      />
      <div className="sidebar-footer">
        <Button
          onClick={signOutHandler}
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

export default SidebarAdmin;
