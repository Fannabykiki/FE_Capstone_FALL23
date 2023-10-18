import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Spin,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import "./UserProfile.css";
import { getUser } from "../domains/UserProfileDomain";
import moment from "moment/moment";

const options = [
  { label: "Male", value: 1 },
  { label: "Female", value: 0 },
];

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = JSON.parse(decodeURIComponent(sessionStorage.userId));

    setLoading(true);

    // Gọi API và cập nhật state userData
    getUser(userId)
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      });
  }, []);

  return (
    <>
      <Row></Row>
      <Row>
        <Col span={6}>
          <Avatar name={userData?.email} round size="150" textSizeRatio={2} />
        </Col>
        <Col span={1}></Col>
        <Col span={17}>
          <Form layout="vertical" loading={loading && <Spin size="large" />}>
            <Form.Item label={<b>Full Name</b>}>
              <Input value={userData?.fullname} />
            </Form.Item>

            <Form.Item label={<b>User Name</b>}>
              <Input value={userData?.userName} />
            </Form.Item>

            <Form.Item label={<b>Email</b>}>
              <Input value={userData?.email} disabled />
            </Form.Item>

            <Form.Item label={<b>Phone Number</b>}>
              <Input value={userData?.phoneNumber} />
            </Form.Item>

            <Form.Item label={<b>Address</b>}>
              <Input value={userData?.address} />
            </Form.Item>

            <Form.Item label={<b>Date of Birth</b>}>
              <DatePicker
                value={moment(userData?.doB)}
                format={"DD/MM/YYYY"}
                allowClear={false}
              />
            </Form.Item>

            <Form.Item label={<b>Gender</b>}>
              <Radio.Group value={userData?.gender} options={options} />
            </Form.Item>

            <div className="btnModal">
              <Button className="btn-close">Close</Button>
              <Button type="primary" className="btn-save">
                Save
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default UserProfile;
