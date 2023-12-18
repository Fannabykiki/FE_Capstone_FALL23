import { useMemo, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { debounce, orderBy } from "lodash";
import buildQuery from "odata-query";
import dayjs from "dayjs";
import {
  BugFilled,
  CheckSquareFilled,
  FilterFilled,
  PlusOutlined,
  SearchOutlined,
  WarningFilled,
} from "@ant-design/icons";
import {
  Row,
  Space,
  Typography,
  Table,
  Button,
  Col,
  Card,
  Input,
  Select,
  Badge,
  Tooltip,
} from "antd";

import { AvatarWithColor, CreateTask, TaskDetail } from "@/components";
import { IGetTypeListResponse, ITaskStatus } from "@/interfaces/task";
import { IProject, IWorkItemList } from "@/interfaces/project";
import useDetailView from "@/hooks/useDetailView";
import { projectApi } from "@/utils/api/project";
import { pagination } from "@/utils/pagination";
import { taskApi } from "@/utils/api/task";
import useProjectDetail from "@/hooks/useProjectDetail";
import { classNames } from "@/utils/common";

export default function WorkItem() {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const { projectId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "10",
    id: "",
  });

  const {
    openView: isModalDetailTaskOpen,
    onOpenView: onOpenViewDetailTask,
    onCloseView: onCloseViewDetailTask,
    detail: taskId,
  } = useDetailView<string>();

  useEffect(() => {
    const taskId = searchParams.get("id");
    if (taskId) {
      onOpenViewDetailTask(taskId);
    } else {
      onCloseViewDetailTask();
    }
  }, [searchParams]);

  const queryClient = useQueryClient();

  const project: IProject | undefined = queryClient.getQueryData([
    projectApi.getInfoKey,
    projectId,
  ]);
  const typeList = queryClient.getQueryData<IGetTypeListResponse[]>([
    taskApi.getTaskTypeKey,
  ]);

  const statusList = useMemo(
    () =>
      queryClient.getQueryData<ITaskStatus[]>([
        taskApi.getTaskStatusKey,
        projectId,
      ]) || [],
    [projectId, queryClient]
  );

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      projectApi.getWorkItemListByProjectIdKey,
      searchParams.get("type"),
      searchParams.get("status"),
      searchParams.get("interation"),
      searchParams.get("search"),
    ],
    queryFn: ({ signal }) =>
      projectApi.getWorkItemListByProjectId(
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
      ),
    enabled: Boolean(projectId),
  });

  const {
    onOpenView: handleOpenModalCreate,
    onCloseView: handleCloseModalCreate,
    openView: isModalCreateOpen,
  } = useDetailView();
  const { iterations, actions } = useProjectDetail(projectId);
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

  const columns: ColumnsType<IWorkItemList> = [
    {
      dataIndex: "index",
      width: "5%",
      align: "center",
      render: (_row, _record, index) =>
        (parseInt(searchParams.get("page") || "1") - 1) * 10 + (index + 1),
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "25%",
      render: (title, task) => (
        <Typography.Link
          onClick={() =>
            setSearchParams((prev) => {
              prev.set("id", task.taskId);
              return prev;
            })
          }
        >
          {title}
        </Typography.Link>
      ),
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
          <Row align="middle" className="gap-2">
            <Tooltip
              title={
                record.memberStatus &&
                record.memberStatus !== "In Team" &&
                "Member unavailable"
              }
            >
              <Badge
                count={
                  record.memberStatus && record.memberStatus !== "In Team" ? (
                    <WarningFilled className="text-red-500" />
                  ) : null
                }
              >
                <AvatarWithColor
                  className={classNames(
                    record.memberStatus &&
                      record.memberStatus !== "In Team" &&
                      "border-red-500 border-solid border-2"
                  )}
                  stringContent={record.assignTo?.userName}
                >
                  {record.assignTo?.userName?.charAt(0).toUpperCase()}
                </AvatarWithColor>
              </Badge>
            </Tooltip>
            <Typography.Title level={5} className="!m-0">
              {record.assignTo?.userName}
            </Typography.Title>
          </Row>
        ) : null,
    },
    {
      title: "State",
      dataIndex: "taskStatus",
      width: "15%",
      render: (state, record) => {
        const color = statusList.find(
          (status) => status.boardStatusId === record.statusId
        )?.hexColor;

        return (
          <Row align="middle" className="gap-2">
            <Typography.Text
              className="px-2 py-1 rounded font-medium"
              style={{
                color,
                backgroundColor: `${color}20`,
              }}
            >
              {state}
            </Typography.Text>
          </Row>
        );
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: "10%",
    },
    {
      title: "Sprint",
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

  return (
    <>
      <CreateTask
        isOpen={isModalCreateOpen}
        handleClose={handleCloseModalCreate}
        onSuccess={() => refetch()}
      />

      <div className="flex justify-between items-center">
        <Typography.Title level={3}>Tasks</Typography.Title>
        <Space>
          {project?.projectStatus !== "Done" && (
            <Button
              type="primary"
              title="New Task"
              onClick={() => handleOpenModalCreate()}
              icon={<PlusOutlined />}
            >
              New Task
            </Button>
          )}
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
            <Col span={8}>
              <Input
                placeholder="Filter By Title"
                prefix={<SearchOutlined />}
                className="w-full"
                defaultValue={searchParams.get("search") || ""}
                onChange={handleSearch}
                allowClear
              />
            </Col>
            <Col className="flex justify-end gap-4" span={16}>
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
                className="min-w-[50%]"
                placeholder="Sprint"
                defaultValue={searchParams.get("interation")}
                onChange={handleChange("interation")}
                allowClear
                options={(iterations || []).map((iteration) => ({
                  label: (
                    <div className="flex items-center justify-between">
                      <span>{iteration.interationName}</span>
                      <span className="text-xs bg-neutral-100 px-2 rounded-full">
                        {iteration.status}
                      </span>
                    </div>
                  ),
                  value: iteration.interationName,
                }))}
                loading={actions.isGettingIterations}
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
            orderBy(data, "createTime", "desc"),
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
      {isModalDetailTaskOpen && (
        <TaskDetail
          taskId={taskId || ""}
          isOpen={isModalDetailTaskOpen}
          onClose={() =>
            setSearchParams((prev) => {
              prev.delete("id");
              return prev;
            })
          }
        />
      )}
    </>
  );
}
