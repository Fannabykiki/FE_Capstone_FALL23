import { useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import debounce from "lodash/debounce";
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

import useAdminProjectManagement from "@/hooks/useAdminProjectManagement";
// import { convertToODataParams } from "@/utils/convertToODataParams";
import { IAdminProject } from "@/interfaces/project";
import { randomBgColor } from "@/utils/random";

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "0",
    limit: "10",
  });

  const { project, analyzation, isLoading } = useAdminProjectManagement({
    // $skip: (
    //   +(searchParams.get("page") || "0") * +(searchParams.get("limit") || "10")
    // ).toString(),
    // $top: searchParams.get("limit") || "10",
    // $filter: convertToODataParams(
    //   {
    //     projectStatus: searchParams.get("status"),
    //   },
    //   {
    //     projectName: searchParams.get("search"),
    //   }
    // ),
  });

  const onChangePage = (page: number, pageSize: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      prev.set("limit", pageSize.toString());
      return prev;
    });
  };

  const handleChange = (value: string) => {
    setSearchParams((prev) => {
      if (!value) {
        prev.delete("status");
      } else {
        prev.set("status", value);
      }
      return prev;
    });
  };

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      if (!e.target.value) {
        prev.delete("search");
      } else {
        prev.set("search", e.target.value);
      }
      return prev;
    });
  }, 1000);

  return (
    <Space direction="vertical" className="w-full">
      <Row wrap={false} gutter={24}>
        <Col span={6}>
          <Row className="w-full shadow-custom px-5 py-3 rounded">
            <Col span={20}>
              <Typography.Title level={4} className="!m-0">
                {analyzation?.totalProject}
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
                {analyzation?.projectActive}
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
                {analyzation?.projectInActive}
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
                {analyzation?.projectDelete}
              </Typography.Title>
              <Typography.Title level={5} className="text-[#6b6b6b] !m-0">
                Deleted Projects
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
              defaultValue={searchParams.get("search") || ""}
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              allowClear
            />
          </Col>
          <Col span={3}>
            <Select
              className="w-full"
              placeholder="Select Status"
              defaultValue={searchParams.get("status")}
              onChange={handleChange}
              allowClear
              options={[
                { value: "Active", label: "Doing" },
                { value: "InActive", label: "Done" },
                { value: "Deleted", label: "Deleted" },
              ]}
            />
          </Col>
        </Row>
        <Table
          rowKey="projectId"
          className="mt-5"
          columns={columns}
          loading={isLoading}
          dataSource={project?.data}
          pagination={{
            showSizeChanger: true,
            current: parseInt(searchParams.get("page") || "0") + 1,
            pageSize: parseInt(searchParams.get("limit") || "10"),
            pageSizeOptions: [10, 20, 50, 100],
            total: 100,
            onChange: onChangePage,
            className: "px-5 !mb-0",
          }}
        />
      </Space>
    </Space>
  );
};

const columns: ColumnsType<IAdminProject["data"][number]> = [
  {
    dataIndex: "index",
    width: "5%",
    render: (_row, _record, index) => index + 1,
  },
  {
    title: "PROJECT",
    dataIndex: "projectName",
    width: "35%",
    sorter: (a, b) => a.projectName.localeCompare(b.projectName),
    render: (projectName, record) => (
      <Col span={20}>
        <Typography.Title
          level={5}
          className="!m-0 !text-[#ADA6F5] min-h-[24px]"
        >
          {projectName}
        </Typography.Title>
        <Typography.Text className="min-h-[19px]">
          {record.description}
        </Typography.Text>
      </Col>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "projectStatus",
    width: "15%",
    align: "center",
    sorter: (a, b) => a.projectStatus.localeCompare(b.projectStatus),
    render: (status: string) => {
      let color = "";
      let bg = "";

      switch (status) {
        case "Active":
          color = "#6ED99F";
          bg = "#E5F8ED";
          break;
        case "Close":
          color = "#4AD8EC";
          bg = "#E0F9FC";
          break;
        case "Inactive":
          color = "#968EF3";
          bg = "#EEEDFD";
          break;
        case "Deleted":
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
            style={{
              color,
              backgroundColor: bg,
            }}
            className="px-4 py-1 ml-5 rounded-2xl font-medium"
          >
            {status}
          </Typography.Text>
        </Row>
      );
    },
  },
  {
    title: "MANAGER",
    dataIndex: "manager",
    width: "25%",
    sorter: (a, b) => a.manager?.name.localeCompare(b.manager?.name),
    render: (_, record) =>
      record.manager?.name ? (
        <Row align="middle">
          <Col span={5} className="flex items-center">
            <Avatar style={{ backgroundColor: randomBgColor() }}>
              {record.manager?.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Col>
          <Col span={19}>
            <Typography.Title level={5} className="!m-0">
              {record.manager?.name}
            </Typography.Title>
          </Col>
        </Row>
      ) : null,
  },
  {
    title: "MEMBERS",
    dataIndex: "members",
    width: "20%",
    render: (_, record) => (
      <Avatar.Group
        maxCount={4}
        maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
      >
        {record.member?.map((member, index) => (
          <Avatar key={index} style={{ backgroundColor: randomBgColor() }}>
            {member.name?.charAt(0).toUpperCase()}
          </Avatar>
        ))}
      </Avatar.Group>
    ),
  },
];

export default AdminDashboard;
