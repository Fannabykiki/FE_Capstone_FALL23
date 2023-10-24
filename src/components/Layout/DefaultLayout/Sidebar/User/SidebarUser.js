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
import Overview from "../../../../../assets/images/Overview.png";
import Board from "../../../../../assets/images/Board.png";
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
  {
    label: <b>Overview</b>,
    key: "/user/overview",
    icon: <img className="iconSidebar" src={Overview} alt="overview" />,
    children: [
      {
        label: "Summary",
        key: "/user/overview/summary",
        icon: <InboxOutlined />,
      },
      {
        label: "Dashboard",
        key: "/user/overview/dashboard",
        icon: <DashboardOutlined />,
      },
      {
        label: "Wiki",
        key: "/user/overview/wiki",
        icon: <ReadOutlined />,
      },
    ],
  },
  {
    label: <b>Board</b>,
    key: "user/board",
    icon: <img className="iconSidebar" src={Board} alt="board" />,
    children: [
      {
        label: "Work items",
        key: "user/board/workitems",
        icon: <FileDoneOutlined />,
      },
      {
        label: "Board",
        key: "user/board/boards",
        icon: <TableOutlined />,
      },
      {
        label: "Sprints",
        key: "user/board/sprints",
        icon: <NodeExpandOutlined />,
      },
      {
        label: "Calendar",
        key: "user/board/calendar",
        icon: <CalendarOutlined />,
      },
      {
        label: "Plans",
        key: "user/board/plans",
        icon: <ProjectOutlined />,
      },
    ],
  },
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

export default SidebarUser;
