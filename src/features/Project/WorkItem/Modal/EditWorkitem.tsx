import Icon, {
  BugFilled,
  BugOutlined,
  CheckSquareFilled,
  CheckSquareOutlined,
  MinusCircleFilled,
} from "@ant-design/icons";
import { Avatar, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";

const { TextArea } = Input;

interface Props {
  isOpen: boolean;
  handleClose: VoidFunction;
}

export default function EditWorkitem({ isOpen, handleClose }: Props) {
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    handleClose();
  };

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
      label: <>To do</>,
      value: "todo",
    },
    {
      label: "Doing",
      value: "doing",
    },
    {
      label: "Done",
      value: "todo",
    },
    {
      label: "Close",
      value: "close",
    },
  ];

  const PRIORITY_OPTION = [
    {
      label: "1",
      value: "high",
    },
    {
      label: "2",
      value: "medium",
    },
    {
      label: "3",
      value: "low",
    },
    {
      label: "4",
      value: "very low",
    },
  ];

  const MEMBER_OPTION = [
    {
      label: (
        <div className="flex items-center">
          <Avatar size="small" className="mr-2" />
          Phan Luong Nam
        </div>
      ),
      value: "Phan Luong Nam",
    },
    {
      label: (
        <div className="flex items-center">
          <Avatar size="small" className="mr-2" />
          Pham Van Toan
        </div>
      ),
      value: "Pham Van Toan",
    },
    {
      label: (
        <div className="flex items-center">
          <Avatar size="small" className="mr-2" />
          Bui Quang Cuong
        </div>
      ),
      value: "Bui Quang Cuong",
    },
    {
      label: (
        <div className="flex items-center">
          <Avatar size="small" className="mr-2" />
          Nguyen Hoai Son
        </div>
      ),
      value: "Nguyen Hoai Son",
    },
    {
      label: (
        <div className="flex items-center">
          <Avatar size="small" className="mr-2" />
          Nguyen Huu Duc
        </div>
      ),
      value: "Nguyen Huu Duc",
    },
  ];

  return (
    <Modal
      title="Edit Work Item"
      onCancel={onCancel}
      open={isOpen}
      onOk={form.submit}
      okText="Save"
    >
      <Form className="w-full" layout="vertical" form={form}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Type is required" }]}
            >
              <Select options={TYPE_OPTION} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="State" name="state">
              <Select options={STATE_OPTION} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Priority"
              name="priority"
              rules={[{ required: true, message: "Priority is required" }]}
            >
              <Select options={PRIORITY_OPTION} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Assign To"
          name="asignTo"
          rules={[{ required: true, message: "Assign To is required" }]}
        >
          <Select
            size="large"
            allowClear
            mode="multiple"
            options={MEMBER_OPTION}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Start Date is required" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Due Date"
              name="dueDate"
              rules={[{ required: true, message: "Due Date is required" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Description" name="description">
          <TextArea showCount maxLength={100} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
