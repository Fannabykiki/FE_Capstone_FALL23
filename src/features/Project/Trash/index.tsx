import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { AvatarWithColor } from "@/components";
import debounce from "lodash/debounce";
import buildQuery from "odata-query";
import dayjs from "dayjs";
import {
  BugFilled,
  CheckSquareFilled,
  FilterFilled,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";

import { pagination } from "@/utils/pagination";
import { taskApi } from "@/utils/api/task";
import {
  IGetTypeListResponse,
  ITaskStatus,
  ITrashBinRecord,
} from "@/interfaces/task";
import { useAuthContext } from "@/context/Auth";
import { IProject } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import useTaskActions from "@/hooks/useTaskActions";
import { toast } from "react-toastify";
import { orderBy } from "lodash";
import useProjectDetail from "@/hooks/useProjectDetail";

const TrashBin = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const [modal, contextHolder] = Modal.useModal();

  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "10",
  });

  const { projectId } = useParams();

  const queryClient = useQueryClient();

  const typeList = useMemo(
    () =>
      queryClient.getQueryData<IGetTypeListResponse[]>([
        taskApi.getTaskTypeKey,
      ]),
    [queryClient]
  );

  const statusList = useMemo(
    () =>
      queryClient.getQueryData<ITaskStatus[]>([
        taskApi.getTaskStatusKey,
        projectId,
      ]) || [],
    [projectId, queryClient]
  );

  const { data, isLoading } = useQuery({
    queryKey: [
      taskApi.getAllTaskInTrashBinKey,
      projectId,
      searchParams.get("type"),
      searchParams.get("status"),
      searchParams.get("interation"),
      searchParams.get("search"),
    ],
    queryFn: ({ signal }) =>
      taskApi.getAllTaskInTrashBin(
        signal,
        projectId,
        buildQuery({
          filter: {
            typeName: searchParams.get("type") || undefined,
            statusName: searchParams.get("status") || undefined,
            interationName: searchParams.get("interation") || undefined,
            "tolower(title)": {
              contains: searchParams.get("search")?.toLowerCase(),
            },
          },
        })
      ),
    enabled: Boolean(projectId),
  });

  const onChangePage = (page: number, pageSize: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      prev.set("limit", pageSize.toString());
      return prev;
    });
  };

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

  const project: IProject | undefined = queryClient.getQueryData([
    projectApi.getInfoKey,
    projectId,
  ]);

  const { userInfo } = useAuthContext();

  const member = useMemo(() => {
    return project?.projectMembers.find((mem) => mem.userId === userInfo!.id);
  }, [userInfo, project]);

  const { restoreTaskMutation } = useTaskActions();

  const { iterations, actions } = useProjectDetail(projectId);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    modal.confirm({
      title: "Warning",
      content: "Are you sure to restore this record?",
      onOk: () => {
        restoreTaskMutation.mutate(
          { taskId: key, memberId: member?.memberId || "" },
          {
            onSuccess: async () => {
              toast.success("Restore task succeed!");
              await queryClient.refetchQueries({
                queryKey: [
                  taskApi.getAllTaskInTrashBinKey,
                  projectId,
                  searchParams.get("type"),
                  searchParams.get("status"),
                  searchParams.get("interation"),
                  searchParams.get("search"),
                ],
              });
            },
            onError: (err) => {
              console.error(err);
              toast.error("Restore task failed! Please try again later");
            },
          }
        );
      },
    });
  };

  const columns: ColumnsType<ITrashBinRecord> = [
    {
      dataIndex: "index",
      width: "5%",
      align: "center",
      render: (_row, _record, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "25%",
    },
    {
      title: "Type",
      dataIndex: "typeName",
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
        record.assignTo ? (
          <Row align="middle" className="gap-2">
            <AvatarWithColor stringContent={record.assignTo}>
              {record.assignTo?.charAt(0).toUpperCase()}
            </AvatarWithColor>
            <Typography.Title level={5} className="!m-0">
              {record.assignTo}
            </Typography.Title>
          </Row>
        ) : null,
    },
    {
      title: "State",
      dataIndex: "statusName",
      width: "10%",
      render: (state, record) => {
        const color = statusList.find(
          (s) => s.boardStatusId === record.statusId
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
      dataIndex: "priorityName",
      width: "10%",
    },
    {
      title: "Sprint",
      dataIndex: "interationName",
      width: "10%",
    },
    {
      title: "Deleted At",
      dataIndex: "deleteAt",
      width: "10%",
      render: (createTime) =>
        createTime ? dayjs(createTime).format("DD/MM/YYYY") : null,
    },
    {
      dataIndex: "action",
      width: "5%",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: record.taskId,
                label: "Restore",
              },
            ],
            onClick,
          }}
          placement="bottom"
          arrow
        >
          <MoreOutlined className="cursor-pointer" />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <Typography.Title level={3}>Trash bin</Typography.Title>
        <Space>
          <Button
            onClick={() => setIsCardVisible((prev) => !prev)}
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
          <Row>
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
                className="w-20"
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
                className="w-32"
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
          rowKey="projectId"
          columns={columns}
          loading={isLoading}
          dataSource={pagination(
            orderBy(data, "deleteAt", "desc"),
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
      {contextHolder}
    </>
  );
};

export default TrashBin;
