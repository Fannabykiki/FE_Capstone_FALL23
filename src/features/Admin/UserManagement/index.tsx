import { EyeOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import {
  Avatar,
  Col,
  Input,
  Row,
  Space,
  Table,
  Typography,
  Select,
  Switch,
} from "antd";

import deactiveUser from "@/assets/images/deactive-user.png";
import activeUser from "@/assets/images/active-user.png";

const UserManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    limit: "10",
    offset: "0",
  });

  const onChangePage = (page: number, pageSize: number) => {
    setSearchParams((prev) => {
      prev.set("limit", pageSize.toString());
      prev.set("offset", ((page - 1) * pageSize).toString());
      return prev;
    });
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Space direction="vertical" className="!gap-0">
        <Typography.Title level={1}>User List</Typography.Title>
      </Space>
      <Row gutter={48}>
        <Col span={12}>
          <Row className="p-4 rounded-md shadow-custom">
            <Col span={20}>
              <Typography.Title level={4}>Active Users</Typography.Title>
              <Typography.Title level={4} className="!mt-4">
                80 <small className="text-green-500">(80%)</small>
              </Typography.Title>
            </Col>
            <Col span={4} className="flex justify-center items-center">
              <img
                src={activeUser}
                className="w-10 h-10 bg-[#43ff641a] rounded"
                alt="active-user"
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="p-4 rounded-md shadow-custom">
            <Col span={20}>
              <Typography.Title level={4}>Inactive Users</Typography.Title>
              <Typography.Title level={4} className="!mt-4">
                20 <small className="text-red-500">(20%)</small>
              </Typography.Title>
            </Col>
            <Col span={4} className="flex justify-center items-center">
              <img
                src={deactiveUser}
                className="w-10 h-10 bg-[#ef44441a] rounded"
                alt="deactive-user"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Space direction="vertical" className="w-full shadow-custom mt-5 py-5">
        <Row className="px-3" gutter={16}>
          <Col span={10}>
            <Input
              className="w-full"
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={7}>
            <Select
              className="w-full"
              placeholder="Select Role"
              onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
          </Col>
          <Col span={7}>
            <Select
              className="w-full"
              placeholder="Select Status"
              onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
          </Col>
        </Row>
        <Table
          rowKey="id"
          className="mt-5"
          columns={columns}
          dataSource={data}
          pagination={{
            showSizeChanger: true,
            pageSize: parseInt(searchParams.get("limit") || "10"),
            pageSizeOptions: [10, 20, 50, 100],
            total: 6,
            onChange: onChangePage,
            className: "px-5 !mb-0",
          }}
        />
      </Space>
    </>
  );
};

const columns: ColumnsType<(typeof data)[number]> = [
  {
    title: "USER",
    dataIndex: "username",
    width: "35%",
    render: (username, record) => (
      <Row gutter={16}>
        <Col span={4} className="flex justify-center items-center">
          <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
        </Col>
        <Col span={20}>
          <Typography.Title level={5} className="!m-0">
            {record.username}
          </Typography.Title>
          <Typography.Text>{record.email || "1"}</Typography.Text>
        </Col>
      </Row>
    ),
  },
  {
    title: "ROLE",
    dataIndex: "role",
    width: "15%",
    render: (role, record) => (
      <Row align="middle">
        <img
          src={record.status === "active" ? activeUser : deactiveUser}
          className={`w-10 h-10 bg-[${
            record.status === "active" ? "#43ff641a" : "#ef44441a"
          }] rounded-full`}
          alt={record.status}
        />
        <Typography.Text className="ml-5">{role}</Typography.Text>
      </Row>
    ),
  },
  {
    title: "CONTACT",
    dataIndex: "contact",
    width: "20%",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    width: "15%",
    render: (status: string) => (
      <Row align="middle">
        <Switch defaultChecked={status === "active"} />
        <Typography.Text
          className={`px-2 py-1 ml-5 rounded font-medium ${
            status === "active"
              ? "text-green-500 bg-[#43ff641a]"
              : "text-red-500 bg-[#ef44441a]"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Typography.Text>
      </Row>
    ),
  },
  {
    title: "ACTIONS",
    width: "10%",
    render: () => (
      <Space size="large">
        <EyeOutlined className="text-xl cursor-pointer" />
        <MoreOutlined className="text-xl cursor-pointer" />
      </Space>
    ),
  },
];

const data = [
  {
    id: 1,
    username: "Mechanism 1",
    role: "Admin",
    status: "active",
    contact: "0123456789",
  },
  {
    id: 2,
    username: "Screening 4",
    role: "Member",
    status: "active",
    contact: "0123456789",
  },
  {
    id: 3,
    username: "Recruit 3",
    role: "Member",
    status: "active",
    contact: "0123456789",
  },
  {
    id: 4,
    username: "Mechanism 1",
    role: "Admin",
    status: "inactive",
    contact: "0123456789",
  },
  {
    id: 5,
    username: "Mechanism 1",
    role: "Member",
    status: "active",
    contact: "0123456789",
  },
  {
    id: 6,
    username: "Mechanism 1",
    role: "Member",
    status: "active",
    contact: "0123456789",
  },
];

export default UserManagement;
