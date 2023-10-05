import React, { useState } from "react";
import "./RegisterPage.css";
import logo from "../../../assets/images/Devtask.png";
import { Button, Divider, Form, Input, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleButton from "react-google-button";

const { Text, Link } = Typography;

const RegisterPage = () => {
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  return (
    <div className="Register">
      <div className="FormRegister">
        <div className="Logo">
          <img className="ImageLogo" src={logo} />
        </div>

        <Form className="container" layout="vertical">
          <Form.Item label={<b>Username</b>}>
            <Input size="large" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item label={<b>Email</b>}>
            <Input size="large" prefix={<MailOutlined />} />
            <Text className="txtalert">We recommend a work email address.</Text>
          </Form.Item>

          <Form.Item label={<b>Password</b>}>
            <Input.Password size="large" prefix={<LockOutlined />} />
            <Text className="txtalert">Minimum length is 8 characters.</Text>
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
              <Text className="customtxt">Register</Text>
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
