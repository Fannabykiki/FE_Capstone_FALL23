import { pagination } from "@/utils/pagination";
import { randomBgColor } from "@/utils/random";
import {
  BugFilled,
  CheckSquareFilled,
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
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "@/utils/api/project";
import { IWorkItemList } from "@/interfaces/project";
import useDetailView from "@/hooks/useDetailView";
import { CreateTask } from "@/components";

export default function WorkItem() {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const { projectId } = useParams();

  const { data, isLoading } = useQuery<IWorkItemList[]>({
    queryKey: [projectApi.getWorkItemListByProjectIdKey],

    queryFn: async ({ signal }) => {
      const data: IWorkItemList[] = await projectApi.getWorkItemListByProjectId(
        signal,
        projectId
      );
      return data.map((user) => ({
        ...user,
        assignTo: { ...user.assignTo, avatarColor: randomBgColor() },
      }));
    },
    enabled: Boolean(projectId),
  });

  const {
    onOpenView: handleOpenModalCreate,
    onCloseView: handleCloseModalCreate,
    openView: isModalCreateOpen,
  } = useDetailView();

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

  const queryClient = useQueryClient();

  return (
    <>
      <CreateTask
        isOpen={isModalCreateOpen}
        handleClose={handleCloseModalCreate}
        onSuccess={() =>
          queryClient.refetchQueries([projectApi.getWorkItemListByProjectIdKey])
        }
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
        <Card className="w-full mt-2 shadow-custom">
          <Row gutter={16}>
            <Col span={12}>
              <Input
                placeholder="Filter By Title"
                prefix={<SearchOutlined />}
                width={150}
              />
            </Col>
            <Col className="text-right" span={12}>
              <Select
                bordered
                options={TYPE_OPTION}
                className="mr-3 w-24"
                placeholder="Type"
              />
              <Select
                options={STATE_OPTION}
                className="mr-3 w-20"
                placeholder="State"
              />
              <Select
                options={ITERATION_OPTION}
                className="w-28"
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
          loading={isLoading}
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
            total: data?.length,
            onChange: onChangePage,
            className: "px-5 !mb-0",
          }}
        />
      </Space>
    </>
  );
}

const columns: ColumnsType<IWorkItemList> = [
  {
    dataIndex: "index",
    width: "5%",
    align: "center",
    render: (_row, _record, index) => index + 1,
  },
  {
    title: "Title",
    dataIndex: "title",
    width: "30%",
  },
  {
    title: "Type",
    dataIndex: "taskType",
    width: "10%",
    render: (type) => {
      let Component = null;

      switch (type) {
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
            {type}
          </Typography.Text>
        </Row>
      );
    },
  },
  {
    title: "Assign To",
    dataIndex: "assignTo",
    width: "15%",
    render: (_, record) =>
      record.assignTo?.userName ? (
        <Row align="middle">
          <Col span={5} className="flex items-center">
            <Avatar style={{ backgroundColor: record.assignTo.avatarColor }}>
              {record.assignTo?.userName?.charAt(0).toUpperCase()}
            </Avatar>
          </Col>
          <Col span={19}>
            <Typography.Title level={5} className="!m-0">
              {record.assignTo?.userName}
            </Typography.Title>
          </Col>
        </Row>
      ) : null,
  },
  {
    title: "State",
    dataIndex: "taskStatus",
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
    title: "Priority",
    dataIndex: "priority",
    width: "10%",
  },
  {
    title: "Interation",
    dataIndex: "interation",
    width: "10%",
  },
  {
    title: "Created Date",
    dataIndex: "createTime",
    width: "10%",
    render: (createTime) =>
      createTime ? dayjs(createTime).format("DD/MM/YYYY") : createTime,
  },
];

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
