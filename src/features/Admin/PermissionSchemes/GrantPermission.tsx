import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Col, Divider, Modal, Row, Select, Space, Typography } from "antd";
import { toast } from "react-toastify";

import { useAuthContext } from "@/context/Auth";
import { IAdminRoles } from "@/interfaces/role";
import { schemaApi } from "@/utils/api/schema";
import { ISchema } from "@/interfaces/schema";
import { roleApi } from "@/utils/api/role";

interface Props {
  isOpen: boolean;
  schema: ISchema | undefined;
  permission: ISchema["rolePermissions"][number] | undefined;
  handleClose: () => void;
}

const GrantPermission = ({
  isOpen,
  schema,
  permission,
  handleClose,
}: Props) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [role, setRole] = useState<string>();

  const { userInfo } = useAuthContext();

  const queryClient = useQueryClient();

  const { mutate: grantPermission, isLoading } = useMutation({
    mutationKey: [schemaApi.grantPermissionKey],
    mutationFn: schemaApi.grantPermission,
    onSuccess: async () => {
      await queryClient.refetchQueries([schemaApi.getAdminSchemaDetailKey]);
      toast.success("Grant permission successfully");
      handleClose();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Grant permission failed");
    },
  });

  const { data: roles } = useQuery<IAdminRoles[]>({
    queryKey: [roleApi.getAdminRolesKey, userInfo?.id],
    queryFn: ({ signal }) => roleApi.getAdminRoles(signal, {}),
    enabled: Boolean(userInfo),
  });

  const options = useMemo(
    () =>
      schema?.rolePermissions.map((role) => ({
        label: role.name,
        value: role.permissionId,
      })),
    [schema?.rolePermissions]
  );
  const handleSubmit = () => {
    if (!schema) {
      toast.error("Has an error, please try again");
      handleClose();
      return;
    } else if (!role) {
      toast.error("Please select role");
      return;
    } else if (!permissions.length) {
      toast.error("Please select at least 1 permission");
      return;
    }

    grantPermission({
      id: schema.schemaId,
      data: {
        schemaId: schema.schemaId,
        permissionIds: permissions,
        roleId: role,
      },
    });
  };

  useEffect(() => {
    setRole(undefined);
    if (permission) {
      setPermissions([permission.permissionId]);
    } else {
      setPermissions([]);
    }
  }, [permission]);

  return (
    <Modal
      title="Grant permission"
      open={isOpen}
      onCancel={handleClose}
      onOk={handleSubmit}
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Grant"
    >
      <Divider className="!m-0" />
      <Space direction="vertical" className="w-full my-5">
        <Row gutter={8}>
          <Col span={6} className="flex items-end justify-end">
            <Typography.Title level={5} className="!m-0 !text-[#5f5f5f]">
              Permission
            </Typography.Title>
          </Col>
          <Col span={18}>
            <Select
              mode="multiple"
              allowClear
              className="w-full"
              placeholder="Select permissions"
              value={permissions}
              onChange={setPermissions}
              options={options}
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={6} className="flex justify-end items-center">
            <Typography.Title level={5} className="!m-0 !text-[#5f5f5f]">
              Granted to
            </Typography.Title>
          </Col>
          <Col span={18}>
            <Select
              showSearch
              className="w-full"
              placeholder="Select a role"
              optionFilterProp="children"
              onChange={setRole}
              value={role}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={roles?.map((role) => ({
                label: role.role.roleName,
                value: role.role.roleId,
              }))}
            />
          </Col>
        </Row>
      </Space>
      <Divider className="!m-0" />
    </Modal>
  );
};

export default GrantPermission;
