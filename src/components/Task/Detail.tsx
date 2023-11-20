import { ITaskStatus } from "@/interfaces/task";
import { taskApi } from "@/utils/api/task";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Col, Descriptions, Modal, Row, Select, Typography } from "antd";
import { useParams } from "react-router-dom";

interface Props {
  taskId: string;
  isOpen: boolean;
  onClose: VoidFunction;
}

export default function TaskDetail({ taskId, isOpen, onClose }: Props) {
  const { data: task } = useQuery({
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

  if (task) {
    return (
      <>
        <Modal
          okButtonProps={{ className: "hidden" }}
          cancelButtonProps={{ className: "hidden" }}
          open={isOpen}
          title={task.title}
          width="90%"
          onCancel={onClose}
        >
          <Row gutter={16}>
            <Col span={16}>
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
            </Col>
            <Col span={8}>
              <Select
                options={statusList.map((status) => ({
                  label: status.title,
                  value: status.boardStatusId,
                }))}
                value={task.statusId}
                className="min-w-[200px] mb-4"
              />
              <div className="p-2 border border-solid border-neutral-300 rounded-lg">
                <Descriptions>
                  
                </Descriptions>
              </div>
            </Col>
          </Row>
        </Modal>
      </>
    );
  }

  return <></>;
}
