import React, { useState } from "react";
import "./RegisterPage.css";
import logo from "../../../assets/images/Devtask.png";
import { Button, Divider, Form, Input, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleButton from "react-google-button";
import { registerHandler } from "../domain/RegisterDomain";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const validateEmail = (rule, value) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject("Email is not valid");
    }
  };

  const handleRegister = async () => {
    try {
      const result = await registerHandler(email, password, confirmPassword);

      if (result) {
        message.success(
          "Registration successful. Please check your email to verify your account before logging in."
        );
        localStorage.setItem("email", JSON.stringify(email));

        navigate("/login");
      } else {
        message.error("Đăng ký thất bại, vui lòng kiểm tra lại thông tin.");
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };

  return (
    <div className="Register">
      <div className="FormRegister">
        <div className="Logo">
          <img className="ImageLogo" src={logo} alt="logo" />
        </div>

        <Form
          onFinish={handleRegister}
          form={form}
          className="container"
          layout="vertical"
        >
          <Form.Item
            name="email"
            label={<b>Email</b>}
            rules={[
              {
                whitespace: true,
                required: true,
                message: "Email is required",
              },
              {
                validator: validateEmail,
              },
            ]}
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input
              onChange={(e) => setEmail(e.target.value)}
              size="large"
              prefix={<MailOutlined />}
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
              {
                validator: (rule, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }
                  if (value.length < 6) {
                    return Promise.reject(
                      "Password must be at least 6 characters"
                    );
                  }
                  if (!/[A-Z]/.test(value)) {
                    return Promise.reject(
                      "Password must contain at least one uppercase letter"
                    );
                  }
                  if (!/[a-z]/.test(value)) {
                    return Promise.reject(
                      "Password must contain at least one lowercase letter"
                    );
                  }
                  if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) {
                    return Promise.reject(
                      "Password must contain at least one special character"
                    );
                  }
                  return Promise.resolve();
                },
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

          <Form.Item
            onChange={(e) => setconfirmPassword(e.target.value)}
            name="confirmPassword"
            label={<b>Confirm Password</b>}
            rules={[
              {
                required: true,
                message: "Confirm password is required",
              },
              {
                validator: (rule, value) => {
                  if (value === password) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Passwords do not match");
                  }
                },
              },
            ]}
            validateTrigger={["onBlur", "onChange"]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} />
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
              onClick={handleRegister}
            >
              <Text href="/verify-account" className="customtxt">
                Register
              </Text>
            </Button>
          </Form.Item>

          <Form.Item>
            <Text className="txtalert">
              By clicking Register or registering through a third party you
              accept the DevTasker Terms of Use and acknowledge the Privacy
              Policy and Cookie Policy
            </Text>
          </Form.Item>

          <Divider style={{ borderColor: "#737278", color: "#000000" }} plain>
            or
          </Divider>

          <Form.Item className="ButtonGoogle">
            <GoogleButton type="light" />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Text style={{ padding: "5px" }}>Already have an account?</Text>
            <Link href="/login">Sign in</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
