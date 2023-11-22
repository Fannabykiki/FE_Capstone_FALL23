import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import { Row, Space, Typography, Table, Button, Card } from "antd";

import { ITaskStatus } from "@/interfaces/task";
import useDetailView from "@/hooks/useDetailView";
import { projectApi } from "@/utils/api/project";
import { STATUS_COLOR } from "@/utils/constants";
import { taskApi } from "@/utils/api/task";
import { CreateTask } from "@/components";

export default function StatusManagement() {
  const { projectId } = useParams();

  const queryClient = useQueryClient();

  const data =
    queryClient.getQueryData<ITaskStatus[]>([
      taskApi.getTaskStatusKey,
      projectId,
    ]) || [];

  const {
    onOpenView: handleOpenModalCreate,
    onCloseView: handleCloseModalCreate,
    openView: isModalCreateOpen,
  } = useDetailView();

  return (
    <Card className="min-h-screen">
      <CreateTask
        isOpen={isModalCreateOpen}
        handleClose={handleCloseModalCreate}
        onSuccess={() =>
          queryClient.refetchQueries([projectApi.getWorkItemListByProjectIdKey])
        }
      />

      <div className="flex justify-between items-center">
        <Typography.Title level={3}>Status Management</Typography.Title>
        <Space>
          <Button
            type="primary"
            title="New Status"
            onClick={() => handleOpenModalCreate()}
            icon={<PlusOutlined />}
          >
            New Status
          </Button>
        </Space>
      </div>

      <Space direction="vertical" className="w-full shadow-custom pb-5">
        <Table
          rowKey="boardStatusId"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Space>
    </Card>
  );
}

const columns: ColumnsType<ITaskStatus> = [
  {
    dataIndex: "index",
    title: "#",
    width: "5%",
    align: "center",
    render: (_row, _record, index) => index + 1,
  },
  {
    title: "Title",
    dataIndex: "title",
    width: "10%",
    render: (state) => {
      const { backgroundColor, color } =
        STATUS_COLOR[state as keyof typeof STATUS_COLOR];

      return (
        <Row align="middle" className="gap-2">
          <Typography.Text
            className="px-2 py-1 rounded font-medium"
            style={{
              color,
              backgroundColor,
            }}
          >
            {state}
          </Typography.Text>
        </Row>
      );
    },
  },
  {
    title: "Order",
    dataIndex: "order",
    width: "10%",
  },
];
