import { useMutation } from "@tanstack/react-query";
import { Button, Form, Image, Input } from "antd";
import { AuthContext } from "@/context/Auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "@/utils/api/auth";
import { paths } from "@/routers/paths";
import { classNames } from "@/utils/common";
import BrandFull from "@/assets/images/BrandFull.png";

export default function Login() {
  const navigate = useNavigate();

  const { setAuthenticate } = useContext(AuthContext);

  const { mutate: login, isLoading } = useMutation({
    mutationFn: authApi.login,
    mutationKey: [authApi.loginKey],
    onSuccess: (data) => {
      const { token } = data;
      localStorage.setItem("token", token);
      setAuthenticate({ isAuthenticated: true, userInfo: null });
      navigate("/");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Login failed! Please try again later");
    },
  });

  const onFinish = (values: any) => {
    login(values);
  };

  return (
    <div className="login min-h-screen">
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
          initialValues={{ email: "", password: "" }}
          onFinish={onFinish}
        >
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
              <Button className="float-right font-semibold" type="link">
                Forgot password
              </Button>
            }
            name="password"
            rules={[{ required: true }]}
          >
            <Input type="password" />
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
