import { Button, Form, Image, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/utils/api/auth";
import { paths } from "@/routers/paths";
import { useMutation } from "@tanstack/react-query";
import { classNames } from "@/utils/common";
import BrandFull from "@/assets/images/BrandFull.png";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IFormError } from "@/interfaces/shared/common";
import {
  REGEX_CHARACTER,
  REGEX_NUMBER,
  REGEX_SPECIAL_CHARACTER,
} from "@/utils/constants";
import { RuleObject } from "antd/es/form";

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleValidatePassword = async (
    _: RuleObject,
    password: string,
    callback: (error?: string | undefined) => void
  ) => {
    switch (true) {
      case password.length < 8:
        callback("Password must be equal or longer than 8 characters");
        break;
      case !REGEX_NUMBER.test(password):
        callback("Password must have atleast one number");
        break;
      case !REGEX_SPECIAL_CHARACTER.test(password):
        callback("Password must have atleast one special character");
        break;
      case !REGEX_CHARACTER.test(password):
        callback(
          "Password must have atleast one upper and lower case character"
        );
        break;
      default:
        break;
    }
  };

  const { mutate: register, isLoading } = useMutation({
    mutationFn: authApi.register,
    mutationKey: [authApi.registerKey],
    onSuccess: (data) => {
      toast.success(
        "Create new account succeed! Now you can login into our system"
      );
      navigate(paths.login);
    },
    onError: (err: AxiosError<IFormError>) => {
      console.error(err);
      if (err.response?.data?.errors) {
      }
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
                validator: handleValidatePassword,
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
