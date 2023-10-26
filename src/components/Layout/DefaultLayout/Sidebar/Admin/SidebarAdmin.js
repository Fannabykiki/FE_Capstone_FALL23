import React from "react";
import "./SidebarAdmin.css";
import logoHeader from "../../../../../assets/images/LogoHeader.png";
import { Button, Menu, Typography } from "antd";
import {
  FileProtectOutlined,
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
    label: <Text className="txtSidebar">Dashboard</Text>,
    key: "/admin/dashboard",
    icon: <SignalFilled />,
  },
  {
    label: <Text className="txtSidebar">User</Text>,
    key: "/admin/user",
    icon: <UserOutlined />,
  },
  {
    label: <Text className="txtSidebar">Project</Text>,
    key: "/admin/project",
    icon: <ProjectFilled />,
  },
  {
    label: <Text className="txtSidebar">Permission</Text>,
    key: "/admin/permission",
    icon: <FileProtectOutlined />,
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
