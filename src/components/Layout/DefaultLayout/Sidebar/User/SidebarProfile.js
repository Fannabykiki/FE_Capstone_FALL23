import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";

import logoHeader from "../../../../../assets/images/LogoHeader.png";
import { routes } from "../../../../../navigations/routes";
import "./Sidebar.css";

const items = [
  {
    label: <b>Profile</b>,
    key: routes.UserProfile.path,
  },
  {
    label: <b>Change password</b>,
    key: routes.ChangePassword.path,
  },
];

const SidebarProfile = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const signOutHandler = () => {
    navigate(routes.Logout.path);
  };

  return (
    <div className="sidebar-user">
      <div className="imgSidebar">
        <img src={logoHeader} alt="logoHeader" />
      </div>
      <Menu
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={["overview"]}
        mode="inline"
        theme="light"
        items={items}
        onClick={(items) => {
          navigate(items.key);
        }}
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

export default SidebarProfile;
