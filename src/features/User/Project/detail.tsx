import BoardTabPane from "@/components/Project/Detail/BoardTabPane";
import ReportTabPane from "@/components/Project/Detail/ReportTabPane";
import SettingsTabPane from "@/components/Project/Detail/SettingsTabPane";
import { useAuthContext } from "@/context/Auth";
import useProjectDetail from "@/hooks/useProjectDetail";
import { IProject } from "@/interfaces/project";
import { paths } from "@/routers/paths";
import {
  AlignCenterOutlined,
  AreaChartOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Tabs, Typography } from "antd";
import { useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TABS = {
  BOARD: "board",
  REPORT: "report",
  SETITNGS: "settings",
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const { userInfo } = useAuthContext();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (!projectId) {
      navigate(paths.user);
    }
  }, [projectId, navigate]);

  const { detail } = useProjectDetail(projectId);

  useEffect(() => {
    if (detail && userInfo) {
      let projects: Partial<IProject>[] = [];
      const savedProjectsString = localStorage.getItem(
        `${userInfo?.id}-projects`
      );
      if (savedProjectsString) {
        projects = JSON.parse(savedProjectsString) as Partial<IProject>[];
      }
      projects
        .filter((project) => project.projectId !== detail.projectId)
        .unshift({
          projectId: detail.projectId,
          projectName: detail.projectName,
          description: detail.description,
        });
      localStorage.setItem(
        `${userInfo?.id}-projects`,
        JSON.stringify(projects.slice(0, 4))
      );
    }
  }, [detail, userInfo]);

  const tabItems = [
    {
      label: (
        <span>
          <AlignCenterOutlined /> Board
        </span>
      ),
      key: TABS.BOARD,
      children: <BoardTabPane />,
    },
    {
      label: (
        <span>
          <AreaChartOutlined /> Report
        </span>
      ),
      key: TABS.REPORT,
      children: <ReportTabPane />,
    },
    {
      label: (
        <span>
          <SettingOutlined /> Settings
        </span>
      ),
      key: TABS.SETITNGS,
      children: <SettingsTabPane />,
    },
  ];

  return (
    <>
      <Typography.Title>Project {projectId}</Typography.Title>
      <Tabs items={tabItems} className="bg-white p-4 rounded-lg" />
    </>
  );
}
