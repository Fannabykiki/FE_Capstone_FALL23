import React from "react";
import "./Sidebar.css";
import { Button, Menu, Typography } from "antd";
import logoHeader from "../../../../../assets/images/LogoHeader.png";
import {
  AppstoreOutlined,
  CalendarOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  InboxOutlined,
  LogoutOutlined,
  MailOutlined,
  NodeExpandOutlined,
  ProjectOutlined,
  ReadOutlined,
  SettingOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Link } = Typography;

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
  getItem("Overview", "overview", <MailOutlined />, [
    getItem(<Link href="#">Summary</Link>, "summary", <InboxOutlined />),
    getItem(<Link>Dashboard</Link>, "dashboard", <DashboardOutlined />),
    getItem(<Link>Wiki</Link>, "wiki", <ReadOutlined />),
  ]),
  getItem("Board", "board", <AppstoreOutlined />, [
    getItem(<Link>Work items</Link>, "workitem", <FileDoneOutlined />),
    getItem(<Link>Board</Link>, "board", <TableOutlined />),
    getItem(<Link>Sprints</Link>, "sprint", <NodeExpandOutlined />),
    getItem(<Link>Calendar</Link>, "calendar", <CalendarOutlined />),
    getItem(<Link>Plans</Link>, "plan", <ProjectOutlined />),
  ]),
  getItem("Project settings", "projectsetting", <SettingOutlined />),
];

const SidebarUser = () => {
  const navigate = useNavigate();

  const signOutHandler = () => {
    sessionStorage.clear();
    navigate("/logout");
  };

  return (
    <div className="sidebar-user">
      <div className="imgSidebar">
        <img src={logoHeader} alt="logoHeader" />
      </div>
      <Menu
        defaultSelectedKeys={["summary"]}
        defaultOpenKeys={["overview"]}
        mode="inline"
        theme="light"
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

export default SidebarUser;
