import { Row, Space, Typography, Table, Button, Card } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

import useDetailView from "@/hooks/useDetailView";
import { ITaskStatus } from "@/interfaces/task";
import { CreateStatus } from "@/components";
import { taskApi } from "@/utils/api/task";

export default function StatusManagement() {
  const { projectId } = useParams();

  const queryClient = useQueryClient();

  const statusList =
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
      {isModalCreateOpen && (
        <CreateStatus
          open={isModalCreateOpen}
          onClose={handleCloseModalCreate}
        />
      )}
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
          dataSource={statusList}
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
    render: (state, record) => {
      const color = record.hexColor;

      return (
        <Row align="middle" className="gap-2">
          <Typography.Text
            className="px-2 py-1 rounded font-medium"
            style={{
              color,
              backgroundColor: `${color}20`,
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
