import BoardTabPane from "@/components/Project/Detail/BoardTabPane";
import ReportTabPane from "@/components/Project/Detail/ReportTabPane";
import SettingsTabPane from "@/components/Project/Detail/SettingsTabPane";
import { paths } from "@/routers/paths";
import {
  AlignCenterOutlined,
  AreaChartOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Tabs, Typography } from "antd";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TABS = {
  BOARD: "board",
  REPORT: "report",
  SETITNGS: "settings",
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (!projectId) {
      navigate(paths.userPages.dashboard);
    }
  }, [projectId, navigate]);

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
