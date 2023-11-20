import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  DownOutlined,
  PauseOutlined,
  QuestionCircleOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

interface Props {
  priorityName: string;
}

export default function PriorityStatus({ priorityName }: Props) {
  return (
    <Tooltip title={`Priority: ${priorityName}`}>
      {getPriorityIcon(priorityName)}
    </Tooltip>
  );
}

const getPriorityIcon = (priorityName: string) => {
  switch (priorityName) {
    case "Very High":
      return (
        <DoubleLeftOutlined className="font-bold text-lg rotate-90 text-red-500" />
      );
    case "High":
      return <UpOutlined className="font-bold text-lg text-red-500" />;
    case "Medium":
      return (
        <PauseOutlined className="font-bold text-lg rotate-90 text-yellow-500" />
      );
    case "Low":
      return <DownOutlined className="font-bold text-lg text-blue-500" />;
    case "Very Low":
      return (
        <DoubleRightOutlined className="font-bold text-lg rotate-90 text-blue-500" />
      );
    default:
      return <QuestionCircleOutlined />;
  }
};
