import { useState } from "react";
import { Avatar, Button, Col, Row, Space, Typography } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";

import CreateEditRole, { RoleInputType } from "./CreateEditRole";

const RoleManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleEdit, setRoleEdit] = useState<RoleInputType>();

  const handleOpenModal = (role?: RoleInputType) => {
    setIsModalOpen(true);
    setRoleEdit(role);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRoleEdit(undefined);
  };

  return (
    <Space direction="vertical" className="w-full gap-5">
      <Row gutter={12}>
        <Col span={18}>
          <Typography.Title level={1}>Project Role</Typography.Title>
          <Typography.Text>
            You can use project roles to associate users and/or groups with
            specific projects. The table below shows all the project roles that
            are available in DevTasker. Use this screen to add, edit and delete
            project roles.
          </Typography.Text>
        </Col>
        <Col span={6} className="flex items-end justify-end">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal()}
          >
            Add new role
          </Button>
        </Col>
      </Row>
      <Row gutter={[24, 24]} className="w-full">
        {roles.map((role, index) => (
          <Col
            key={index}
            span={8}
            className="cursor-pointer hover:scale-105 transition ease-in-out duration-300"
          >
            <Space
              direction="vertical"
              className="w-full bg-white p-5 rounded-lg shadow-custom"
            >
              <Row justify="end">
                <Avatar.Group
                  maxCount={4}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  <Avatar style={{ backgroundColor: "#f56a00" }}>A</Avatar>
                  <Avatar style={{ backgroundColor: "#f56a00" }}>B</Avatar>
                  <Avatar style={{ backgroundColor: "#f56a00" }}>C</Avatar>
                  <Avatar style={{ backgroundColor: "#f56a00" }}>D</Avatar>
                </Avatar.Group>
              </Row>
              <Row>
                <Typography.Title level={3} className="!m-0">
                  {role.name}
                </Typography.Title>
              </Row>
              <Row>
                <Button
                  type="link"
                  className="!p-0"
                  onClick={() => handleOpenModal(role)}
                >
                  Edit role
                </Button>
                <Button type="link" className="!p-0 ml-5">
                  Delete role
                </Button>
                <EyeOutlined className="text-xl ml-auto" />
              </Row>
            </Space>
          </Col>
        ))}
      </Row>
      <CreateEditRole
        isOpen={isModalOpen}
        roleEdit={roleEdit}
        handleClose={handleCloseModal}
      />
    </Space>
  );
};

const roles: RoleInputType[] = [
  {
    name: "Administrator",
    description: "Administrator",
  },
  {
    name: "Project Manager",
    description: "Project Manager",
  },
  {
    name: "Developer",
    description: "Developer",
  },
  {
    name: "Tester",
    description: "Tester",
  },
  {
    name: "BA",
    description: "BA",
  },
];

export default RoleManagement;
