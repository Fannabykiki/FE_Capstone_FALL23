import React from "react";
import ReactECharts from "echarts-for-react";
import { Divider, Row, Table, Tag, Typography } from "antd";

import {
  DashboardStyled,
  SelectProjectStyled,
  DonutChartStyled,
  LineChartStyled,
  TableWrapper,
  PaginationStyled,
  WrapperSearch,
  SelectStatusStyled,
  InputStyled,
} from "./styles";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: 75,
    align: "center",
    render: (text, record, index) => <span>{index + 1}</span>,
    defaultSortOrder: "descend",
    sorter: (a, b) => a - b,
  },
  {
    title: "TASK",
    dataIndex: "task",
    key: "task",
    defaultSortOrder: "descend",
    sorter: (a, b) => a - b,
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <span>
        {status === 1 ? (
          <Tag color="green">Active</Tag>
        ) : status === 2 ? (
          <Tag color="red">Deactive</Tag>
        ) : null}
      </span>
    ),
    defaultSortOrder: "descend",
    sorter: (a, b) => a - b,
  },
  {
    title: "DUE DATE",
    dataIndex: "due-date",
    key: "due-date",
    defaultSortOrder: "descend",
    sorter: (a, b) => a - b,
  },
  {
    title: "CREATOR/REVIEWER",
    dataIndex: "creator/reviewer",
    key: "creator/reviewer",
    defaultSortOrder: "descend",
    sorter: (a, b) => a - b,
  },
];

const Dashboard = () => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <DashboardStyled>
      <Row align="middle">
        <Typography.Title level={4} style={{ margin: 0 }}>
          Project:
        </Typography.Title>
        <SelectProjectStyled
          showSearch
          placeholder="Chọn dự án"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
      </Row>
      <Divider />
      <Row justify="space-between">
        <DonutChartStyled span={8}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Task Overview
          </Typography.Title>
          <Typography>Task breakdown by statuses</Typography>
          <ReactECharts
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
                        formatter: function (params) {
                          return params.value + "%\n";
                        },
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
        </DonutChartStyled>
        <LineChartStyled span={15}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            All Task
          </Typography.Title>
          <Typography>Group task by day</Typography>
          <ReactECharts
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
        </LineChartStyled>
      </Row>
      <TableWrapper>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Your Tasks In this Project
        </Typography.Title>
        <Divider />
        <WrapperSearch justify="end" align="middle">
          <Typography>Search: </Typography>
          <InputStyled />
          <SelectStatusStyled
            showSearch
            placeholder="Chọn trạng thái"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
        </WrapperSearch>
        <Table dataSource={[]} columns={columns} />
        <PaginationStyled
          defaultCurrent={6}
          total={500}
          locale={{ items_per_page: "" }}
        />
      </TableWrapper>
    </DashboardStyled>
  );
};

export default Dashboard;
