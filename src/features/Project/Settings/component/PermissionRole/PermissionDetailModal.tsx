import { Modal, Space, Table, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";

import { schemaApi } from "@/utils/api/schema";
import { ISchema } from "@/interfaces/schema";

interface Props {
  isPermissionId: string | undefined;
  handleClose: () => void;
}

const PermissionDetailModal = ({ isPermissionId, handleClose }: Props) => {
  const { data: schema, isLoading } = useQuery<ISchema>({
    queryKey: [schemaApi.getAdminSchemaDetailKey, isPermissionId],
    queryFn: ({ signal }) =>
      schemaApi.getAdminSchemaDetail(signal, isPermissionId!),
    enabled: Boolean(isPermissionId),
  });

  const onCancel = () => {
    handleClose();
  };

  return (
    <Modal
      open={!!isPermissionId}
      onCancel={onCancel}
      width="70%"
      footer={false}
    >
      <Space direction="vertical" className="w-full">
        <Typography.Title level={1} className="!m-0">
          Permission Schemes
        </Typography.Title>
        <Typography.Title level={3} className="!m-0">
          {schema?.schemaName}
        </Typography.Title>
        <Typography.Text>{schema?.description}</Typography.Text>
        <Table
          rowKey="permissionId"
          className="shadow-custom"
          columns={columns}
          loading={isLoading}
          dataSource={schema?.rolePermissions}
          pagination={false}
        />
      </Space>
    </Modal>
  );
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
    width: "50%",
    render: (roles: ISchema["rolePermissions"][number]["roles"]) => (
      <ul>
        {roles.map((role) => (
          <li key={role.roleId}>{role.roleName}</li>
        ))}
      </ul>
    ),
  },
];

export default PermissionDetailModal;
