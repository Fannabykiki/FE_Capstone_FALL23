import React, { useState, useEffect } from "react";
import axios from "axios";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

import logo from "../../../assets/images/Devtask.png";

const { Text, Link } = Typography;

const CreateNewPassword = () => {
    const [form] = Form.useForm();
 
    const [email, setEmail] = useState("");
    const [resetPasswordStatus, setResetPasswordStatus] = useState(null);

    useEffect(() => {
        const link = window.location.href;
        const queryParams = link.split("?");
        const token = queryParams[1];
        const Email = decodeURIComponent(localStorage.email);

        setEmail(Email);

        const verifyResetPwd = async () => {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/authentication/forgot-password?email=${Email}&verifyToken=${token}`
                );
                setResetPasswordStatus(response);
                console.log(Email);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        verifyResetPwd();
    }, []);

    const handleForgotPassword = async () => {
        try {
            const values = await form.validateFields();
            const { newPwd, ConfirmnewPwd } = values;

            if (newPwd !== ConfirmnewPwd) {
                // Xử lý khi mật khẩu mới và xác nhận mật khẩu không khớp
                return;
            }

            const link = window.location.href;
            const queryParams = link.split("?");
            const token = queryParams[1];
            const email = decodeURIComponent(localStorage.email);

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/authentication/reset-password`,
                {
                    email,
                    token,
                    newPassword: newPwd,
                    confirmPassword: ConfirmnewPwd,
                }
            );

            // Xử lý khi reset mật khẩu thành công
            setResetPasswordStatus(response);

        } catch (error) {
            // Xử lý khi có lỗi xảy ra
            console.log("Error:", error);
        }
    };

    return (
        <div className="forgotpassword">
            <div className="Form-forgotpassword">
                <div className="Logo">
                    <img className="ImageLogo" src={logo} alt="Logo" />
                </div>
                <Form form={form} className="container" layout="vertical">
                    {resetPasswordStatus === 200 && (
                        <>
                            <Form.Item
                                label={<b>New Password</b>}
                                name="newPwd"
                                rules={[
                                    {
                                        whitespace: true,
                                        required: true,
                                        message: "Password is required",
                                    },
                                ]}
                                validateTrigger={["onBlur", "onChange"]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label={<b>Confirm New Password</b>}
                                name="ConfirmnewPwd"
                                rules={[
                                    {
                                        whitespace: true,
                                        required: true,
                                        message: "Password is required",
                                    },
                                ]}
                                validateTrigger={["onBlur", "onChange"]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </>
                    )}


                    <Form.Item>
                        <Button
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

export default CreateNewPassword;