import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/utils/api/auth";
import { paths } from "@/routers/paths";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useErrorMessage from "@/hooks/useErrorMessage";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { errorInfo, setErrorInfo } = useErrorMessage();
  const initialValues = {
    email: "",
  };

  const { mutate: forgotPassword, isLoading } = useMutation({
    mutationFn: authApi.forgotPassword,
    mutationKey: [authApi.forgotPasswordKey],
    onSuccess: (_, email) => {
      toast.success(
        `A verification email has been sent to '${email}', please follow to change your password`
      );
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
        err.response?.data ||
          "Send email forgot password failed! Please try again later"
      );
    },
  });

  const onSubmit = async () => {
    const formValues = await form.validateFields();
    forgotPassword(formValues.email);
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input placeholder="Input your email" />
        </Form.Item>
        <Button
          type="primary"
          className="w-full"
          htmlType="submit"
          loading={isLoading}
        >
          Continue
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
