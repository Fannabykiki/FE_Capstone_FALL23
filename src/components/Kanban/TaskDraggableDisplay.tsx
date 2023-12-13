import { calcTaskDueDateColor, classNames } from "@/utils/common";
import { Badge, Button, Divider, Modal, Tag, Tooltip } from "antd";
import { DraggableStateSnapshot } from "react-beautiful-dnd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CheckSquareOutlined,
  CommentOutlined,
  DeleteOutlined,
  MinusSquareOutlined,
  PaperClipOutlined,
  WarningFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { DATE_FORMAT, STATUS_COLOR } from "@/utils/constants";
import { ITask } from "@/interfaces/task";
import { TaskType } from ".";
import PriorityStatus from "../Task/PriorityStatus";
import AvatarWithColor from "../AvatarWithColor";
import useTaskActions from "@/hooks/useTaskActions";
import { IProject } from "@/interfaces/project";
import { useQueryClient } from "@tanstack/react-query";
import { projectApi } from "@/utils/api/project";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAuthContext } from "@/context/Auth";
import { toast } from "react-toastify";

interface Props {
  snapshot?: DraggableStateSnapshot;
  task: ITask;
  onViewTask: (_taskId?: string | undefined) => void;
  refetchTasks: VoidFunction;
}

export default function TaskDraggableDisplay({
  snapshot,
  task,
  onViewTask,
  refetchTasks,
}: Props) {
  let taskTypeBorderColor = "border-blue-400";
  switch (task.typeName) {
    case TaskType.Task:
      taskTypeBorderColor = "border-green-400";
      break;
    case TaskType.Bug:
      taskTypeBorderColor = "border-red-400";
      break;
    default:
      break;
  }

  const [subTaskExpand, setSubTaskExpand] = useState(false);

  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const project: IProject | undefined = queryClient.getQueryData([
    projectApi.getInfoKey,
    projectId,
  ]);

  const { userInfo } = useAuthContext();

  const member = useMemo(() => {
    return project?.projectMembers.find((mem) => mem.userId === userInfo!.id);
  }, [userInfo, project]);

  const { deleteTaskMutation } = useTaskActions();

  const onDeleteTask = (e: React.MouseEvent) => {
    if (task) {
      e.stopPropagation();
      Modal.confirm({
        title: "Delete task",
        content: "Are you sure to delete this task?",
        onOk: () => {
          deleteTaskMutation.mutate(
            { taskId: task.taskId, memberId: member?.memberId || "" },
            {
              onSuccess: async () => {
                toast.success("Delete task succeed!");
                refetchTasks();
              },
              onError: (err) => {
                console.error(err);
                toast.error("Delete task failed! Please try again later");
              },
            }
          );
        },
      });
    }
  };

  const onExpandSubtask = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSubTaskExpand((c) => !c);
  };

  const hexColor = STATUS_COLOR[task.statusName as keyof typeof STATUS_COLOR];
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
        <div className="flex gap-x-2 items-center">
          <div
            className={classNames(
              "w-fit px-2 py-1 rounded-full text-xs",
              calcTaskDueDateColor(task.dueDate)
            )}
          >
            <span>{dayjs(task.dueDate).format(DATE_FORMAT)}</span>
          </div>
          <div className="flex-grow text-right">
            <Tag
              className="border-0"
              style={{
                backgroundColor: hexColor ? `${hexColor}20` : "gray",
                color: hexColor || "white",
              }}
            >
              {task.statusName}
            </Tag>
          </div>
          <Button
            icon={<DeleteOutlined />}
            type="link"
            danger
            onClick={onDeleteTask}
          />
        </div>
        <p>{task.title}</p>
        <div className="flex gap-x-2 items-center">
          <div>
            <PaperClipOutlined /> {task.totalAttachment || 0}
          </div>
          <div>
            <CommentOutlined /> {task.totalComment || 0}
          </div>
          <div className="flex-grow text-right">
            <Tooltip title={`Priority: ${task.priorityName}`}>
              <PriorityStatus priorityName={task.priorityName} />
            </Tooltip>
          </div>
          <Tooltip
            title={`${task.assignTo}${
              task.memberStatus !== "In Team" ? " - Member unavailable" : ""
            }`}
          >
            <Badge
              count={
                task.memberStatus !== "In Team" ? (
                  <WarningFilled className="text-red-500" />
                ) : null
              }
            >
              <AvatarWithColor
                className={classNames(
                  task.memberStatus !== "In Team" &&
                    "border-red-500 border-solid border-2"
                )}
                stringContent={task.assignTo}
              >
                {task.assignTo.slice(0, 1).toUpperCase()}
              </AvatarWithColor>
            </Badge>
          </Tooltip>
        </div>
        {task.subTask && task.subTask.length > 0 && (
          <>
            <div
              className="flex items-center gap-x-2 hover:bg-neutral-100 w-fit"
              onClick={onExpandSubtask}
            >
              <CheckSquareOutlined className="text-green-600" />
              <span>
                {
                  task.subTask.filter(
                    (subtask) => subtask.statusName === "Done"
                  ).length
                }
                /{task.subTask.length}
              </span>
              {subTaskExpand ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </div>
            {subTaskExpand && (
              <div className="flex flex-col gap-y-2 border-0 border-t border-solid border-neutral-300 pt-2">
                {task.subTask.map((subtask) => (
                  <div
                    key={subtask.taskId}
                    className="flex gap-x-2 hover:font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewTask(subtask.taskId);
                    }}
                  >
                    {subtask.statusName === "Done" ? (
                      <CheckSquareOutlined classID="text-green-600" />
                    ) : (
                      <MinusSquareOutlined className="text-yellow-500" />
                    )}
                    {subtask.title}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
