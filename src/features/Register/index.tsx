import { Button, Col, Form, Image, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/utils/api/auth";
import { paths } from "@/routers/paths";
import { useMutation } from "@tanstack/react-query";
import { classNames } from "@/utils/common";
import BrandFull from "@/assets/images/BrandFull.png";

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { mutate: register, isLoading } = useMutation({
    mutationFn: authApi.register,
    mutationKey: [authApi.registerKey],
    onSuccess: (resp) => {
      navigate(paths.login);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onSubmit = async () => {
    const formValues = await form.validateFields();

    const params = {
      ...initialValues,
      ...formValues,
    };

    delete params.confirmPassword;
    register(params);
  };

  return (
    <div className="register min-h-screen">
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
              },
            ]}
          >
            <Input type="password" />
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
            <Input type="password" />
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
