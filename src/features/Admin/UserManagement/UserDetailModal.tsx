import { ColumnsType } from "antd/es/table";
import {
  Avatar,
  Col,
  Divider,
  Modal,
  Row,
  Space,
  Table,
  Typography,
} from "antd";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export interface RoleInputType {
  name: string;
  description?: string;
}

const UserDetailModal = ({ isOpen, handleClose }: Props) => {
  const onCancel = () => {
    handleClose();
  };

  return (
    <Modal
      title="User detail"
      open={isOpen}
      onCancel={onCancel}
      width="70vw"
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Space
            direction="vertical"
            className="w-full p-4 rounded-md shadow-custom"
          >
            <Space
              direction="vertical"
              className="flex justify-center items-center w-full"
            >
              <Avatar
                shape="square"
                className="w-[80px] h-[80px] flex justify-center items-center text-3xl"
              >
                {"abcd".charAt(0).toUpperCase()}
              </Avatar>
              <Typography.Text className="font-medium">abcd</Typography.Text>
            </Space>
            <Typography.Title level={5} className="!m-0 text-bold">
              Details
            </Typography.Title>
            <Divider className="!m-0" />
            <Space direction="vertical" className="flex justify-center w-full">
              <Typography.Text>
                <b>Email:</b> testst
              </Typography.Text>
              <Typography.Text>
                <b>Status:</b> testst
              </Typography.Text>
              <Typography.Text>
                <b>Role:</b> User
              </Typography.Text>
              <Typography.Text>
                <b>DoB:</b> User
              </Typography.Text>
              <Typography.Text>
                <b>Address:</b> 640 Jennie Corner Connellychester
              </Typography.Text>
            </Space>
          </Space>
        </Col>
        <Col span={16}>
          <Space
            direction="vertical"
            className="w-full p-4 rounded-md shadow-custom"
          >
            <Typography.Title level={3} className="!m-0">
              User's Project's List
            </Typography.Title>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={[]}
              pagination={{
                showSizeChanger: true,
                // current: parseInt(searchParams.get("page") || "0") + 1,
                // pageSize: parseInt(searchParams.get("limit") || "10"),
                pageSizeOptions: [10, 20, 50, 100],
                total: 100,
                // onChange: onChangePage,
                className: "px-5 !mb-0",
              }}
            />
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

const columns: ColumnsType<any> = [
  {
    dataIndex: "index",
    width: "5%",
    render: (_name, _record, index) => index + 1,
  },
  {
    title: "PROJECT",
    dataIndex: "name",
    width: "35%",
    render: (name, record) => (
      <Row gutter={16}>
        <Col span={4} className="flex justify-center items-center">
          <Avatar>{name?.charAt(0).toUpperCase()}</Avatar>
        </Col>
        <Col span={20}>
          <Typography.Title level={5} className="!m-0">
            {name}
          </Typography.Title>
          <Typography.Text>{record.email}</Typography.Text>
        </Col>
      </Row>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "isAdmin",
    width: "15%",
    render: (isAdmin, record) => (
      <Row align="middle">
        <Typography.Text className="ml-5">
          {isAdmin ? "Admin" : "Member"}
        </Typography.Text>
      </Row>
    ),
  },
  {
    title: "MANAGER",
    dataIndex: "phoneNumber",
    width: "25%",
  },
  {
    title: "START DATE",
    dataIndex: "statusName",
    width: "20%",
    render: (statusName) => (
      <Row align="middle" justify="space-between">
        <Typography.Text
          className={`px-2 py-1 rounded font-medium ${
            statusName === "Active"
              ? "text-green-500 bg-[#43ff641a]"
              : "text-red-500 bg-[#ef44441a]"
          }`}
        >
          {statusName}
        </Typography.Text>
      </Row>
    ),
  },
];

export default UserDetailModal;
