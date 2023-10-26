import React, { useState } from "react";
import {
  Button,
  Modal,
  Space,
  message,
  Form,
  Input,
  Radio,
  DatePicker,

} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import axios from "axios";

const { TextArea } = Input;

const TaskCreateProject = ({ onProjectCreated }) => {
  const [open, setOpen] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/project-management/projects`,
        {
          projectName: values.name,
          description: values.description,
          startDate: values.startDate.toISOString(),
          endDate: values.endDate.toISOString(),
          createBy: JSON.parse(decodeURIComponent(sessionStorage.userId)),
          createAt: new Date().toISOString(),
          projectStatus: 1,
          privacyStatus: values.privacy === true ? true : false,
        }
      );
      message.success("Project created successfully!");
      onProjectCreated(response.data); // Notify parent component about the new project
      form.resetFields();
      setOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
      message.error("Failed to create project. Please try again.");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };
  const disabledEndDate = (current) => {
    const startDateValue = form.getFieldValue('startDate');
    return current && current.isBefore(startDateValue, 'day');
  };

  return (
    <>
      <Space style={{ display: 'flex', flexDirection: 'row-reverse', margin: '10px' }}>
        <Button
          type="primary"
          onClick={showModal}
          style={{
            margin: "10px",
            backgroundColor: "#36af99",
            fontWeight: "bold",
          }}
        >
          Create New Project
        </Button>
      </Space>
      <Modal
        visible={open}
        title="Create New Project"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="create" type="primary" onClick={handleOk}>
            Create Project
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          initialValues={{ disabled: componentDisabled }}
        >
          <Form.Item
            name="name"
            label="Name Project"
            rules={[
              { required: true, message: "Please enter the project name" },
            ]}
          >
            <Input disabled={componentDisabled} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter the project description",
              },
            ]}
          >
            <TextArea disabled={componentDisabled} />
          </Form.Item>

          <Form.Item name="startDate" label="Start Date">
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item name="endDate" label="End Date">
            <DatePicker format="DD/MM/YYYY" disabledDate={disabledEndDate} />
          </Form.Item>

          <Form.Item name="privacy" label="Privacy">
            <Radio.Group>
              <Radio value="private">Private</Radio>
              <Radio value="public">Public</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskCreateProject;
