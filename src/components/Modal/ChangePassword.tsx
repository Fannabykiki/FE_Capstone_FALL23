import { useAuthContext } from "@/context/Auth";
import { userApi } from "@/utils/api/user";
import { handleValidatePassword } from "@/utils/common";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import { AxiosError } from "axios";
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
      onError: (err: AxiosError<any>) => {
        console.error(err);
        toast.error(err.response?.data || "Change password failed");
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
      <Modal maskClosable={false}
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
                validator: async (_, password) => {
                  const currentPassword = form.getFieldValue("currentPassword");
                  if (password === currentPassword) {
                    return Promise.reject(
                      "New password must be different from the Current Password"
                    );
                  }
                  return (
                    handleValidatePassword(password) ||
                    Promise.reject("Invalid password")
                  );
                },
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
