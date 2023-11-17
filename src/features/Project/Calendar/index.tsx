import React, { useState } from "react";
import {
  Calendar,
  CalendarProps,
  ToolbarProps,
  dayjsLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
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
} from "antd";
import {
  LeftOutlined,
  RightOutlined,
  BugFilled,
  CheckCircleOutlined,
  EyeOutlined,
  FilterFilled,
  SearchOutlined,
} from "@ant-design/icons";

const localizer = dayjsLocalizer(dayjs);
const { RangePicker } = DatePicker;

const WrapperCalendar = Calendar as unknown as React.FC<
  CalendarProps<(typeof fakeData)[number]>
>;

const ProjectCalendar = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleToggleCardVisibility = () => {
    setIsCardVisible((prev) => !prev);
  };

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
                placeholder="Filter by Task"
                prefix={<SearchOutlined />}
                className="w-full"
              />
            </Col>
            <Col span={6}>
              <Select
                bordered={false}
                options={TYPE_OPTION}
                className="w-full"
                placeholder="Filter by Role"
              />
            </Col>
            <Col span={10}>
              <Select
                allowClear
                mode="multiple"
                className="w-full"
                placeholder="Filter by Status"
                // onChange={handleChange}
                options={STATUS_OPTION}
                bordered={false}
              />
            </Col>
          </Row>
        </Card>
      )}
      <div className="bg-white shadow-custom">
        <WrapperCalendar
          localizer={localizer}
          events={fakeData}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "75vh" }}
          views={["month"]}
          components={{ toolbar: CustomToolbar }}
          onSelectEvent={(event) => console.log("event", event)}
          // onShowMore={onShowMore}
          eventPropGetter={(myEventsList) => {
            const backgroundColor =
              myEventsList.status === "bug"
                ? "#F5B7B1"
                : myEventsList.status === "subTask"
                ? "#ABEBC6"
                : "#F9E79F";
            const color =
              myEventsList.colorText === "bug"
                ? "#E74C3C"
                : myEventsList.colorText === "subTask"
                ? "#28B463"
                : "#D4AC0D";
            return { style: { backgroundColor, color } };
          }}
        />
      </div>
    </Space>
  );
};

const CustomToolbar = (toolbar: ToolbarProps) => {
  const handleChange = (values: RangePickerProps["value"]) => {
    console.log("values", values);
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
        <RangePicker onChange={handleChange} />
      </Col>
    </Row>
  );
};

const TYPE_OPTION = [
  {
    label: (
      <>
        <EyeOutlined className="text-yellow-600 mr-2" /> Viewer
      </>
    ),
    value: "viewer",
  },
  {
    label: (
      <>
        <BugFilled className="text-red-500 mr-2" /> Creator
      </>
    ),
    value: "creator",
  },
  {
    label: (
      <>
        <CheckCircleOutlined className="text-red-500 mr-2" /> Assignee
      </>
    ),
    value: "assignee",
  },
];

const STATUS_OPTION = [
  {
    label: "View all",
    value: "all",
  },
  {
    label: "Todo",
    value: "todo",
  },
  {
    label: "Doing",
    value: "doing",
  },
  {
    label: "Reviewing",
    value: "reviewing",
  },
  {
    label: "Close",
    value: "close",
  },
];

const fakeData = [
  {
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2023, 11, 1),
    end: new Date(2023, 11, 2),
    status: "bug",
    colorText: "bug",
  },
  {
    title: "Long Event",
    start: new Date(2023, 11, 7),
    end: new Date(2023, 11, 10),
    status: "subTask",
    colorText: "subTask",
  },
  {
    title: "DTS STARTS",
    start: new Date(2023, 11, 13, 0, 0, 0),
    end: new Date(2023, 11, 20, 0, 0, 0),
    status: "subTask",
    colorText: "subTask",
  },
  {
    title: "DTS ENDS",
    start: new Date(2023, 11, 6, 0, 0, 0),
    end: new Date(2023, 11, 13, 0, 0, 0),
    status: "bug",
    colorText: "bug",
  },
  {
    title: "Some Event",
    start: new Date(2023, 11, 9, 0, 0, 0),
    end: new Date(2023, 11, 9, 0, 0, 0),
    status: "subTask",
    colorText: "subTask",
  },
  {
    title: "Conference",
    start: new Date(2023, 11, 11),
    end: new Date(2023, 11, 13),
    desc: "Big conference for important people",
    status: "subTask",
    colorText: "subTask",
  },
  {
    title: "Meeting",
    start: new Date(2023, 11, 12, 10, 30, 0, 0),
    end: new Date(2023, 11, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
    status: "subTask",
    colorText: "subTask",
  },
  {
    title: "Lunch",
    start: new Date(2023, 11, 12, 12, 0, 0, 0),
    end: new Date(2023, 11, 12, 13, 0, 0, 0),
    desc: "Power lunch",
    status: "task",
    colorText: "task",
  },
  {
    title: "Meeting",
    start: new Date(2023, 11, 12, 14, 0, 0, 0),
    end: new Date(2023, 11, 12, 15, 0, 0, 0),
    status: "task",
    colorText: "task",
  },
  {
    title: "Happy Hour",
    start: new Date(2023, 11, 13, 17, 0, 0, 0),
    end: new Date(2023, 11, 15, 17, 30, 0, 0),
    desc: "Most important meal of the day",
    status: "bug",
    colorText: "bug",
  },
  {
    title: "Dinner",
    start: new Date(2023, 11, 17, 20, 0, 0, 0),
    end: new Date(2023, 11, 19, 21, 0, 0, 0),
    status: "task",
    colorText: "task",
  },
  {
    title: "Birthday Party",
    start: new Date(2023, 11, 13, 7, 0, 0),
    end: new Date(2023, 11, 13, 10, 30, 0),
    status: "task",
    colorText: "task",
  },
  {
    title: "Birthday Party 2",
    start: new Date(2023, 11, 13, 7, 0, 0),
    end: new Date(2023, 11, 13, 10, 30, 0),
    status: "bug",
    colorText: "bug",
  },
  {
    title: "Birthday Party 3",
    start: new Date(2023, 11, 13, 7, 0, 0),
    end: new Date(2023, 11, 13, 10, 30, 0),
    status: "task",
    colorText: "task",
  },
  {
    title: "Late Night Event",
    start: new Date(2023, 11, 17, 19, 30, 0),
    end: new Date(2023, 11, 18, 2, 0, 0),
    status: "task",
    colorText: "task",
  },
  {
    title: "Multi-day Event",
    start: new Date(2023, 11, 20, 19, 30, 0),
    end: new Date(2023, 11, 22, 2, 0, 0),
    status: "task",
    colorText: "task",
  },
];

export default ProjectCalendar;
