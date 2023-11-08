import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Table, Typography } from "antd";
import { useParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

import useAdminUserManagement from "@/hooks/useAdminUserManagement";
import RemovePermission from "./RemovePermission";
import { IAdminUsers } from "@/interfaces/user";
import GrantPermission from "./GrantPermission";

const ProjectPermission = () => {
  const [isOpenGrantPermModal, setOpenGrantPermModal] = useState(false);
  const [isOpenRmPermModal, setOpenRmPermModal] = useState(false);

  const { users, isLoading } = useAdminUserManagement({});

  const { projectId } = useParams();

  const columns: ColumnsType<IAdminUsers> = [
    {
      title: "Permission",
      dataIndex: "name",
      width: "45%",
      className: "align-top",
      render: (name, record) => (
        <Space direction="vertical" className="gap-y-0">
          <Typography.Title level={5} className="!m-0 min-h-[24px]">
            {name}
          </Typography.Title>
          <Typography.Text>{name}</Typography.Text>
        </Space>
      ),
    },
    {
      title: "Roles",
      dataIndex: "isAdmin",
      width: "45%",
      render: (isAdmin) => (
        <ul>
          <li>Project</li>
          <li>Project</li>
          <li>Project</li>
          <li>Project</li>
          <li>Project</li>
          <li>Project</li>
          <li>Project</li>
          <li>Project</li>
          <li>Project</li>
          <li>Project</li>
          <li>Project</li>
        </ul>
      ),
    },
    {
      width: "10%",
      className: "align-top",
      align: "center",
      render: () => (
        <Row justify="space-evenly">
          <EditOutlined
            className="text-xl cursor-pointer"
            onClick={() => setOpenGrantPermModal(true)}
          />
          <DeleteOutlined
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => setOpenRmPermModal(true)}
          />
        </Row>
      ),
    },
  ];

  return (
    <Space direction="vertical" className="w-full">
      <Row>
        <Col span={18}>
          <Typography.Title level={1} className="!m-0">
            Permission Schemes
          </Typography.Title>
          <Typography.Title level={3} className="!m-0">
            {projectId}
          </Typography.Title>
        </Col>
        <Col span={6} className="flex justify-end items-center">
          <Button type="primary" onClick={() => setOpenGrantPermModal(true)}>
            Grant permission
          </Button>
        </Col>
      </Row>
      <Typography.Text>General team member can Manage Sprint</Typography.Text>
      <Table
        rowKey="id"
        className="shadow-custom"
        columns={columns}
        loading={isLoading}
        dataSource={users}
        pagination={false}
      />
      <RemovePermission
        isOpen={isOpenRmPermModal}
        handleClose={() => setOpenRmPermModal(false)}
      />
      <GrantPermission
        isOpen={isOpenGrantPermModal}
        handleClose={() => setOpenGrantPermModal(false)}
      />
    </Space>
  );
};

export default ProjectPermission;
