import React, { useEffect } from "react";
import { Button, Col, Form, Input, Radio, Row, message } from "antd";
import Avatar from "react-avatar";
import moment from "moment";

import { getUser, updateUser } from "../domains/UserProfileDomain";
import MyDatePicker from "../../../../components/DatePicker";
import "./UserProfile.css";

const options = [
  { label: "Male", value: 1 },
  { label: "Female", value: 0 },
];

const UserProfile = () => {
  const [form] = Form.useForm();

  const handleSave = (value) => {
    updateUser({ ...value, doB: value.doB?.toISOString() })
      .then((updatedData) => {
        // Cập nhật lại dữ liệu người dùng sau khi cập nhật thành công
        getUser(updatedData.userId)
          .then((data) => {
            form.setFieldsValue({ ...data, doB: moment(data.doB) });
            message.success("Update successful");
          })
          .catch((error) => {
            console.error("Lỗi khi tải lại thông tin người dùng:", error);
          });
        console.log("Thông tin người dùng đã được cập nhật:", updatedData);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      });
  };

  useEffect(() => {
    const userId = JSON.parse(decodeURIComponent(sessionStorage.userId));

    // Gọi API và cập nhật state userData
    getUser(userId)
      .then((data) => {
        form.setFieldsValue({ ...data, doB: moment(data.doB) });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      });
  }, [form]);

  return (
    <Form form={form} onFinish={handleSave} layout="vertical">
      {({ email }) => (
        <Row
          style={{
            padding: 20,
          }}
        >
          <Col span={6}>
            <Avatar name={email} round size="150" textSizeRatio={2} />
          </Col>
          <Col span={18}>
            <Form.Item name="fullname" label={<b>Full Name</b>}>
              <Input />
            </Form.Item>

            <Form.Item name="userName" label={<b>User Name</b>}>
              <Input />
            </Form.Item>

            <Form.Item name="email" label={<b>Email</b>}>
              <Input disabled />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label={<b>Phone Number</b>}
              rules={[
                {
                  validator: (rule, value) => {
                    if (
                      /^\(?0?([3|8|9]){1}\)?([0-9]{1})?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
                        value
                      )
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Phone number invalid");
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="address" label={<b>Address</b>}>
              <Input />
            </Form.Item>

            <Form.Item name="doB" label={<b>Date of Birth</b>}>
              <MyDatePicker
                format="DD/MM/YYYY"
                allowClear={false}
                disabledDate={(current) =>
                  current && moment(current) > moment().endOf("day")
                }
              />
            </Form.Item>

            <Form.Item name="gender" label={<b>Gender</b>}>
              <Radio.Group options={options} />
            </Form.Item>

            <div className="btnModal">
              <Button
                type="primary"
                htmlType="submit"
                className="btn-save"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default UserProfile;
