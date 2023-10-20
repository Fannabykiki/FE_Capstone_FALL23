import React, { useState } from "react";
import "./ForgotPassword.css";
import logo from "../../../assets/images/Devtask.png";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { forgotpasswordHandler } from "../domain/ForgotPasswordDomain";

const { Text, Link } = Typography;

const ForgotPasswordPage = () => {
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");

  const validateEmail = (rule, value) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject("Email is not valid");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const values = await form.validateFields();
      const { email } = values;
      const userData = await forgotpasswordHandler(email);

      if (userData) {
        window.location.href = "/";
      } else {
        console.error("Xác thực không thành công");
      }
    } catch (errorInfo) {
      console.error("Validate fields failed:", errorInfo);
    }
  };

  return (
    <div className="forgotpassword">
      <div className="Form-forgotpassword">
        <div className="Logo">
          <img className="ImageLogo" src={logo} alt="Logo" />
        </div>
        <Form
          form={form}
          className="container"
          layout="vertical"
          onFinish={handleForgotPassword}
        >
          <Form.Item
            label={<b> Email </b>}
            name="email"
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
              onClick={handleForgotPassword}
            >
              <Text className="customtxt">Reset Password</Text>
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Text>Already have an account?</Text>
            <Link href="/login">Sign in</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
