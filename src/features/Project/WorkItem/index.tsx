import { pagination } from "@/utils/pagination";
import { randomBgColor } from "@/utils/random";
import {
  BugFilled,
  CheckSquareFilled,
  CheckSquareOutlined,
  EyeTwoTone,
  FilterFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Row,
  Space,
  Typography,
  Table,
  Button,
  Col,
  Avatar,
  Card,
  Input,
  Select,
} from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import CreateWorkitem from "@/features/Project/WorkItem/Modal/CreateWorkitem";
import { useState } from "react";

const TYPE_OPTION = [
  {
    label: (
      <>
        <CheckSquareFilled className="text-yellow-600 mr-2" /> Task
      </>
    ),
    value: "task",
  },
  {
    label: (
      <>
        <BugFilled className="text-red-500 mr-2" /> Bug
      </>
    ),
    value: "bug",
  },
];

const STATE_OPTION = [
  {
    label: "To do",
    value: "todo",
  },
  {
    label: "Doing",
    value: "doing",
  },
  {
    label: "Done",
    value: "done",
  },
  {
    label: "Close",
    value: "close",
  },
];

const ITERATION_OPTION = [
  {
    label: "Iteration 1",
    value: "1",
  },
  {
    label: "Iteration 2",
    value: "2",
  },
  {
    label: "Iteration 3",
    value: "3",
  },
  {
    label: "Iteration 4",
    value: "4",
  },
];

export default function WorkItem() {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleOpenModalCreate = () => {
    setIsModalCreateOpen(true);
  };

  const handleCloseModalCreate = () => {
    setIsModalCreateOpen(false);
  };

  const handleToggleCardVisibility = () => {
    setIsCardVisible((prev) => !prev);
  };

  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "10",
  });

  const onChangePage = (page: number, pageSize: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      prev.set("limit", pageSize.toString());
      return prev;
    });
  };

  const columns: ColumnsType<any> = [
    {
      dataIndex: "index",
      width: "5%",
      render: (_row, _record, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "40%",
      render: (title, record) => {
        let Component = null;

        switch (record.itemType) {
          case "Bug":
            Component = <BugFilled className="text-red-500" />;
            break;
          case "Task":
            Component = <CheckSquareFilled className="text-yellow-600" />;
            break;
          default:
            break;
        }

        return (
          <Row align="middle">
            {Component}
            <Typography.Text className="ml-2 font-medium text-[#3394D6]">
              {title}
            </Typography.Text>
          </Row>
        );
      },
    },
    {
      title: "Assign To",
      dataIndex: "asignTo",
      width: "15%",
      render: (_, record) =>
        record.manager?.userName ? (
          <Row align="middle">
            <Col span={5} className="flex items-center">
              <Avatar style={{ backgroundColor: randomBgColor() }}>
                {record.manager?.userName?.charAt(0).toUpperCase()}
              </Avatar>
            </Col>
            <Col span={19}>
              <Typography.Title level={5} className="!m-0">
                {record.manager?.userName}
              </Typography.Title>
            </Col>
          </Row>
        ) : null,
    },
    {
      title: "State",
      dataIndex: "state",
      width: "10%",
      render: (state) => (
        <Row align="middle" className="gap-2">
          <Typography.Text
            className={`px-2 py-1 rounded font-medium ${
              state === "To do"
                ? "text-gray-600 bg-gray-300"
                : state === "Doing"
                ? "text-blue-700 bg-blue-100"
                : state === "Done"
                ? "text-green-500 bg-[#43ff641a]"
                : state === "Close"
                ? "text-red-500 bg-[#ef44441a]"
                : ""
            }`}
          >
            {state}
          </Typography.Text>
        </Row>
      ),
    },
    {
      title: "Area Path",
      dataIndex: "areaPath",
      width: "10%",
    },
    {
      title: "Iteration",
      dataIndex: "iteration",
      width: "10%",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      width: "10%",
      render: (createdDate) =>
        createdDate ? dayjs(createdDate).format("DD/MM/YYYY") : createdDate,
    },
  ];

  const data = [
    {
      itemType: "Bug",
      title: "Bug",
      asignTo: "Phan Luong Nam",
      state: "To do",
      areaPath: "MyMemo",
      iteration: "iteration 1",
      createdDate: new Date(),
    },
    {
      itemType: "Task",
      title: "Task",
      asignTo: "Phan Luong Nam",
      state: "Doing",
      areaPath: "MyMemo",
      iteration: "iteration 1",
      createdDate: new Date(),
    },
    {
      itemType: "Task",
      title: "Task",
      asignTo: "Phan Luong Nam",
      state: "Done",
      areaPath: "MyMemo",
      iteration: "iteration 1",
      createdDate: new Date(),
    },
    {
      itemType: "Task",
      title: "Task",
      asignTo: "Phan Luong Nam",
      state: "Close",
      areaPath: "MyMemo",
      iteration: "iteration 1",
      createdDate: new Date(),
    },
  ];

  return (
    <>
      <CreateWorkitem
        isOpen={isModalCreateOpen}
        handleClose={handleCloseModalCreate}
      />

      <div className="flex justify-between items-center">
        <Typography.Title level={3}>Work items</Typography.Title>
        <Space>
          <Button
            type="primary"
            title="New Work Item"
            onClick={() => handleOpenModalCreate()}
            icon={<PlusOutlined />}
          >
            New Work Item
          </Button>
          <Button
            onClick={handleToggleCardVisibility}
            type="dashed"
            title="Filter"
            icon={<FilterFilled />}
          >
            Filter
          </Button>
        </Space>
      </div>

      {isCardVisible && (
        <Card className="w-full mt-2 shadow-custom bg-gray-50">
          <Row gutter={16}>
            <Col span={12}>
              <Input
                bordered={false}
                placeholder="Filter By Title"
                prefix={<SearchOutlined />}
                width={150}
              />
            </Col>
            <Col className="text-right" span={12}>
              <Select
                bordered={false}
                options={TYPE_OPTION}
                className="mr-3 w-24"
                placeholder="Type"
              />
              <Select
                bordered={false}
                options={STATE_OPTION}
                className="mr-3 w-24"
                placeholder="State"
              />
              <Select
                options={ITERATION_OPTION}
                className="w-24"
                bordered={false}
                placeholder="Iteration"
              />
            </Col>
          </Row>
        </Card>
      )}

      <Space direction="vertical" className="w-full shadow-custom pb-5">
        <Table
          rowKey="projectId"
          columns={columns}
          dataSource={pagination(
            data,
            parseInt(searchParams.get("page") || "1"),
            parseInt(searchParams.get("limit") || "10")
          )}
          pagination={{
            showSizeChanger: true,
            current: parseInt(searchParams.get("page") || "1"),
            pageSize: parseInt(searchParams.get("limit") || "10"),
            pageSizeOptions: [10, 20, 50, 100],
            total: 1,
            onChange: onChangePage,
            className: "px-5 !mb-0",
          }}
        />
      </Space>
    </>
  );
}
