import { calcTaskDueDateColor, classNames } from "@/utils/common";
import { Avatar } from "antd";
import { DraggableStateSnapshot } from "react-beautiful-dnd";
import { faker } from "@faker-js/faker";
import { CommentOutlined, PaperClipOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/utils/constants";
import { ITask } from "@/interfaces/task";
import { TaskType } from "./display";

interface Props {
  snapshot?: DraggableStateSnapshot;
  task: ITask;
}

export default function TaskDraggableDisplay({ snapshot, task }: Props) {
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
        "select-none p-4 min-h-[50px] rounded shadow",
        snapshot?.isDragging ? "bg-neutral-300" : "bg-white",
        "border-0 border-l-4 border-solid",
        taskTypeBorderColor
      )}
    >
      <div className="flex flex-col gap-y-4">
        <div
          className={classNames(
            "w-fit px-2 py-1 rounded-full text-xs",
            calcTaskDueDateColor(task.endDate)
          )}
        >
          <span>{dayjs(task.endDate).format(DATE_FORMAT)}</span>
        </div>
        <p>{task.title}</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2">
            <div>
              <PaperClipOutlined /> 0
            </div>
            <div>
              <CommentOutlined /> 0
            </div>
          </div>
          <Avatar src={faker.image.avatarGitHub()} />
        </div>
      </div>
    </div>
  );
}
