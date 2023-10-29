import {
  CloudDownloadOutlined,
  DeleteOutlined,
  FunnelPlotOutlined,
  PlusOutlined,
  SearchOutlined,
  SwapOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Row, Space, Table, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import { classNames } from "@/utils/common";

export default function Process() {
  const [searchParams, setSearchParams] = useSearchParams({
    limit: "10",
    offset: "0",
  });

  const STATUS = {
    PROCESSING: 1,
    DECLINED: 0,
    SUCCESS: 2,
  };

  const data = [
    {
      id: 1,
      name: "Mechanism 1",
      department: "Human resources",
      status: STATUS.PROCESSING,
      executedBy: {
        name: "Olivia Rhye",
        email: "olivia@smatyx.com",
      },
    },
    {
      id: 2,
      name: "Screening 4",
      department: "IT",
      status: STATUS.SUCCESS,
      executedBy: {
        name: "Phoenix Baker",
        email: "phoenix@smatyx.com",
      },
    },
    {
      id: 3,
      name: "Recruit 3",
      department: "Finance",
      status: STATUS.SUCCESS,
      executedBy: {
        name: "Lana Steiner",
        email: "lana@smatyx.com",
      },
    },
    {
      id: 4,
      name: "Mechanism 1",
      department: "Human resources",
      status: STATUS.DECLINED,
      executedBy: {
        name: "Demi Wilkinson",
        email: "demi@smatyx.com",
      },
    },
    {
      id: 5,
      name: "Mechanism 1",
      department: "Finance",
      status: STATUS.SUCCESS,
      executedBy: {
        name: "Candice Wu",
        email: "candice@smatyx.com",
      },
    },
    {
      id: 6,
      name: "Mechanism 1",
      department: "IT",
      status: STATUS.SUCCESS,
      executedBy: {
        name: "Natali Craig",
        email: "natali@smatyx.com",
      },
    },
  ];

  const onChangePage = (page: number, pageSize: number) => {
    setSearchParams((prev) => {
      prev.set("limit", pageSize.toString());
      prev.set("offset", ((page - 1) * pageSize).toString());
      return prev;
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: number) => {
        switch (status) {
          case STATUS.PROCESSING:
            return (
              <div
                className={classNames(
                  "flex items-center gap-x-1 px-2 py-0.5 rounded-full w-fit"
                )}
              >
                <div className="inline-block w-2 h-2 rounded-full" />
                <span>Processing</span>
              </div>
            );
          case STATUS.SUCCESS:
            return (
              <div
                className={classNames(
                  "flex items-center gap-x-1 px-2 py-0.5 rounded-full w-fit"
                )}
              >
                <div className="inline-block w-2 h-2 rounded-full" />
                <span>Success</span>
              </div>
            );
          case STATUS.DECLINED:
            return (
              <div
                className={classNames(
                  "flex items-center gap-x-1 px-2 py-0.5 rounded-full w-fit"
                )}
              >
                <div className="inline-block w-2 h-2 rounded-full" />
                <span>Declined</span>
              </div>
            );
          default:
            return <></>;
        }
      },
    },
    {
      title: "Executed by",
      dataIndex: "executedBy",
      render: (executedBy: { name: string; email: string }) => (
        <Space size="middle" align="center">
          <Avatar icon={<UserOutlined />} />
          <Space direction="vertical" className="!gap-y-0">
            <Typography.Text className="font-inter">
              {executedBy.name}
            </Typography.Text>
            <Typography.Text className="font-inter">
              {executedBy.email}
            </Typography.Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "",
      width: 1,
      render: () => (
        <Space size="large">
          <CloudDownloadOutlined className="text-xl cursor-pointer" />
          <DeleteOutlined className="text-xl cursor-pointer" />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space direction="vertical" className="!gap-0">
        <Typography.Title level={1} className="font-plus-jakarta-sans">
          Recruitment mechanism
        </Typography.Title>
        <Typography.Text className="font-inter text-base">
          Creating recruitment mechanism for every job vacancy
        </Typography.Text>
      </Space>
      <Row justify="space-between" align="middle" className="mt-10">
        <Typography.Title level={3} className="font-plus-jakarta-sans">
          Mechanism Listing
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />}>
          Create
        </Button>
      </Row>
      <Row justify="space-between" align="middle" className="my-4">
        <Space>
          <Input
            className="w-[400px]"
            placeholder="Search for mechanism"
            prefix={<SearchOutlined />}
          />
        </Space>
        <Space size="middle">
          <Button size="middle" icon={<SwapOutlined rotate={90} />}>
            Sort
          </Button>
          <Button icon={<FunnelPlotOutlined />}>Filters</Button>
        </Space>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          pageSize: parseInt(searchParams.get("limit") || "10"),
          pageSizeOptions: [10, 20, 50, 100],
          total: 6,
          onChange: onChangePage,
        }}
      />
    </>
  );
}
