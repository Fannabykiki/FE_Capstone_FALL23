import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Table, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

import RevokePermission from "./RevokePermission";
import GrantPermission from "./GrantPermission";
import { useAuthContext } from "@/context/Auth";
import { schemaApi } from "@/utils/api/schema";
import { ISchema } from "@/interfaces/schema";

const ProjectPermission = () => {
  const [isOpenRvkPermModal, setOpenRvkPermModal] = useState<boolean>(false);
  const [permissionSelected, setPermissionSelected] =
    useState<ISchema["rolePermissions"][number]>();
  const [isOpenGrantPermModal, setOpenGrantPermModal] =
    useState<boolean>(false);

  const { userInfo } = useAuthContext();

  const { schemaId } = useParams();

  const { data: schema, isLoading } = useQuery<ISchema>({
    queryKey: [schemaApi.getAdminSchemaDetailKey, userInfo?.id, schemaId],
    queryFn: ({ signal }) => schemaApi.getAdminSchemaDetail(signal, schemaId!),
    enabled: Boolean(userInfo) && Boolean(schemaId),
  });

  const handleClose = () => {
    setPermissionSelected(undefined);
    setOpenGrantPermModal(false);
    setOpenRvkPermModal(false);
  };

  const columns: ColumnsType<ISchema["rolePermissions"][number]> = [
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
          <Typography.Text>{record.description}</Typography.Text>
        </Space>
      ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      width: "45%",
      render: (roles: ISchema["rolePermissions"][number]["roles"]) => (
        <ul>
          {roles.map((role, index) => (
            <li key={index}>{role.roleName}</li>
          ))}
        </ul>
      ),
    },
    {
      width: "10%",
      className: "align-top",
      align: "center",
      render: (_, record) => (
        <Row justify="space-evenly">
          <EditOutlined
            className="text-xl cursor-pointer"
            onClick={() => {
              setPermissionSelected(record);
              setOpenGrantPermModal(true);
            }}
          />
          <DeleteOutlined
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => {
              setPermissionSelected(record);
              setOpenRvkPermModal(true);
            }}
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
            {schema?.schemaName}
          </Typography.Title>
        </Col>
        <Col span={6} className="flex justify-end items-center">
          <Button type="primary" onClick={() => setOpenGrantPermModal(true)}>
            Grant permission
          </Button>
        </Col>
      </Row>
      <Typography.Text>{schema?.description}</Typography.Text>
      <Table
        rowKey="permissionId"
        className="shadow-custom"
        columns={columns}
        loading={isLoading}
        dataSource={schema?.rolePermissions}
        pagination={false}
      />
      <RevokePermission
        isOpen={isOpenRvkPermModal}
        schemaId={schema?.schemaId}
        permission={permissionSelected}
        handleClose={handleClose}
      />
      <GrantPermission
        isOpen={isOpenGrantPermModal}
        schema={schema}
        permission={permissionSelected}
        handleClose={handleClose}
      />
    </Space>
  );
};

export default ProjectPermission;
