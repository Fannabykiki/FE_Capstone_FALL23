import { randomBgColor } from "@/utils/random";
import { UserDeleteOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  List,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";

export default function ProjectMember() {
  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "40%",
      render: (name, record) => (
        <Row>
          <Col span={4} className="flex justify-center items-center">
            <Avatar style={{ backgroundColor: randomBgColor() }}>
              {name?.charAt(0).toUpperCase()}
            </Avatar>
          </Col>
          <Col span={20}>
            <Typography.Title level={5} className="!m-0 min-h-[24px]">
              {name}
            </Typography.Title>
            <Typography.Text className="min-h-[19px]">
              {record.email}
            </Typography.Text>
          </Col>
        </Row>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "20%",
      render: (status) => (
        <Row align="middle" className="gap-2">
          <Typography.Text
            className={`px-2 py-1 rounded font-medium ${
              status === "Active"
                ? "text-green-500 bg-[#43ff641a]"
                : "text-red-500 bg-[#ef44441a]"
            }`}
          >
            {status}
          </Typography.Text>
        </Row>
      ),
    },
    {
      dataIndex: "action",
      width: "20%",
      align: "center",
      render: () => (
        <Space size="middle">
          <Button icon={<UserDeleteOutlined />}>Remove</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      name: "Phan Luong Nam",
      email: "nam@gmail.com",
      type: "Member",
      status: "Active",
    },
    {
      name: "Phan Luong Nam",
      email: "nam@gmail.com",
      type: "Member",
      status: "Active",
    },
    {
      name: "Phan Luong Nam",
      email: "nam@gmail.com",
      type: "Member",
      status: "Active",
    },
    {
      name: "Phan Luong Nam",
      email: "nam@gmail.com",
      type: "Member",
      status: "Active",
    },
    {
      name: "Phan Luong Nam",
      email: "nam@gmail.com",
      type: "Member",
      status: "Active",
    },
  ];

  return (
    <Card className="min-h-screen">
      <Typography className="text-xl font-medium">Project Manager</Typography>
      <Space className="mt-3">
        <Row gutter={16}>
          <Col span={6} className="flex justify-center items-center">
            <Avatar style={{ backgroundColor: randomBgColor() }}>N</Avatar>
          </Col>
          <Col span={18}>
            <Typography.Title level={5} className="!m-0 min-h-[24px]">
              Phan Luong Nam
            </Typography.Title>
            <Typography.Text className="min-h-[19px]">
              nam@gmail.com
            </Typography.Text>
          </Col>
        </Row>
      </Space>
      <Divider />
      <Typography className="text-xl font-medium mb-5">
        Project Member
      </Typography>
      <Table dataSource={data} columns={columns} />
    </Card>
  );
}
