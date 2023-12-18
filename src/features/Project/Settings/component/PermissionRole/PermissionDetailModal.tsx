import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, Typography } from "antd";
import { useParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";

import RevokePermission from "@/features/Admin/PermissionSchemes/RevokePermission";
import GrantPermission from "@/features/Admin/PermissionSchemes/GrantPermission";
import { schemaApi } from "@/utils/api/schema";
import { ISchema } from "@/interfaces/schema";
import { roleApi } from "@/utils/api/role";

interface Props {
  isPermissionId: string | undefined;
  isAdminOrPO: boolean;
  handleClose: () => void;
}

const PermissionDetailModal = ({
  isPermissionId,
  isAdminOrPO,
  handleClose,
}: Props) => {
  const [isOpenRvkPermModal, setOpenRvkPermModal] = useState<boolean>(false);
  const [permissionSelected, setPermissionSelected] =
    useState<ISchema["rolePermissions"][number]>();
  const [isOpenGrantPermModal, setOpenGrantPermModal] =
    useState<boolean>(false);

  const { projectId } = useParams();

  const { data: schema, isFetching } = useQuery({
    queryKey: [schemaApi.getAdminSchemaDetailKey],
    queryFn: ({ signal }) =>
      schemaApi.getAdminSchemaDetail(signal, isPermissionId!),
    enabled: Boolean(isPermissionId),
  });

  const queryClient = useQueryClient();

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

  const onCancel = () => {
    setPermissionSelected(undefined);
    setOpenGrantPermModal(false);
    setOpenRvkPermModal(false);
  };

  const columns: ColumnsType<ISchema["rolePermissions"][number]> = [
    {
      title: "Permission",
      dataIndex: "name",
      width: "50%",
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
      width: isAdminOrPO ? "40%" : "50%",
      render: (roles: ISchema["rolePermissions"][number]["roles"]) => (
        <ul>
          {roles.map((role) => (
            <li key={role.roleId}>{role.roleName}</li>
          ))}
        </ul>
      ),
    },
    isAdminOrPO
      ? {
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
        }
      : {},
  ];

  return (
    <Modal
      maskClosable={false}
      open={!!isPermissionId}
      onCancel={handleClose}
      width="70%"
      footer={false}
    >
      <Space direction="vertical" className="w-full">
        <Typography.Title level={1} className="!m-0">
          Permission Schemes
        </Typography.Title>
        {!isFetching ? (
          <>
            <Typography.Title level={3} className="!m-0">
              {schema?.schemaName}
            </Typography.Title>
            <Typography.Text>{schema?.description}</Typography.Text>
          </>
        ) : null}
        <Table
          rowKey="permissionId"
          className="shadow-custom"
          columns={columns}
          loading={isFetching}
          dataSource={schema?.rolePermissions}
          pagination={false}
        />
      </Space>
      <RevokePermission
        isOpen={isOpenRvkPermModal}
        schemaId={schema?.schemaId}
        permission={permissionSelected}
        projectId={projectId}
        handleClose={onCancel}
      />
      <GrantPermission
        isOpen={isOpenGrantPermModal}
        schema={schema}
        permission={permissionSelected}
        projectId={projectId}
        handleClose={onCancel}
      />
    </Modal>
  );
};

export default PermissionDetailModal;
