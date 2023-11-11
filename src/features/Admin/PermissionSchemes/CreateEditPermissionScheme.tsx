import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import { toast } from "react-toastify";

import { IPermissionSchemes } from "@/interfaces/schema";
import { schemaApi } from "@/utils/api/schema";

interface Props {
  isOpen: boolean;
  permissionScheme: IPermissionSchemes | undefined;
  handleClose: () => void;
}

export interface IPermissionSchemeInputType {
  schemaName: string;
  description?: string;
}

const CreateEditPermissionScheme = ({
  isOpen,
  permissionScheme,
  handleClose,
}: Props) => {
  const [form] = Form.useForm<IPermissionSchemeInputType>();

  const queryClient = useQueryClient();

  const { mutate: createPermissionScheme, isLoading } = useMutation({
    mutationKey: [schemaApi.createPermissionSchemeKey],
    mutationFn: schemaApi.createPermissionScheme,
    onSuccess: async () => {
      await queryClient.refetchQueries([schemaApi.getAdminSchemasKey]);
      toast.success("Create permission scheme successfully");
      handleClose();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Create permission scheme failed");
    },
  });

  const { mutate: updatePermissionScheme, isLoading: isUpdating } = useMutation(
    {
      mutationKey: [schemaApi.updatePermissionSchemeKey],
      mutationFn: schemaApi.updatePermissionScheme,
      onSuccess: async () => {
        await queryClient.refetchQueries([schemaApi.getAdminSchemasKey]);
        toast.success("Update permission scheme successfully");
        handleClose();
      },
      onError: (err) => {
        console.error(err);
        toast.error("Update permission scheme failed");
      },
    }
  );

  const onSubmit = (values: IPermissionSchemeInputType) => {
    if (permissionScheme) {
      updatePermissionScheme({
        id: permissionScheme.schemaId,
        data: values,
      });
    } else {
      createPermissionScheme(values);
    }
  };

  const onCancel = () => {
    form.resetFields();
    handleClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    form.setFields([
      { name: "schemaName", value: permissionScheme?.schemaName },
      { name: "description", value: permissionScheme?.description },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, permissionScheme]);

  return (
    <Modal
      title={
        permissionScheme ? "Edit permission scheme" : "Create permission scheme"
      }
      open={isOpen}
      onCancel={onCancel}
      onOk={form.submit}
      okText={permissionScheme ? "Edit" : "Create"}
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
          name="schemaName"
          rules={[
            { required: true, message: "Permission scheme name is required" },
            { max: 64, message: "Permission scheme less than 64 characters" },
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

export default CreateEditPermissionScheme;
