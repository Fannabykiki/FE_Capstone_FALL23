import { Button, Form, Image, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/utils/api/auth";
import { paths } from "@/routers/paths";
import { useMutation } from "@tanstack/react-query";
import {
  classNames,
  handleValidatePassword,
  lowerCaseFirstLetter,
} from "@/utils/common";
import BrandFull from "@/assets/images/BrandFull.png";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import useErrorMessage from "@/hooks/useErrorMessage";

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { errorInfo, setErrorInfo } = useErrorMessage();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { mutate: register, isLoading } = useMutation({
    mutationFn: authApi.register,
    mutationKey: [authApi.registerKey],
    onSuccess: (_, variables) => {
      toast.success(
        `An email has been sent to '${variables.email}', please follow to verify your account`
      );
      navigate(paths.login);
    },
    onError: (err: AxiosError<any>) => {
      console.error(err);
      if (err.response?.data) {
        if (err.response.data.errors) {
          form.setFields(
            Object.entries(err.response.data.errors).map(([key, value]) => ({
              name: lowerCaseFirstLetter(key),
              errors: [value] as string[],
            }))
          );
        } else if (typeof err.response.data === "string") {
          setErrorInfo({
            isError: true,
            message: err.response.data,
          });
        }
      }
      toast.error(
        err.response?.data?.title ||
          err.response?.data ||
          "Register failed! Please try again later"
      );
    },
  });

  const onSubmit = async () => {
    const formValues = await form.validateFields();
    register(formValues);
  };

  return (
    <div className="auth min-h-screen">
      <div
        className={classNames(
          "w-96 rounded-md bg-neutral-50/75 flex flex-col items-center p-4",
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
      >
        <Image preview={false} src={BrandFull} />
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
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
            label="Confirm password"
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
            Register
          </Button>
          <Button
            className="float-right font-semibold"
            type="link"
            onClick={() => navigate(paths.login)}
          >
            Already have an account? Login now
          </Button>
        </Form>
      </div>
    </div>
  );
}
