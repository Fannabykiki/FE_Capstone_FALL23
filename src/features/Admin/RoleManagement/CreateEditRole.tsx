import { useEffect } from "react";
import { Form, Input, Modal } from "antd";

interface Props {
  isOpen: boolean;
  roleEdit?: RoleInputType;
  handleClose: () => void;
}

export interface RoleInputType {
  name: string;
  description?: string;
}

const CreateEditRole = ({ isOpen, roleEdit, handleClose }: Props) => {
  const [form] = Form.useForm<RoleInputType>();

  const onSubmit = (values: RoleInputType) => {
    console.log(values);
  };

  const onCancel = () => {
    form.resetFields();
    handleClose();
  };

  useEffect(() => {
    if (roleEdit) {
      form.setFields([
        { name: "name", value: roleEdit.name },
        { name: "description", value: roleEdit.description },
      ]);
    }
  }, [form, roleEdit]);

  return (
    <Modal
      title="Create role"
      open={isOpen}
      onCancel={onCancel}
      onOk={form.submit}
    >
      <Form
        className="w-full"
        layout="vertical"
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Role name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEditRole;
