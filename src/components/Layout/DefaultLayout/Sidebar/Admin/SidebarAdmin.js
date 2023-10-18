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

const { Link } = Typography;

const items = [
  {
    label: <Link href="/admin/dashboard">Dashboard</Link>,
    key: "dashboard",
    icon: <SignalFilled />,
  },
  {
    label: <Link href="/admin/user">User</Link>,
    key: "user",
    icon: <UserOutlined />,
  },
  {
    label: <Link href="/admin/project">Project</Link>,
    key: "project",
    icon: <ProjectFilled />,
  },
  {
    label: <Link href="/admin/permission">Permission</Link>,
    key: "permission",
  },
];

const SidebarAdmin = () => {
  const navigate = useNavigate();

  const signOutHandler = () => {
    sessionStorage.clear();
    navigate("/logout");
  };

  return (
    <div className="sidebar-admin">
      <div className="imgSidebar">
        <img src={logoHeader} alt="logoHeader" />
      </div>
      <Menu mode="inline" items={items} />
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
