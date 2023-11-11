import { useState } from "react";
import { HeaderRender } from "antd/es/calendar/generateCalendar";
import dayjs, { Dayjs } from "dayjs";
import {
  Button,
  Calendar,
  Card,
  Col,
  Input,
  Row,
  Select,
  Space,
  Typography,
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

const ProjectCalendar = () => {
  const [value, setValue] = useState(dayjs());
  const [isCardVisible, setIsCardVisible] = useState(false);

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

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
      <Calendar
        headerRender={HeaderCalendar}
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </Space>
  );
};

const HeaderCalendar: HeaderRender<Dayjs> = (params) => (
  <Row gutter={12} className="flex items-center p-4">
    <Col span={1}>
      <LeftOutlined
        className="text-3xl"
        onClick={() =>
          params.onChange(dayjs(params.value).subtract(1, "month"))
        }
      />
    </Col>
    <Col span={1}>
      <RightOutlined
        className="text-3xl"
        onClick={() => params.onChange(dayjs(params.value).add(1, "month"))}
      />
    </Col>
    <Col span={10}>
      <Typography.Text className="text-3xl font-medium select-none">
        {params.value.format("MMMM YYYY")}
      </Typography.Text>
    </Col>
  </Row>
);

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

export default ProjectCalendar;
