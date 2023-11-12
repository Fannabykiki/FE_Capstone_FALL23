import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import DeleteProject from "./modalDelete";

export default function ProjectInformation() {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleOpenModalCreate = () => {
    setIsModalDeleteOpen(true);
  };

  const handleCloseModalCreate = () => {
    setIsModalDeleteOpen(false);
  };
  return (
    <>
      <DeleteProject
        isOpen={isModalDeleteOpen}
        handleClose={handleCloseModalCreate}
      />

      <Card className="min-h-screen">
        <Typography className="text-3xl font-bold mb-10">
          Project Infomation
        </Typography>
        <Row>
          <Col span={12}>
            <Form layout="vertical">
              <Form.Item label={<b>Name</b>} name="name">
                <Input />
              </Form.Item>
              <Form.Item label={<b>Description</b>} name="description ">
                <Input />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={<b>Created Date</b>} name="createdDate ">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={<b>Due Date</b>} name="duaDate ">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Space className="mt-5">
              <Button type="primary">Save</Button>
            </Space>
          </Col>
          <Col span={3}></Col>
          <Col span={9}>
            <Avatar size={100} shape="square">
              T
            </Avatar>
          </Col>
        </Row>
        <Divider />
        <Typography className="text-xl font-medium">
          Project Administrator
        </Typography>
        <Space className="mt-5">
          <Avatar shape="square">T</Avatar>
          <Typography className="text-base font-normal">
            Phan Luong Nam
          </Typography>
        </Space>
        <Divider />
        <Typography className="text-xl font-medium">Delete Project</Typography>
        <Typography className="mt-2">
          This will affect all contents and members of this project.
        </Typography>
        <Button
          onClick={handleOpenModalCreate}
          className="mt-5"
          type="primary"
          danger
        >
          Delete
        </Button>
      </Card>
    </>
  );
}
