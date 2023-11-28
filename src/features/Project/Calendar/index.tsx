import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { RangePickerProps } from "antd/es/date-picker";
import debounce from "lodash/debounce";
import buildQuery from "odata-query";
import dayjs from "dayjs";
import uniqBy from "lodash/uniqBy";
import {
  Calendar,
  CalendarProps,
  ToolbarProps,
  dayjsLocalizer,
} from "react-big-calendar";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Space,
  Typography,
  DatePicker,
  Spin,
} from "antd";
import {
  LeftOutlined,
  RightOutlined,
  FilterFilled,
  SearchOutlined,
} from "@ant-design/icons";

import { IWorkItemList } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { ITaskStatus } from "@/interfaces/task";
import { taskApi } from "@/utils/api/task";

const localizer = dayjsLocalizer(dayjs);
const { RangePicker } = DatePicker;

const WrapperCalendar = Calendar as unknown as React.FC<
  CalendarProps<IWorkItemList>
>;

const ProjectCalendar = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleToggleCardVisibility = () => {
    setIsCardVisible((prev) => !prev);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const { projectId } = useParams();

  const queryClient = useQueryClient();

  const statusList = useMemo(
    () =>
      queryClient.getQueryData<ITaskStatus[]>([
        taskApi.getTaskStatusKey,
        projectId,
      ]) || [],
    [projectId, queryClient]
  );

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

  const { data, isLoading } = useQuery<IWorkItemList[]>({
    queryKey: [
      projectApi.getWorkItemListByProjectIdKey,
      searchParams.get("status"),
      searchParams.get("startDate"),
      searchParams.get("endDate"),
      searchParams.get("search"),
    ],
    queryFn: async ({ signal }) =>
      projectApi.getWorkItemListByProjectId(
        signal,
        projectId,
        buildQuery({
          filter: {
            taskStatus: searchParams.get("status") || undefined,
            "tolower(title)": {
              contains: searchParams.get("search")?.toLowerCase(),
            },
            or: [
              {
                startDate: {
                  ge: searchParams.get("startDate")
                    ? dayjs(searchParams.get("startDate"))
                        .startOf("day")
                        .toISOString()
                    : undefined,
                  le: searchParams.get("endDate")
                    ? dayjs(searchParams.get("endDate"))
                        .endOf("day")
                        .toISOString()
                    : undefined,
                },
              },
              {
                dueDate: {
                  ge: searchParams.get("startDate")
                    ? dayjs(searchParams.get("startDate"))
                        .startOf("day")
                        .toISOString()
                    : undefined,
                  le: searchParams.get("endDate")
                    ? dayjs(searchParams.get("endDate"))
                        .endOf("day")
                        .toISOString()
                    : undefined,
                },
              },
              {
                and: [
                  {
                    startDate: {
                      le: searchParams.get("startDate")
                        ? dayjs(searchParams.get("startDate"))
                            .startOf("day")
                            .toISOString()
                        : undefined,
                    },
                  },
                  {
                    dueDate: {
                      ge: searchParams.get("endDate")
                        ? dayjs(searchParams.get("endDate"))
                            .endOf("day")
                            .toISOString()
                        : undefined,
                    },
                  },
                ],
              },
            ],
          },
        })
      ),
    enabled: Boolean(projectId),
  });

  return (
    <Space direction="vertical" className="w-full gap-5">
      <Row className="flex justify-between items-center">
        <Col span={18}>
          <Typography.Title level={3} className="!m-0">
            Calendar
          </Typography.Title>
        </Col>
        <Col span={6} className="flex justify-end">
          <Button
            onClick={handleToggleCardVisibility}
            type="dashed"
            title="Filter"
            icon={<FilterFilled />}
          >
            Filter
          </Button>
        </Col>
      </Row>

      {isCardVisible && (
        <Card className="w-full mt-2 shadow-custom bg-gray-50">
          <Row gutter={16}>
            <Col span={8}>
              <Input
                bordered={false}
                placeholder="Filter by title"
                prefix={<SearchOutlined />}
                className="w-full"
                defaultValue={searchParams.get("search") || ""}
                onChange={handleSearch}
              />
            </Col>
            <Col span={6}>
              <Select
                bordered={false}
                options={uniqBy(data, (event) => event.assignTo.userId)?.map(
                  (event) => ({
                    label: event.assignTo.userName,
                    value: event.assignTo.userName,
                  })
                )}
                defaultValue={searchParams.get("assignee")}
                onChange={handleChange("assignee")}
                className="w-full"
                placeholder="Filter by Assignee"
                allowClear
              />
            </Col>
            <Col span={10}>
              <Select
                options={statusList.map((status) => ({
                  label: status.title,
                  value: status.title,
                }))}
                className="w-full"
                placeholder="Filter by Status"
                defaultValue={searchParams.get("status")}
                onChange={handleChange("status")}
                bordered={false}
                allowClear
              />
            </Col>
          </Row>
        </Card>
      )}
      <div className="relative bg-white shadow-custom">
        <WrapperCalendar
          localizer={localizer}
          events={data?.filter((event) =>
            searchParams.get("assignee")
              ? event.assignTo.userName === searchParams.get("assignee")
              : true
          )}
          startAccessor="startDate"
          endAccessor="dueDate"
          style={{ height: "75vh" }}
          views={["month"]}
          components={{ toolbar: CustomToolbar }}
          onSelectEvent={(event) => console.log("event", event)}
          popup
          eventPropGetter={(myEventsList) => {
            const color = statusList.find(
              (status) => status.boardStatusId === myEventsList.statusId
            )?.hexColor;

            return {
              style: { backgroundColor: `${color}20`, color, borderRadius: 3 },
            };
          }}
        />
        {isLoading ? (
          <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center bg-gray-200 opacity-80">
            <Spin />
          </div>
        ) : null}
      </div>
    </Space>
  );
};

const CustomToolbar = (toolbar: ToolbarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (values: RangePickerProps["value"]) => {
    setSearchParams((prev) => {
      if (!values) {
        prev.delete("startDate");
        prev.delete("endDate");
      } else {
        values[0] && prev.set("startDate", values[0].toISOString());
        values[1] && prev.set("endDate", values[1].toISOString());
      }
      return prev;
    });
  };

  return (
    <Row gutter={12} className="flex items-center p-4">
      <Col span={1}>
        <LeftOutlined
          className="text-3xl"
          onClick={() => toolbar.onNavigate("PREV")}
        />
      </Col>
      <Col span={1}>
        <RightOutlined
          className="text-3xl"
          onClick={() => toolbar.onNavigate("NEXT")}
        />
      </Col>
      <Col span={10}>
        <Typography.Text className="text-3xl font-medium select-none">
          {dayjs(toolbar.label).format("MMMM YYYY")}
        </Typography.Text>
      </Col>
      <Col span={12} className="flex justify-end">
        <RangePicker
          onChange={handleChange}
          defaultValue={
            searchParams.get("startDate") && searchParams.get("endDate")
              ? [
                  dayjs(searchParams.get("startDate")),
                  dayjs(searchParams.get("endDate")),
                ]
              : undefined
          }
        />
      </Col>
    </Row>
  );
};

export default ProjectCalendar;
