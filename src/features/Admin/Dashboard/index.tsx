import { useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import {
  Avatar,
  Col,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import {
  CheckOutlined,
  ForwardOutlined,
  PauseCircleOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const AdminDashboard = () => {
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
    <Space direction="vertical" className="w-full">
      <Row wrap={false} gutter={24}>
        <Col span={6}>
          <Row className="w-full shadow-custom px-5 py-3 rounded">
            <Col span={20}>
              <Typography.Title level={4} className="!m-0">
                1
              </Typography.Title>
              <Typography.Title level={5} className="text-[#6b6b6b] !m-0">
                Total Projects
              </Typography.Title>
            </Col>
            <Col span={4} className="flex items-center justify-center">
              <PauseCircleOutlined className="text-lg text-[#FFC086] p-3 bg-[#FFF3E8] rounded-full" />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row className="w-full shadow-custom px-5 py-3 rounded">
            <Col span={20}>
              <Typography.Title level={4} className="!m-0">
                3
              </Typography.Title>
              <Typography.Title level={5} className="text-[#6b6b6b] !m-0">
                Doing Projects
              </Typography.Title>
            </Col>
            <Col span={4} className="flex items-center justify-center">
              <ForwardOutlined className="text-lg text-[#9990F3] p-3 bg-[#EEEDFD] rounded-full" />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row className="w-full shadow-custom px-5 py-3 rounded">
            <Col span={20}>
              <Typography.Title level={4} className="!m-0">
                0
              </Typography.Title>
              <Typography.Title level={5} className="text-[#6b6b6b] !m-0">
                Done Projects
              </Typography.Title>
            </Col>
            <Col span={4} className="flex items-center justify-center">
              <CheckOutlined className="text-lg text-[#6BD99E] p-3 bg-[#E5F8ED] rounded-full" />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row className="w-full shadow-custom px-5 py-3 rounded">
            <Col span={20}>
              <Typography.Title level={4} className="!m-0">
                1
              </Typography.Title>
              <Typography.Title level={5} className="text-[#6b6b6b] !m-0">
                Rejected Projects
              </Typography.Title>
            </Col>
            <Col span={4} className="flex items-center justify-center">
              <WarningOutlined className="text-lg text-[#ED7172] p-3 bg-[#FCEAEA] rounded-full" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Space direction="vertical" className="w-full shadow-custom mt-5 py-5">
        <Row className="px-3" gutter={16} justify="end">
          <Col span={5}>
            <Input
              className="w-full"
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={3}>
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
    </Space>
  );
};

const columns: ColumnsType<(typeof data)[number]> = [
  {
    dataIndex: "index",
    width: "5%",
    render: (_row, _record, index) => index + 1,
  },
  {
    title: "PROJECT",
    dataIndex: "project",
    width: "35%",
    sorter: (a, b) => a.project.localeCompare(b.project),
    render: (project, record) => (
      <Col span={20}>
        <Typography.Title level={5} className="!m-0 !text-[#ADA6F5]">
          {project}
        </Typography.Title>
        <Typography.Text>{record.description}</Typography.Text>
      </Col>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    width: "15%",
    align: "center",
    sorter: (a, b) => a.status.localeCompare(b.status),
    render: (status: string) => {
      let color = "";
      let bg = "";

      switch (status) {
        case "todo":
          color = "#E0F9FC";
          bg = "#4AD8EC";
          break;
        case "doing":
          color = "#968EF3";
          bg = "#EEEDFD";
          break;
        case "done":
          color = "#6ED99F";
          bg = "#E5F8ED";
          break;
        case "fail":
          color = "#EE8181";
          bg = "#FCEAEA";
          break;
        default:
          color = "";
          bg = "";
          break;
      }

      return (
        <Row align="middle" justify="center">
          <Typography.Text
            className={`px-4 py-1 ml-5 rounded-2xl font-medium !text-[${color}] bg-[${bg}]`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Typography.Text>
        </Row>
      );
    },
  },
  {
    title: "MANAGER",
    dataIndex: "manager",
    width: "25%",
    sorter: (a, b) => a.manager.localeCompare(b.manager),
    render: (manager) => (
      <Row gutter={16} align="middle">
        <Col span={4} className="flex justify-center items-center">
          <Avatar>{manager.charAt(0).toUpperCase()}</Avatar>
        </Col>
        <Col span={20}>
          <Typography.Title level={5} className="!m-0">
            {manager}
          </Typography.Title>
        </Col>
      </Row>
    ),
  },
  {
    title: "MEMBERS",
    dataIndex: "members",
    width: "20%",
    render: () => (
      <Avatar.Group
        maxCount={4}
        maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
      >
        <Avatar style={{ backgroundColor: "#f56a00" }}>A</Avatar>
        <Avatar style={{ backgroundColor: "#f56a00" }}>B</Avatar>
        <Avatar style={{ backgroundColor: "#f56a00" }}>C</Avatar>
        <Avatar style={{ backgroundColor: "#f56a00" }}>D</Avatar>
      </Avatar.Group>
    ),
  },
];

const data = [
  {
    id: 1,
    project: "Mechanism 1",
    description: "description",
    status: "todo",
    manager: "0123456789",
  },
  {
    id: 2,
    project: "Screening 4",
    description: "description",
    status: "doing",
    manager: "0123456789",
  },
  {
    id: 3,
    project: "Recruit 3",
    description: "description",
    status: "done",
    manager: "0123456789",
  },
  {
    id: 4,
    project: "Mechanism 1",
    description: "description",
    status: "doing",
    manager: "0123456789",
  },
  {
    id: 5,
    project: "Mechanism 1",
    description: "description",
    status: "fail",
    manager: "0123456789",
  },
  {
    id: 6,
    project: "Mechanism 1",
    description: "description",
    status: "todo",
    manager: "0123456789",
  },
];

export default AdminDashboard;
