import { ITask, ITaskStatus } from "@/interfaces/task";
import { taskApi } from "@/utils/api/task";
import { classNames } from "@/utils/common";
import { DATE_FORMAT } from "@/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Divider,
  Image,
  Modal,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import PriorityStatus from "./PriorityStatus";
import { faker } from "@faker-js/faker";
import useTaskActions from "@/hooks/useTaskActions";
import { toast } from "react-toastify";
import { EditOutlined } from "@ant-design/icons";
import useDetailView from "@/hooks/useDetailView";
import UpdateTask from "../Modal/UpdateTask";
import AddComment from "./AddComment";
import DisplayComment from "./DisplayComment";

interface Props {
  taskId: string;
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function TaskDetail({ taskId, isOpen, onClose }: Props) {
  const { data: task, refetch: refetchTaskDetail } = useQuery({
    queryKey: [taskApi.getDetailKey, taskId],
    queryFn: ({ signal }) => taskApi.getDetail(signal, taskId),
    enabled: Boolean(taskId),
  });
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const statusList =
    queryClient.getQueryData<ITaskStatus[]>([
      taskApi.getTaskStatusKey,
      projectId,
    ]) || [];

  const { changeTaskStatusMutation } = useTaskActions();

  const onChangeTaskStatus = (statusId: string) => {
    changeTaskStatusMutation.mutate(
      {
        id: task!.taskId,
        statusId,
      },
      {
        onSuccess: () => refetchTaskDetail(),
        onError: (err: any) => {
          console.error(err);
          toast.error("Update task status failed! Please try again later");
        },
      }
    );
  };

  const {
    onOpenView: handleOpenModalUpdate,
    onCloseView: handleCloseModalUpdate,
    openView: isModalUpdateOpen,
    detail: initTaskData,
  } = useDetailView<ITask>();

  const onUpdateTaskSuccess = async () => {
    await queryClient.invalidateQueries({
      queryKey: [taskApi.getDetailKey, taskId],
    });
    await queryClient.refetchQueries([taskApi.getDetailKey, taskId]);
  };

  if (task) {
    return (
      <>
        <Modal
          okButtonProps={{ className: "hidden" }}
          cancelButtonProps={{ className: "hidden" }}
          open={isOpen}
          width="90%"
          onCancel={onClose}
        >
          <div className="flex items-center justify-between mt-8">
            <Typography.Title level={4}>{task.title}</Typography.Title>
            <div className="flex gap-x-2">
              <Select
                options={statusList.map((status) => ({
                  label: status.title,
                  value: status.boardStatusId,
                }))}
                value={task.statusId}
                className="min-w-[200px] mb-4"
                onChange={onChangeTaskStatus}
              />
              <Tooltip title="Edit task">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleOpenModalUpdate(task)}
                />
              </Tooltip>
            </div>
          </div>
          <Row gutter={32}>
            <Col
              span={16}
              className="overflow-y-auto max-h-[300px] md:max-h-[500px] lg:max-h-[700px]"
            >
              <Typography.Title level={5}>Description</Typography.Title>
              <Typography.Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography.Paragraph>
              <Divider />
              <div>
                <Typography.Title level={5}>Attachments</Typography.Title>
                <div className="flex gap-x-4 overflow-x-auto pb-4">
                  <div className="basis-[200px] flex-shrink-0">
                    <Image
                      src={faker.image.urlLoremFlickr()}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="basis-[200px] flex-shrink-0">
                    <Image
                      src={faker.image.urlLoremFlickr()}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="basis-[200px] flex-shrink-0">
                    <Image
                      src={faker.image.urlLoremFlickr()}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="basis-[200px] flex-shrink-0">
                    <Image
                      src={faker.image.urlLoremFlickr()}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="basis-[200px] flex-shrink-0">
                    <Image
                      src={faker.image.urlLoremFlickr()}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="basis-[200px] flex-shrink-0">
                    <Image
                      src={faker.image.urlLoremFlickr()}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="basis-[200px] flex-shrink-0">
                    <Image
                      src={faker.image.urlLoremFlickr()}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="basis-[200px] flex-shrink-0">
                    <Image
                      src={faker.image.urlLoremFlickr()}
                      width={200}
                      height={200}
                    />
                  </div>
                </div>
              </div>
              <Divider />
              <div>
                <Typography.Title level={5}>Comments</Typography.Title>
                <AddComment taskId={task.taskId} />
                <div className="mt-8 flex flex-col gap-2">
                  {task.commentResponse
                    ?.sort((a, b) => (a.createAt < b.createAt ? 1 : -1))
                    .map((comment) => (
                      <DisplayComment
                        task={task}
                        comment={comment}
                        key={comment.commentId}
                      />
                    ))}
                </div>
              </div>
            </Col>
            <Col span={8}>
              <Descriptions column={1} bordered>
                <Descriptions.Item label="Assignee">
                  <div className="flex gap-x-2 items-center">
                    <Avatar>{task.assignTo[0].toUpperCase()}</Avatar>
                    {task.assignTo}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Start date">
                  {dayjs(task.startDate).format(DATE_FORMAT)}
                </Descriptions.Item>
                <Descriptions.Item label="Due date">
                  {dayjs(task.dueDate).format(DATE_FORMAT)}
                </Descriptions.Item>
                <Descriptions.Item label="Priority">
                  <div className="flex gap-x-2 items-center">
                    <PriorityStatus priorityName={task.priorityName} />
                    <span>{task.priorityName}</span>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Iteration">
                  {task.interationName}
                </Descriptions.Item>
                <Descriptions.Item label="Task type">
                  <div
                    className={classNames(
                      "text-white px-2 rounded w-fit",
                      task.typeName === "Bug" ? "bg-red-400" : "bg-emerald-500"
                    )}
                  >
                    {task.typeName}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Created by">
                  <div className="flex gap-x-2 items-center">
                    <Avatar>{task.createBy[0].toUpperCase()}</Avatar>
                    {task.createBy}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Created at">
                  {dayjs(task.createTime).format(DATE_FORMAT)}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Modal>
        {isModalUpdateOpen && (
          <UpdateTask
            isOpen={isModalUpdateOpen}
            handleClose={handleCloseModalUpdate}
            initTaskData={initTaskData || undefined}
            onSuccess={onUpdateTaskSuccess}
          />
        )}
      </>
    );
  }

  return <></>;
}
