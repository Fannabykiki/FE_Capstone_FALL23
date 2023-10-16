import React, { useState } from 'react';
import { Button, Modal, Space, message, Form, Input, Radio, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const TaskCreateProject = ({ onProjectCreated }) => {
  const [open, setOpen] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        setOpen(false);
        // Call the onProjectCreated function with the created project data
        onProjectCreated(values);
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
  };

  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={showModal}
          style={{ margin: '10px', backgroundColor: '#36af99', fontWeight: 'bold' }}
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
            rules={[{ required: true, message: 'Please enter the project name' }]}
          >
            <Input disabled={componentDisabled} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the project description' }]}
          >
            <TextArea disabled={componentDisabled} />
          </Form.Item>

          <Form.Item name="startDate" label="Start Date">
            <DatePicker />
          </Form.Item>

          <Form.Item name="endDate" label="End Date">
            <DatePicker />
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