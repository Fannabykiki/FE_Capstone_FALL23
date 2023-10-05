import React, { useState } from "react";
import logo from "../../../assets/images/Devtask.png";
import "./LoginPage.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Input, Typography } from "antd";
import GoogleButton from "react-google-button";
import ReCAPTCHA from "react-google-recaptcha";
import { loginHandler } from "../domain/LoginDomain";

const { Text, Link } = Typography;

const LoginPage = () => {
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [form] = Form.useForm();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      const { username, password } = values;
      const userData = await loginHandler(username, password);

      if (userData) {
        window.location.href = "/";
      } else {
        console.error("Đăng nhập không thành công");
      }
    } catch (errorInfo) {
      console.error("Validate fields failed:", errorInfo);
    }
  };

  return (
    <div className="Login">
      <div className="Form-login">
        <div className="Logo">
          <img className="ImageLogo" src={logo} alt="Logo" />
        </div>
        <Form
          form={form}
          className="container"
          layout="vertical"
          onFinish={handleLogin}
        >
          <Form.Item
            name="username"
            rules={[
              {
                whitespace: true,
                required: true,
                message: "Username or Email is required",
              },
            ]}
            validateTrigger={["onBlur", "onChange"]}
            label={<b>Username or Email</b>}
          >
            <Input
              onChange={(e) => setUsername(e.target.value)}
              size="large"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<b>Password</b>}
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              size="large"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Checkbox>Remember Password</Checkbox>
            <Link style={{ float: "right" }} href="#">
              Forgot Your Password?
            </Link>
          </Form.Item>

          <Form.Item>
            <ReCAPTCHA
              className="btncapcha"
              onChange={(value) => setIsRecaptchaVerified(value)}
              style={{ justifyContent: "center" }}
              hl="en"
              sitekey={process.env.REACT_APP_SITE_KEY}
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={!isRecaptchaVerified}
              className="custombtn"
              block
              type="primary"
              onClick={handleLogin}
            >
              <Text className="customtxt">Sign in</Text>
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Text>Don't have an account yet?</Text>
            <Link href="/register">Register now</Link>
          </Form.Item>
        </Form>

        <Divider style={{ borderColor: "#ffffff", color: "#ffffff" }} plain>
          or
        </Divider>
        <div className="ButtonGoogle">
          <GoogleButton
            type="light"
            onClick={() => {
              console.log("Google button clicked");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
