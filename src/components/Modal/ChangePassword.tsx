import { useAuthContext } from "@/context/Auth";
import { userApi } from "@/utils/api/user";
import { handleValidatePassword } from "@/utils/common";
import {
  REGEX_CHARACTER,
  REGEX_NUMBER,
  REGEX_SPECIAL_CHARACTER,
} from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import { RuleObject } from "antd/es/form";
import { toast } from "react-toastify";

interface Props {
  onCancel: VoidFunction;
}

export default function ChangePassword({ onCancel = () => {} }: Props) {
  const [form] = Form.useForm();

  const { userInfo } = useAuthContext();

  const initialValues = {
    email: userInfo?.email,
    token: localStorage?.token,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const { mutate: changePassword, isLoading } = useMutation(
    userApi.changePassword,
    {
      onSuccess: () => {
        toast.success("Change Password Successfully!");
        onCancel();
      },
    }
  );

  const onSubmit = async () => {
    try {
      const formValues = await form.validateFields();

      const data = {
        email: initialValues.email,
        token: initialValues.token,
        ...formValues,
      };

      changePassword(data);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <>
      <Modal
        open={true}
        title="Change Password"
        onCancel={onCancel}
        closeIcon={false}
        onOk={onSubmit}
        okButtonProps={{
          loading: isLoading,
        }}
        okText="Save"
      >
        <Form
          className="w-full"
          layout="vertical"
          form={form}
          initialValues={initialValues}
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                validator: (_, password) => handleValidatePassword(password),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Password mismatch"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
