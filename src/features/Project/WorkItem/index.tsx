import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import buildQuery from "odata-query";
import { debounce } from "lodash";
import dayjs from "dayjs";
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

import { IGetTypeListResponse, ITaskStatus } from "@/interfaces/task";
import { IWorkItemList } from "@/interfaces/project";
import useDetailView from "@/hooks/useDetailView";
import { projectApi } from "@/utils/api/project";
import { pagination } from "@/utils/pagination";
import { randomBgColor } from "@/utils/random";
import { taskApi } from "@/utils/api/task";
import { CreateTask } from "@/components";

export default function WorkItem() {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const { projectId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "10",
  });

  const queryClient = useQueryClient();

  const typeList = queryClient.getQueryData<IGetTypeListResponse[]>([
    taskApi.getTaskTypeKey,
  ]);

  const statusList =
    queryClient.getQueryData<ITaskStatus[]>([
      taskApi.getTaskStatusKey,
      projectId,
    ]) || [];

  const { data, isLoading } = useQuery<IWorkItemList[]>({
    queryKey: [
      projectApi.getWorkItemListByProjectIdKey,
      searchParams.get("type"),
      searchParams.get("status"),
      searchParams.get("interation"),
      searchParams.get("search"),
    ],
    queryFn: async ({ signal }) => {
      const data: IWorkItemList[] = await projectApi.getWorkItemListByProjectId(
        signal,
        projectId,
        buildQuery({
          filter: {
            taskType: searchParams.get("type") || undefined,
            taskStatus: searchParams.get("status") || undefined,
            interation: searchParams.get("interation") || undefined,
            "tolower(title)": {
              contains: searchParams.get("search")?.toLowerCase(),
            },
          },
        })
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
  const handleChange = (fieldName: string) => (value: string) => {
    setSearchParams((prev) => {
      if (!value) {
        prev.delete(fieldName);
      } else {
        prev.set(fieldName, value);
      }
      return prev;
    });
  };

  const handleToggleCardVisibility = () => {
    setIsCardVisible((prev) => !prev);
  };

  const onChangePage = (page: number, pageSize: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      prev.set("limit", pageSize.toString());
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
    <>
      <CreateTask
        isOpen={isModalCreateOpen}
        handleClose={handleCloseModalCreate}
        onSuccess={() =>
          queryClient.refetchQueries([projectApi.getWorkItemListByProjectIdKey])
        }
      />

      <div className="flex justify-between items-center">
        <Typography.Title level={3}>Tasks</Typography.Title>
        <Space>
          <Button
            type="primary"
            title="New Task"
            onClick={() => handleOpenModalCreate()}
            icon={<PlusOutlined />}
          >
            New Task
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
                className="w-full"
                defaultValue={searchParams.get("search") || ""}
                onChange={handleSearch}
                allowClear
              />
            </Col>
            <Col className="flex justify-end gap-4" span={12}>
              <Select
                bordered
                options={typeList?.map((type) => ({
                  label: type.title,
                  value: type.title,
                }))}
                className="w-20 text-center"
                placeholder="Type"
                defaultValue={searchParams.get("type")}
                onChange={handleChange("type")}
                allowClear
              />
              <Select
                options={statusList.map((status) => ({
                  label: status.title,
                  value: status.title,
                }))}
                className="w-32 text-center"
                placeholder="State"
                defaultValue={searchParams.get("status")}
                onChange={handleChange("status")}
                allowClear
              />
              <Select
                options={INTERATION_OPTION}
                className="w-36 text-center"
                placeholder="Interation"
                defaultValue={searchParams.get("interation")}
                onChange={handleChange("interation")}
                allowClear
              />
            </Col>
          </Row>
        </Card>
      )}

      <Space direction="vertical" className="w-full shadow-custom pb-5">
        <Table
          rowKey="taskId"
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

const INTERATION_OPTION = [
  {
    label: "Interation 1",
    value: "Interation 1",
  },
  {
    label: "Interation 2",
    value: "Interation 2",
  },
  {
    label: "Interation 3",
    value: "Interation 3",
  },
  {
    label: "Interation 4",
    value: "Interation 4",
  },
];
