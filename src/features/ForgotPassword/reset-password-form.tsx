import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/utils/api/auth";
import { paths } from "@/routers/paths";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useErrorMessage from "@/hooks/useErrorMessage";
import { handleValidatePassword } from "@/utils/common";

interface Props {
  email: string;
  token: string;
}

export default function ResetPasswordForm({ email, token }: Props) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { errorInfo, setErrorInfo } = useErrorMessage();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: authApi.resetPassword,
    mutationKey: [authApi.resetPasswordKey],
    onSuccess: () => {
      toast.success(`Reset password succeed`);
      navigate(paths.login);
    },
    onError: (err: AxiosError<string>) => {
      console.error(err);
      if (err.response?.data) {
        setErrorInfo({
          isError: true,
          message: err.response.data,
        });
      }
      toast.error(
        err.response?.data || "Reset password failed! Please try again later"
      );
    },
  });

  const onSubmit = async () => {
    const formValues = await form.validateFields();
    const data = {
      email,
      token,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
    };
    resetPassword(data);
  };
  return (
    <>
      <Form
        className="w-full"
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        {errorInfo.isError && (
          <Typography.Paragraph className="text-center text-red-400 font-semibold">
            {errorInfo.message}
          </Typography.Paragraph>
        )}
        <Form.Item
          label="New Password"
          name="password"
          rules={[
            {
              required: true,
              validator: async (_, password) => {
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
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Password mismatch"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Button
          type="primary"
          className="w-full"
          htmlType="submit"
          loading={isLoading}
        >
          Reset password
        </Button>
        <Button
          className="float-right font-semibold"
          type="link"
          onClick={() => navigate(paths.login)}
        >
          Already have an account? Login now
        </Button>
      </Form>
    </>
  );
}
