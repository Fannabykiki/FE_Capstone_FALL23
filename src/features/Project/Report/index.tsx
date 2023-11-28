import { useMemo, useRef } from "react";
import { Avatar, Col, Divider, Row, Space, Table, Typography } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { ColumnsType, ColumnType } from "antd/es/table";
import ReactECharts from "echarts-for-react";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import useProjectDetail from "@/hooks/useProjectDetail";
import { IReportProject } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { pagination } from "@/utils/pagination";
import { ITaskStatus } from "@/interfaces/task";
import { taskApi } from "@/utils/api/task";

const Report = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "10",
  });

  const { projectId } = useParams();

  const { detail } = useProjectDetail(projectId);

  const pieChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const statusList = useMemo(
    () =>
      queryClient.getQueryData<ITaskStatus[]>([
        taskApi.getTaskStatusKey,
        projectId,
      ]) || [],
    [projectId, queryClient]
  );

  const { data } = useQuery({
    queryKey: [projectApi.getReportProjectByProjectIdKey],
    queryFn: async ({ signal }) => {
      const data = await projectApi.getReportProjectByProjectId(
        signal,
        projectId
      );

      return {
        ...data,
        memberTaks: data.memberTaks.map((member) => {
          const statusObject = member.reportStatuses.reduce(
            (prev, next) => ({ ...prev, [next.title]: next.numberTask }),
            {}
          );
          return { ...member, avatarColor: faker.color.rgb(), ...statusObject };
        }),
      };
    },
    enabled: Boolean(projectId),
  });

  const onChangePage = (page: number, pageSize: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      prev.set("limit", pageSize.toString());
      return prev;
    });
  };

  const columns: ColumnsType<IReportProject["memberTaks"][number]> = [
    {
      key: "fullname",
      title: "MEMBER",
      dataIndex: "fullname",
      width: "20%",
      render: (_: string, record: IReportProject["memberTaks"][number]) => {
        const name = record.fullname || record.userName;
        return (
          <Row gutter={4}>
            <Col span={5} className="flex justify-center items-center">
              <Avatar style={{ backgroundColor: record.avatarColor }}>
                {name?.[0].toUpperCase()}
              </Avatar>
            </Col>
            <Col span={19}>
              <Typography.Title level={5} className="!m-0 min-h-[24px]">
                {name}
              </Typography.Title>
              <Typography.Text className="min-h-[19px]">
                {record.roleName}
              </Typography.Text>
            </Col>
          </Row>
        );
      },
    },
    {
      key: "totalTasks",
      title: "TOTAL TASK",
      dataIndex: "totalTasks",
      width: "10%",
    },
    ...(data?.memberTaks[0]?.reportStatuses.map<
      ColumnType<IReportProject["memberTaks"][number]>
    >((status) => ({
      key: status.title,
      title: status.title,
      dataIndex: status.title,
      width: `${70 / data?.memberTaks[0]?.reportStatuses.length}%`,
      render: (value, _record) => (
        <Typography
          className="font-bold"
          style={{
            color: statusList.find(
              (s) => s.boardStatusId === status.boardStatusId
            )?.hexColor,
          }}
        >
          {value}
        </Typography>
      ),
    })) || []),
  ];

  return (
    <Space direction="vertical" className="w-full gap-5">
      <Row align="middle">
        <Typography.Title level={4} className="!m-0">
          Project: {detail?.projectName}
        </Typography.Title>
      </Row>
      <Divider className="!m-0" />
      <Row gutter={24}>
        <Col span={9}>
          <Space
            ref={pieChartRef}
            direction="vertical"
            className="w-full min-h-[400px] bg-white shadow-custom p-5 rounded-lg"
          >
            <Typography.Title level={4} className="!m-0">
              Task Overview
            </Typography.Title>
            <Typography.Text>Task breakdown by statuses</Typography.Text>
            <ReactECharts
              style={{
                width: `${
                  (pieChartRef.current?.offsetWidth || 40) - 40
                }px !important`,
              }}
              option={{
                tooltip: {
                  trigger: "item",
                  formatter: (params: any) =>
                    params.data.name +
                    ": " +
                    params.data.numberTask +
                    " (" +
                    params.data.value +
                    "%)",
                },
                label: {
                  show: false,
                  position: "center",
                },
                title: {
                  text: "Total Tasks",
                  subtext: data?.reportProject.totalTask,
                  left: "center",
                  top: "center",
                  textStyle: {
                    fontSize: 12,
                    opacity: 0.7,
                  },
                  subtextStyle: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#000000",
                  },
                },
                legend: {
                  bottom: 0,
                  data: data?.reportProject.reportStatuses.map((status) => ({
                    name: status.title,
                    icon: "circle",
                  })),
                },
                series: [
                  {
                    type: "pie",
                    radius: ["40%", "70%"],
                    color: data?.reportProject.reportStatuses.map(
                      (status) =>
                        statusList.find(
                          (s) => s.boardStatusId === status.boardStatusId
                        )?.hexColor
                    ),
                    data: data?.reportProject.reportStatuses.map((status) => ({
                      name: status.title,
                      value: status.percent,
                      numberTask: status.numberTask,
                    })),
                    itemStyle: {
                      normal: {
                        label: {
                          show: true,
                          position: "inner",
                          formatter: (params: any) => params.value + "%\n",
                        },
                        labelLine: {
                          show: false,
                        },
                      },
                    },
                  },
                ],
              }}
              notMerge
              lazyUpdate
            />
          </Space>
        </Col>
        <Col span={15}>
          <Space
            ref={lineChartRef}
            direction="vertical"
            className="w-full min-h-[400px] bg-white shadow-custom p-5 rounded-lg"
          >
            <Typography.Title level={4} className="!m-0">
              All Task
            </Typography.Title>
            <Typography.Text>Tasks of the week</Typography.Text>
            <ReactECharts
              style={{
                width: `${
                  (lineChartRef.current?.offsetWidth || 40) - 40
                }px !important`,
              }}
              option={{
                tooltip: {
                  trigger: "item",
                  formatter: (params: any) =>
                    params.seriesName + ": " + params.value,
                },
                legend: {
                  data: data?.reportRecordByWeek[0]?.reportStatuses.map(
                    (status) => ({
                      name: status.title,
                      itemStyle: {
                        color: statusList.find(
                          (s) => s.boardStatusId === status.boardStatusId
                        )?.hexColor,
                      },
                    })
                  ),
                },
                grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "3%",
                  containLabel: true,
                },
                xAxis: {
                  type: "category",
                  data: data?.reportRecordByWeek.map((record) =>
                    dayjs(record.dateTime).format("DD/MM")
                  ),
                },
                yAxis: {
                  type: "value",
                  interval: 1,
                },
                series: data?.reportRecordByWeek[0]?.reportStatuses.map(
                  (status) => ({
                    name: status.title,
                    stack: "status",
                    type: "bar",
                    data: data?.reportRecordByWeek.map((item) => ({
                      value: item.reportStatuses.find(
                        (s) => s.title === status.title
                      )?.numberTask,
                      itemStyle: {
                        color: statusList.find(
                          (s) => s.boardStatusId === status.boardStatusId
                        )?.hexColor,
                      },
                    })),
                  })
                ),
              }}
              notMerge
              lazyUpdate
            />
          </Space>
        </Col>
      </Row>
      <Space
        direction="vertical"
        className="w-full bg-white p-5 rounded-lg shadow-custom"
      >
        <Typography.Title level={4} className="!m-0">
          Your Tasks In this Project
        </Typography.Title>
        <Divider className="my-4" />
        <Table
          rowKey="userId"
          columns={columns}
          dataSource={pagination(
            data?.memberTaks,
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
    </Space>
  );
};

export default Report;
