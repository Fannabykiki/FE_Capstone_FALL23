import { pagination } from "@/utils/pagination";
import { randomBgColor } from "@/utils/random";
import {
  BugFilled,
  CheckSquareFilled,
  CheckSquareOutlined,
  EyeTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Row, Space, Typography, Table, Button, Col, Avatar } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import CreateWorkitem from "@/features/Project/WorkItem/Modal/CreateWorkitem";
import EditWorkitem from "@/features/Project/WorkItem/Modal/EditWorkitem";
import { useState } from "react";

export default function WorkItem() {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const handleOpenModalCreate = () => {
    setIsModalCreateOpen(true);
  };

  const handleCloseModalCreate = () => {
    setIsModalCreateOpen(false);
  };

  const handleOpenModalEdit = () => {
    setIsModalEditOpen(true);
  };

  const handleCloseModalEdit = () => {
    setIsModalEditOpen(false);
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
      width: "20%",
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
      width: "20%",
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
      width: "20%",
    },
    {
      title: "Iteration",
      dataIndex: "iteration",
      width: "30%",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      width: "25%",
      render: (createdDate) =>
        createdDate
          ? dayjs(createdDate).format("DD/MM/YYYY HH:mm")
          : createdDate,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "25%",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <EyeTwoTone onClick={() => handleOpenModalEdit()} />
        </Space>
      ),
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
      <EditWorkitem
        isOpen={isModalEditOpen}
        handleClose={handleCloseModalEdit}
      />
      <div className="flex justify-between items-center">
        <Typography.Title level={3}>Work items</Typography.Title>
        <Button
          type="primary"
          title="New Work Item"
          onClick={() => handleOpenModalCreate()}
          icon={<PlusOutlined />}
        >
          New Work Item
        </Button>
      </div>

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
