import { calcTaskDueDateColor, classNames } from "@/utils/common";
import { Avatar, Tooltip } from "antd";
import { DraggableStateSnapshot } from "react-beautiful-dnd";
import {
  CommentOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  DownOutlined,
  PaperClipOutlined,
  PauseOutlined,
  QuestionCircleOutlined,
  UpOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/utils/constants";
import { ITask } from "@/interfaces/task";
import { TaskType } from "./display";
import PriorityStatus from "../Task/PriorityStatus";

interface Props {
  snapshot?: DraggableStateSnapshot;
  task: ITask;
  onViewTask: (_taskId?: string | undefined) => void;
}

export default function TaskDraggableDisplay({
  snapshot,
  task,
  onViewTask,
}: Props) {
  let taskTypeBorderColor = "border-blue-400";
  switch (task.typeName) {
    case TaskType.Main:
      taskTypeBorderColor = "border-blue-400";
      break;
    case TaskType.Task:
      taskTypeBorderColor = "border-green-400";
      break;
    case TaskType.Bug:
      taskTypeBorderColor = "border-red-400";
      break;
    default:
      break;
  }
  return (
    <div
      className={classNames(
        "select-none p-4 min-h-[50px] rounded cursor-pointer shadow hover:shadow-lg",
        snapshot?.isDragging ? "bg-neutral-300" : "bg-white",
        "border-0 border-l-4 border-solid",
        taskTypeBorderColor
      )}
      onClick={() => onViewTask(task.taskId)}
    >
      <div className="flex flex-col gap-y-4">
        <div
          className={classNames(
            "w-fit px-2 py-1 rounded-full text-xs",
            calcTaskDueDateColor(task.dueDate)
          )}
        >
          <span>{dayjs(task.dueDate).format(DATE_FORMAT)}</span>
        </div>
        <p>{task.title}</p>
        <div className="flex gap-x-2 items-center">
          <div>
            <PaperClipOutlined /> 0
          </div>
          <div>
            <CommentOutlined /> 0
          </div>
          <div className="flex-grow text-right">
            <Tooltip title={`Priority: ${task.priorityName}`}>
              <PriorityStatus priorityName={task.priorityName} />
            </Tooltip>
          </div>
          <Tooltip title={task.assignTo}>
            <Avatar>{task.assignTo.slice(0, 1).toUpperCase()}</Avatar>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
