import { useMutation } from "@tanstack/react-query";
import { Button, Form, Image, Input, Typography } from "antd";
import { useAuthContext } from "@/context/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "@/utils/api/auth";
import { paths } from "@/routers/paths";
import { classNames, handleValidatePassword } from "@/utils/common";
import BrandFull from "@/assets/images/BrandFull.png";
import { AxiosError } from "axios";
import useErrorMessage from "@/hooks/useErrorMessage";
import { CLIENT_ID } from "@/utils/constants";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  CredentialResponse,
} from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();
  const { errorInfo, setErrorInfo } = useErrorMessage();
  const [form] = Form.useForm();
  const { setAuthenticate } = useAuthContext();

  const location = useLocation();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: authApi.login,
    mutationKey: [authApi.loginKey],
    onSuccess: (data) => {
      const { token, isAdmin } = data;
      localStorage.setItem("token", token);
      setAuthenticate({ isAuthenticated: true, userInfo: null });
      navigate({
        pathname:
          location.state?.from || (isAdmin ? paths.admin.index : paths.user),
        search: location.state?.search,
      });
    },
    onError: (err: AxiosError<any>) => {
      console.error(err);
      if (err.response?.data) {
        setErrorInfo({
          isError: true,
          message: err.response.data,
        });
      }
      toast.error(
        err.response?.data?.title ||
          err.response?.data ||
          "Login failed! Please try again later"
      );
    },
  });

  const { mutate: loginWithGG, isLoading: isLoginWithGG } = useMutation({
    mutationFn: authApi.loginWithGG,
    mutationKey: [authApi.loginWithGGKey],
    onSuccess: (data) => {
      const { token, isAdmin } = data;
      localStorage.setItem("token", token);
      setAuthenticate({ isAuthenticated: true, userInfo: null });
      navigate({
        pathname:
          location.state?.from || (isAdmin ? paths.admin.index : paths.user),
        search: location.state?.search,
      });
    },
    onError: (err: AxiosError<any>) => {
      if (err.response?.data) {
        setErrorInfo({
          isError: true,
          message: err.response.data,
        });
      }
      toast.error(
        err.response?.data?.title ||
          err.response?.data ||
          "Login with Google failed! Please try again later"
      );
    },
  });

  const onFinish = (values: any) => {
    login(values);
  };

  const onSuccess = ({ credential }: CredentialResponse) => {
    if (!credential) return;

    loginWithGG({ code: credential });
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
            loading={isLoading || isLoginWithGG}
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
        <div className="mt-5">
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
              onSuccess={onSuccess}
              onError={() =>
                toast.error("Login with Google failed! Please try again later")
              }
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}
