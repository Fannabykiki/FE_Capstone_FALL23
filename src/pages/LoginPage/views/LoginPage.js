import React, { useState } from "react";
import logo from "../../../assets/images/Devtask.png";
import "./LoginPage.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Input, Typography } from "antd";
import GoogleButton from "react-google-button";
import ReCAPTCHA from "react-google-recaptcha";

const { Text, Link } = Typography;

const LoginPage = () => {
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  return (
    <div className="Login">
      <div className="Form-login">
        <div className="Logo">
          <img className="ImageLogo" src={logo} />
        </div>
        <Form className="container" layout="vertical">
          <Form.Item label={<b>Username or Email</b>}>
            <Input size="large" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item label={<b>Password</b>}>
            <Input.Password size="large" prefix={<LockOutlined />} />
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
            type="light" // can be light or dark
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
