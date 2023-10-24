import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Switch,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import "./ViewUser.css";
import { getUserInfo } from "../domains/ViewUserDomain";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const options = [
  { label: "Male", value: 1 },
  { label: "Female", value: 0 },
];

const ViewUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: null,
    gender: 1, // Default to male
    status: 2, // Default to inactive
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserInfo(id);
        setUserData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div className="viewUser">
      <Form layout="vertical" className="formViewUser">
        <Typography className="title">User Information</Typography>
        <Row className="customRow" gutter={16}>
          <Col span={2}></Col>
          <Col className="col-left" span={7}>
            <Avatar
              name={userData?.userName}
              round
              size="200"
              textSizeRatio={2}
            />
            <Typography className="txtFullname">{userData.fullname}</Typography>
            <Typography className="txtUsername">
              @{userData.userName}
            </Typography>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Form.Item label={<b>Full Name</b>}>
              <Input value={userData.fullname} disabled />
            </Form.Item>

            <Form.Item label={<b>User Name</b>}>
              <Input value={userData?.userName} disabled />
            </Form.Item>

            <Form.Item label={<b>Email</b>}>
              <Input value={userData?.email} disabled />
            </Form.Item>

            <Form.Item label={<b>Phone Number</b>}>
              <Input value={userData?.phoneNumber} disabled />
            </Form.Item>

            <Form.Item label={<b>Address</b>}>
              <Input value={userData?.address} disabled />
            </Form.Item>

            <Form.Item label={<b>Date of Birth</b>}>
              <DatePicker
                value={moment(userData?.doB)}
                format={"DD/MM/YYYY"}
                disabled
              />
            </Form.Item>

            <Form.Item label={<b>Gender</b>}>
              <Radio.Group value={userData?.gender} options={options} />
            </Form.Item>

            <Form.Item label={<b>Status</b>}>
              <Switch options={options} />
            </Form.Item>
          </Col>
        </Row>
        <div className="btnModal">
          <Button onClick={() => navigate("/admin/user")} className="btn-close">
            Close
          </Button>
          <Button type="primary" className="btn-save">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ViewUser;
