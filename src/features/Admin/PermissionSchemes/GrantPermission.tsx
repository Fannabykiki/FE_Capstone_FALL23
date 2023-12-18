import { useEffect, useMemo, useState } from "react";
import { Col, Divider, Modal, Row, Select, Space, Typography } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { IAdminGrantPermissionList } from "@/interfaces/role";
import { schemaApi } from "@/utils/api/schema";
import { ISchema } from "@/interfaces/schema";

interface Props {
  isOpen: boolean;
  schema: ISchema | undefined;
  permission: ISchema["rolePermissions"][number] | undefined;
  projectId?: string;
  handleClose: () => void;
}

const GrantPermission = ({
  isOpen,
  schema,
  projectId,
  permission,
  handleClose,
}: Props) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [role, setRole] = useState<string>();

  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<IAdminGrantPermissionList[]>([
    "grant-list",
    { id: schema?.schemaId },
  ]);

  const { mutate: grantPermission, isLoading } = useMutation({
    mutationKey: [schemaApi.grantPermissionKey],
    mutationFn: schemaApi.grantPermission,
    onSuccess: async (data) => {
      if (projectId) {
        queryClient.setQueryData([schemaApi.getAdminSchemaDetailKey], data);
        queryClient.refetchQueries([schemaApi.getProjectSchemaByProjectIdKey]);
      } else {
        await queryClient.refetchQueries([schemaApi.getAdminSchemaDetailKey]);
      }

      toast.success("Grant permission successfully");
      handleClose();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data || "Grant permission failed");
    },
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
      schemaId: schema.schemaId,
      permissionIds: permissions,
      roleId: role,
      projectId,
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
      maskClosable={false}
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
              options={data?.map((role) => ({
                label: role.roleName,
                value: role.roleId,
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
