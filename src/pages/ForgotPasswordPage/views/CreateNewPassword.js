// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { MailOutlined } from "@ant-design/icons";
// import { Button, Form, Input, Typography } from "antd";
// import ReCAPTCHA from "react-google-recaptcha";

// import logo from "../../../assets/images/Devtask.png";

// const { Text, Link } = Typography;

// const CreateNewPassword = () => {
//     const [form] = Form.useForm();
//     const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
//     const [email, setEmail] = useState("");
//     const [resetPasswordStatus, setResetPasswordStatus] = useState(null);

//     useEffect(() => {
//         const link = window.location.href;
//         const queryParams = link.split("?");
//         const token = queryParams[1];
//         const decodedEmail = decodeURIComponent(localStorage.email);
//         const email = JSON.parse(decodedEmail);
//         setEmail(email);

//         const verifyResetPwd = async () => {
//             try {
//                 const response = await axios.post(
//                     `${process.env.REACT_APP_API_URL}/api/authentication/forgot-password?email=${email}&verifyToken=${token}`
//                 );
//                 setResetPasswordStatus(response);
//             } catch (error) {
//                 console.log("Error:", error);
//             }
//         };

//         verifyResetPwd();
//     }, []);

//     const handleForgotPassword = () => {
//         // Handle the logic for resetting the password
//     };

//     return (
//         <div className="forgotpassword">
//             <div className="Form-forgotpassword">
//                 <div className="Logo">
//                     <img className="ImageLogo" src={logo} alt="Logo" />
//                 </div>
//                 <Form form={form} className="container" layout="vertical">
//                     <Form.Item
//                         label={<b>Email</b>}
//                         name="email"
//                         rules={[
//                             {
//                                 whitespace: true,
//                                 required: true,
//                                 message: "Email is required",
//                             },
//                         ]}
//                         validateTrigger={["onBlur", "onChange"]}
//                     >
//                         <Input
//                             size="large"
//                             prefix={<MailOutlined />}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </Form.Item>

//                     <Form.Item>
//                         <ReCAPTCHA
//                             className="btncapcha"
//                             onChange={(value) => setIsRecaptchaVerified(value)}
//                             style={{ justifyContent: "center" }}
//                             hl="en"
//                             sitekey={process.env.REACT_APP_SITE_KEY}
//                         />
//                     </Form.Item>

//                     <Form.Item>
//                         <Button
//                             className="custombtn"
//                             block
//                             type="primary"
//                             onClick={handleForgotPassword}
//                             disabled={!isRecaptchaVerified}
//                         >
//                             <Text className="customtxt">Reset Password</Text>
//                         </Button>
//                     </Form.Item>

//                     <Form.Item style={{ textAlign: "center" }}>
//                         <Text>Already have an account?</Text>
//                         <Link href="/login">Sign in</Link>
//                     </Form.Item>
//                 </Form>
//             </div>
//         </div>
//     );
// };

// export default CreateNewPassword;