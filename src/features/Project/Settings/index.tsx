import React, { useLayoutEffect, useState } from "react";
import {
  InfoCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import ProjectInformation from "./component/ProjectInfomation";
import ProjectMember from "./component/ProjectMember";
import PermissionRole from "./component/PermissionRole";
import useProjectDetail from "@/hooks/useProjectDetail";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "@/context/Auth";
import { paths } from "@/routers/paths";

interface MenuItem {
  label: string;
  icon: React.ReactElement;
  key: string;
}

export default function ProjectSettings() {
  const { projectId } = useParams();
  const { detail } = useProjectDetail(projectId);
  const { userInfo } = useAuthContext();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (detail && userInfo) {
      const owner = detail.projectMembers.find((member) => member.isOwner);
      if (!userInfo.isAdmin && userInfo.id !== owner?.userId) {
        navigate(
          generatePath(paths.project.detail, { projectId: detail.projectId })
        );
      }
    }
  }, [userInfo, detail, navigate]);
  
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
  ];

  const [selectedKey, setSelectedKey] = useState(items[0].key);

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
  };

  return (
    <>
      <Layout>
        <Sider className="min-h-screen rounded-md">
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
          {selectedKey === "projectInformation" && <ProjectInformation />}
          {selectedKey === "projectMember" && <ProjectMember />}
          {selectedKey === "permission&role" && <PermissionRole />}
        </Content>
      </Layout>
    </>
  );
}
