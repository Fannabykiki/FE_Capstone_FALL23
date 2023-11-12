import { useMutation } from "@tanstack/react-query";
import { Button, Form, Image, Input, Typography } from "antd";
import { useAuthContext } from "@/context/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "@/utils/api/auth";
import { paths } from "@/routers/paths";
import { classNames, handleValidatePassword } from "@/utils/common";
import BrandFull from "@/assets/images/BrandFull.png";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IErrorInfoState } from "@/interfaces/shared/state";

export default function Login() {
  const navigate = useNavigate();
  const [errorInfo, setErrorInfo] = useState<IErrorInfoState>({
    isError: false,
    message: "",
  });
  const [form] = Form.useForm();
  const { setAuthenticate } = useAuthContext();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: authApi.login,
    mutationKey: [authApi.loginKey],
    onSuccess: (data) => {
      const { token, isAdmin } = data;
      localStorage.setItem("token", token);
      setAuthenticate({ isAuthenticated: true, userInfo: null });
      if (isAdmin) {
        navigate(paths.dashboard);
      } else {
        navigate(paths.user);
      }
    },
    onError: (err: AxiosError<any>) => {
      console.error(err);
      if (err.response?.data) {
        setErrorInfo({
          isError: true,
          message: err.response.data,
        });
      }
      toast.error(err.response?.data || "Login failed! Please try again later");
    },
  });

  const setErrorWithTimeout = (err: IErrorInfoState) => {
    setErrorInfo(err);

    return setTimeout(() => {
      setErrorInfo({
        isError: false,
        message: "",
      });
    }, 6000);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (errorInfo.isError) {
      timeoutId = setErrorWithTimeout(errorInfo);
      // Return a cleanup function to clear the timeout
    }
    return () => clearTimeout(timeoutId);
  }, [errorInfo]);

  const onFinish = (values: any) => {
    login(values);
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
          initialValues={{ email: "", password: "" }}
          onFinish={onFinish}
        >
          {errorInfo.isError && (
            <Typography.Paragraph className="text-center text-red-400 font-semibold">
              {errorInfo.message}
            </Typography.Paragraph>
          )}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            extra={
              <Button
                className="float-right font-semibold"
                type="link"
                onClick={() => navigate(paths.forgotPassword)}
              >
                Forgot password
              </Button>
            }
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
          <Button
            type="primary"
            className="w-full"
            htmlType="submit"
            loading={isLoading}
          >
            Login
          </Button>
          <Button
            className="float-right font-semibold"
            type="link"
            onClick={() => navigate(paths.register)}
          >
            Do not have an account? Register now
          </Button>
        </Form>
      </div>
    </div>
  );
}
