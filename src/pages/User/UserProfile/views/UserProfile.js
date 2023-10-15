import { Button, Col, Form, Input, Radio, Row, Spin, Switch } from "antd";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import "./UserProfile.css";
import { getUser } from "../domains/UserProfileDomain";

const options = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
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
              <Input value={userData?.username} />
            </Form.Item>

            <Form.Item label={<b>Email</b>}>
              <Input value={userData?.email} />
            </Form.Item>

            <Form.Item label={<b>Phone Number</b>}>
              <Input value={userData?.email} />
            </Form.Item>

            <Form.Item label={<b>Address</b>}>
              <Input value={userData?.email} />
            </Form.Item>

            <Form.Item label={<b>Gender</b>}>
              <Radio.Group value={userData?.gender} options={options} />
            </Form.Item>

            <Form.Item label={<b>Status</b>}>
              <Switch
                // value={userData?.status}
                checkedChildren="Active"
                unCheckedChildren="Deactive"
                defaultChecked={
                  userData ? parseInt(userData.status) === 0 : true
                }
              />
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
