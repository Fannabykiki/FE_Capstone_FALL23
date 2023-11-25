import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import { toast } from "react-toastify";

import { IAdminRoles } from "@/interfaces/role";
import { roleApi } from "@/utils/api/role";

interface Props {
  isOpen: boolean;
  roleEdit?: IAdminRoles;
  handleClose: () => void;
}

export interface RoleInputType {
  roleId: string;
  roleName: string;
  description?: string;
}

const CreateEditRole = ({ isOpen, roleEdit, handleClose }: Props) => {
  const [form] = Form.useForm<RoleInputType>();

  const queryClient = useQueryClient();

  const { mutate: createRole, isLoading } = useMutation({
    mutationFn: roleApi.createRole,
    mutationKey: [roleApi.createRoleKey],
    onSuccess: async () => {
      await queryClient.refetchQueries([roleApi.getAdminRolesKey]);
      toast.success("Create role successfully");
      handleClose();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Create role failed");
    },
  });

  const { mutate: updateRole, isLoading: isUpdating } = useMutation({
    mutationFn: roleApi.updateRole,
    mutationKey: [roleApi.updateRoleKey],
    onSuccess: async () => {
      await queryClient.refetchQueries([roleApi.getAdminRolesKey]);
      toast.success("Update role successfully");
      handleClose();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Update role failed");
    },
  });

  const onSubmit = (values: RoleInputType) => {
    if (roleEdit) {
      updateRole({ ...values, roleId: roleEdit.roleId });
    } else {
      createRole(values);
    }
  };

  const onCancel = () => {
    form.resetFields();
    handleClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    form.setFields([
      { name: "roleName", value: roleEdit?.roleName },
      { name: "description", value: roleEdit?.description },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, roleEdit]);

  return (
    <Modal
      title={roleEdit ? "Edit role" : "Create role"}
      open={isOpen}
      onCancel={onCancel}
      onOk={form.submit}
      okText={roleEdit ? "Edit" : "Create"}
      okButtonProps={{
        loading: isLoading || isUpdating,
      }}
    >
      <Form
        className="w-full"
        layout="vertical"
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Name"
          name="roleName"
          rules={[
            { required: true, message: "Role name is required" },
            { max: 64, message: "Role name less than 64 characters" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { max: 500, message: "Description less than 500 characters" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEditRole;
