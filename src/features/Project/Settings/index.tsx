import React, { useState, useMemo } from "react";
import {
  InfoCircleOutlined,
  LockOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import ProjectInformation from "./component/ProjectInfomation";
import ProjectMember from "./component/ProjectMember";
import PermissionRole from "./component/PermissionRole";

import StatusManagement from "./component/StatusManagement";
import useProjectDetail from "@/hooks/useProjectDetail";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@/context/Auth";

interface MenuItem {
  label: string;
  icon: React.ReactElement;
  key: string;
}

export default function ProjectSettings() {
  const { projectId } = useParams();
  const { detail } = useProjectDetail(projectId);
  const { userInfo } = useAuthContext();

  const isAdminOrPO = useMemo(() => {
    const owner = detail?.projectMembers.find((member) => member.isOwner);
    return userInfo?.isAdmin || userInfo?.id === owner?.userId;
  }, [detail?.projectMembers, userInfo]);

  const items: MenuItem[] = [
    {
      label: "Project Information",
      icon: <InfoCircleOutlined />,
      key: "projectInformation",
    },
    {
      label: "Project Member",
      icon: <UserOutlined />,
      key: "projectMember",
    },
    {
      label: "Permission & Role",
      icon: <LockOutlined />,
      key: "permission&role",
    },
    {
      label: "Status Management",
      icon: <WarningOutlined />,
      key: "statusManagement",
    },
  ];

  const [selectedKey, setSelectedKey] = useState(items[0].key);

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
  };

  return (
    <Layout>
      <Sider className="min-h-[calc(100vh_-_116px_-_4rem)] rounded-md">
        <Menu
          className="rounded-md"
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultSelectedKeys={["projectInformation"]}
          style={{ height: "100%" }}
        >
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => handleMenuClick(item.key)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content className="ml-2">
        {selectedKey === "projectInformation" && (
          <ProjectInformation isAdminOrPO={isAdminOrPO} />
        )}
        {selectedKey === "projectMember" && (
          <ProjectMember isAdminOrPO={isAdminOrPO} />
        )}
        {selectedKey === "permission&role" && (
          <PermissionRole isAdminOrPO={isAdminOrPO} />
        )}
        {selectedKey === "statusManagement" && (
          <StatusManagement isAdminOrPO={isAdminOrPO} />
        )}
      </Content>
    </Layout>
  );
}
