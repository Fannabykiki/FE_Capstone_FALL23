import { useParams, useSearchParams } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import { ColumnsType } from "antd/es/table";
import { debounce } from "lodash";
import { useRef } from "react";
import {
  Col,
  Divider,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";

import { pagination } from "@/utils/pagination";

const Report = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "10",
  });

  const { projectId } = useParams();

  const pieChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);

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
    <Space direction="vertical" className="w-full gap-5">
      <Row align="middle">
        <Typography.Title level={4} className="!m-0">
          Project: {projectId}
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
                title: {
                  text: `Total Tasks`,
                  left: "center",
                  top: "center",
                  textStyle: {
                    fontSize: 14,
                  },
                },
                legend: {
                  bottom: 0,
                  data: [
                    { name: "Todo", icon: "circle" },
                    { name: "In Progress", icon: "circle" },
                    { name: "In Code Review", icon: "circle" },
                    { name: "Bug Ready to Test", icon: "circle" },
                    { name: "Closed", icon: "circle" },
                  ],
                },
                series: [
                  {
                    type: "pie",
                    radius: ["40%", "70%"],
                    color: [
                      "#0bdbca",
                      "#ed9d58",
                      "#81878C",
                      "#2bff00",
                      "#FCA3A3",
                    ],
                    data: [
                      { value: 5, name: "Todo" },
                      { value: 10, name: "In Progress" },
                      { value: 5, name: "In Code Review" },
                      { value: 10, name: "Bug Ready to Test" },
                      { value: 5, name: "Closed" },
                    ],
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
            <Typography.Text>Group task by day</Typography.Text>
            <ReactECharts
              style={{
                width: `${
                  (lineChartRef.current?.offsetWidth || 40) - 40
                }px !important`,
              }}
              option={{
                legend: {
                  data: [
                    "Todo",
                    "In Progress",
                    "In Code Review",
                    "Bug Ready to Test",
                    "Closed",
                  ],
                },
                grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "3%",
                  containLabel: true,
                },
                xAxis: [
                  {
                    type: "category",
                    boundaryGap: false,
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  },
                ],
                yAxis: [
                  {
                    type: "value",
                  },
                ],
                series: [
                  {
                    name: "Todo",
                    type: "line",
                    stack: "Total",
                    areaStyle: {},
                    emphasis: {
                      focus: "series",
                    },
                    color: "#0bdbca",
                    data: [120, 132, 101, 134, 90, 230, 210],
                  },
                  {
                    name: "In Progress",
                    type: "line",
                    stack: "Total",
                    areaStyle: {},
                    emphasis: {
                      focus: "series",
                    },
                    color: "#ed9d58",
                    data: [220, 182, 191, 234, 290, 330, 310],
                  },
                  {
                    name: "In Code Review",
                    type: "line",
                    stack: "Total",
                    areaStyle: {},
                    emphasis: {
                      focus: "series",
                    },
                    color: "#81878C",
                    data: [150, 232, 201, 154, 190, 330, 410],
                  },
                  {
                    name: "Bug Ready to Test",
                    type: "line",
                    stack: "Total",
                    areaStyle: {},
                    emphasis: {
                      focus: "series",
                    },
                    color: "#2bff00",
                    data: [320, 332, 301, 334, 390, 330, 320],
                  },
                  {
                    name: "Closed",
                    type: "line",
                    stack: "Total",
                    label: {
                      show: true,
                      position: "top",
                    },
                    areaStyle: {},
                    emphasis: {
                      focus: "series",
                    },
                    color: "#FCA3A3",
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                  },
                ],
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
        <Row className="px-3" gutter={16} justify="end">
          <Col span={6}>
            <Input
              className="w-full"
              placeholder="Search"
              defaultValue={searchParams.get("search") || ""}
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              allowClear
            />
          </Col>
          <Col span={4}>
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
          id="key"
          columns={columns}
          dataSource={pagination(
            [],
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

const columns: ColumnsType<any> = [
  {
    key: "stt",
    dataIndex: "index",
    width: "5%",
    align: "center",
    render: (_text, _record, index) => index + 1,
  },
  {
    key: "task",
    title: "TASK",
    dataIndex: "task",
    width: "45%",
    sorter: (a, b) => a - b,
  },
  {
    key: "status",
    title: "STATUS",
    dataIndex: "status",
    width: "15%",
    sorter: (a, b) => a - b,
    render: (status) => (
      <span>
        {status === 1 ? (
          <Tag color="green">Active</Tag>
        ) : status === 2 ? (
          <Tag color="red">Deactive</Tag>
        ) : null}
      </span>
    ),
  },
  {
    key: "due-date",
    title: "DUE DATE",
    dataIndex: "due-date",
    width: "15%",
    sorter: (a, b) => a - b,
  },
  {
    key: "creator/reviewer",
    title: "CREATOR/REVIEWER",
    dataIndex: "creator/reviewer",
    width: "20%",
    sorter: (a, b) => a - b,
  },
];

export default Report;
