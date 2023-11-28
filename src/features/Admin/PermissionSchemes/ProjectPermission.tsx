import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Col, Row, Space, Table, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";

import RevokePermission from "./RevokePermission";
import GrantPermission from "./GrantPermission";
import { useAuthContext } from "@/context/Auth";
import { schemaApi } from "@/utils/api/schema";
import { ISchema } from "@/interfaces/schema";
import { roleApi } from "@/utils/api/role";

const ProjectPermission = () => {
  const [isOpenRvkPermModal, setOpenRvkPermModal] = useState<boolean>(false);
  const [permissionSelected, setPermissionSelected] =
    useState<ISchema["rolePermissions"][number]>();
  const [isOpenGrantPermModal, setOpenGrantPermModal] =
    useState<boolean>(false);

  const { userInfo } = useAuthContext();

  const { schemaId } = useParams();

  const queryClient = useQueryClient();

  const { data: schema, isLoading } = useQuery<ISchema>({
    queryKey: [schemaApi.getAdminSchemaDetailKey, userInfo?.id, schemaId],
    queryFn: ({ signal }) => schemaApi.getAdminSchemaDetail(signal, schemaId!),
    enabled: Boolean(userInfo) && Boolean(schemaId),
  });

  const {
    mutate: getGrantList,
    isLoading: isLoadingGetGrantList,
    variables,
  } = useMutation({
    mutationKey: [roleApi.getGrantListBySchemaIdKey],
    mutationFn: roleApi.getGrantListBySchemaId,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["grant-list", { id: variables.schemaId }],
        data
      );
      setOpenGrantPermModal(true);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data || "Get grant list failed");
    },
  });

  const {
    mutate: getRevokeList,
    isLoading: isLoadingGetRevokeList,
    variables: variablesGetRevokeList,
  } = useMutation({
    mutationKey: [roleApi.getRevokeListBySchemaIdKey],
    mutationFn: roleApi.getRevokeListBySchemaId,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["revoke-list", { id: variables.schemaId }],
        data
      );
      setOpenRvkPermModal(true);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data || "Get revoke list failed");
    },
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
        <Space direction="horizontal">
          <Button
            ghost
            className="hover:!border-transparent hover:!bg-transparent focus:outline-none active:!bg-transparent"
            loading={
              isLoadingGetGrantList &&
              record.permissionId === variables?.data.permissionIds[0]
            }
            onClick={() => {
              if (!schema) return;
              getGrantList({
                schemaId: schema.schemaId,
                data: {
                  permissionIds: [record.permissionId],
                },
              });
              setPermissionSelected(record);
            }}
            icon={
              <EditOutlined
                style={{
                  color: "#000000",
                  fontSize: 22,
                }}
              />
            }
          />
          <Button
            ghost
            className="hover:!border-transparent hover:!bg-transparent focus:outline-none active:!bg-transparent"
            loading={
              isLoadingGetRevokeList &&
              record.permissionId ===
                variablesGetRevokeList?.data.permissionIds[0]
            }
            onClick={() => {
              if (!schema) return;
              getRevokeList({
                schemaId: schema.schemaId,
                data: {
                  permissionIds: [record.permissionId],
                },
              });
              setPermissionSelected(record);
            }}
            icon={
              <DeleteOutlined
                style={{
                  color: "red",
                  fontSize: 22,
                }}
              />
            }
          />
        </Space>
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
          <Button
            type="primary"
            onClick={() => {
              if (!schema) return;
              getGrantList({
                schemaId: schema?.schemaId,
                data: {
                  permissionIds: [],
                },
              });
              setOpenGrantPermModal(true);
            }}
          >
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
