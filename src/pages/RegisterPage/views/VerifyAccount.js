import React, { useState, useEffect } from "react";
import { Space, Spin } from 'antd';
import "./RegisterPage.css";
import logo from "../../../assets/images/Devtask.png";
import { Form, Typography } from "antd";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const { Text, Link } = Typography;
const VerifyAccount = () => {
    const [verificationStatus, setVerificationStatus] = useState(null);




    useEffect(() => {

        const link = window.location.href;
        const queryParams = link.split('?');
        var tokenn = queryParams[1];
        const email = JSON.parse(decodeURIComponent(localStorage.email));
        console.log(email)
        const verifyToken = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/authentication/verify-user?email=${email}&verifyToken=${tokenn}`);

                setVerificationStatus(response.status);
                console.log(response);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };


        verifyToken();
    }, []);



    return (
        <div className="Register">
            <div className="FormRegister">
                <div className="Logo">
                    <img className="ImageLogo" src={logo} alt="Logo" />
                </div>
                <Form onFinish={null} className="container" layout="vertical">
                    <Form.Item style={{ textAlign: "center" }}>
                        {verificationStatus === 200 ? (
                            <>
                                <Text style={{ padding: "5px", fontSize: '30px', fontWeight: 'bold', fontFamily: "serif" }}>
                                    <h1>Tài khoản của mày đã được Verify</h1>
                                </Text>
                                <Link href="/login">
                                    <p>Sign in</p>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Text style={{ padding: "5px", fontSize: '30px', fontWeight: 'bold', fontFamily: "serif" }}>
                                    <p>Your account is verifying, wait a second...</p>
                                </Text>
                                <Space size="middle" >
                                    <Spin size="large" style={{
                                        fontSize: '100px' // increase font size
                                    }} />
                                </Space>
                            </>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default VerifyAccount;