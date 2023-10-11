import React, { useState, useEffect } from "react";
import logo from "../../../assets/images/Devtask.png";
import "./LoginPage.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Input, Typography } from "antd";
import GoogleButton from "react-google-button";
import ReCAPTCHA from "react-google-recaptcha";
import { loginHandler, loginGoogle } from "../domain/LoginDomain";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = (rule, value) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject("Email is not valid");
    }
  };

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      const { email, password } = values;
      const userData = await loginHandler(email, password);
      if (userData) {
        if (userData.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/user");
        }
        if (rememberMe) {
          localStorage.setItem("rememberedPassword", password);
        }
        console.log(userData);
      } else {
        console.error("Đăng nhập không thành công");
      }
    } catch (errorInfo) {
      console.error("Validate fields failed:", errorInfo);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      // Không cần gọi form.validateFields() ở đây
      const userData = await loginGoogle();
      if (userData) {
        // Kiểm tra giá trị isAdmin trong userData
        if (userData.isAdmin) {
          // Nếu là admin, chuyển hướng đến trang admin
          navigate("/admin");
        } else {
          // Nếu không phải admin, chuyển hướng đến trang user
          navigate("/user");
        }

        // Log thông tin tài khoản
        console.log(userData);
      } else {
        console.error("Đăng nhập không thành công");
      }
    } catch (errorInfo) {
      console.error("Đăng nhập bằng Google không thành công:", errorInfo);
    }
  };

  useEffect(() => {
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedPassword && rememberMe) {
      setPassword(savedPassword);
    }
  }, [rememberMe]);

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
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
            name="email"
            rules={[
              {
                whitespace: true,
                required: true,
                message: "Email is required",
              },
              {
                validator: validateEmail, // Sử dụng hàm validateEmail
              },
            ]}
            validateTrigger={["onBlur", "onChange"]}
            label={<b>Email</b>}
          >
            <Input
              onChange={(e) => setEmail(e.target.value)}
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
              {
                validator: (rule, value) => {
                  if (!value) {
                    return Promise.resolve(); // Không kiểm tra nếu trường rỗng
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

          <Form.Item>
            <Checkbox checked={rememberMe} onChange={handleRememberMeChange}>
              Remember Password
            </Checkbox>
            <Link style={{ float: "right" }} href="/forgot-password">
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
          <GoogleButton type="light" onClick={handleLoginGoogle} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
