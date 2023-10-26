import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import "./UserProfile.css";
import { getUser, updateUser } from "../domains/UserProfileDomain";
import moment from "moment/moment";

const options = [
  { label: "Male", value: 1 },
  { label: "Female", value: 0 },
];

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isDataChanged, setDataChanged] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  useEffect(() => {
    const userId = JSON.parse(decodeURIComponent(sessionStorage.userId));

    // Gọi API và cập nhật state userData
    getUser(userId)
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      });
  }, []);

  const handleSave = () => {
    updateUser(userData)
      .then((updatedData) => {
        // Cập nhật lại dữ liệu người dùng sau khi cập nhật thành công
        getUser(updatedData.userId)
          .then((data) => {
            setUserData(data);
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

  const handleDobChange = (date, dateString) => {
    setUserData({ ...userData, doB: dateString });
    setDataChanged(true);
  };

  const handleGenderChange = (e) => {
    setUserData({ ...userData, gender: e.target.value });
    setDataChanged(true);
  };

  const showConfirmModal = () => {
    setConfirmModalVisible(true);
  };

  const handleClose = () => {
    if (isDataChanged) {
      showConfirmModal();
    } else {
      // Đóng modal mà không cần thông báo.
      // Ví dụ: thêm hàm đóng modal của bạn ở đây.
    }
  };

  const handleConfirmClose = () => {
    // Đóng modal xác nhận
    setConfirmModalVisible(false);

    // Thực hiện hành động đóng modal của bạn ở đây, ví dụ:
    // closeModal();
  };

  const handleCancelClose = () => {
    // Đóng modal xác nhận
    setConfirmModalVisible(false);
  };

  return (
    <>
      <Modal
        title="Xác nhận đóng modal"
        visible={isConfirmModalVisible}
        onOk={handleConfirmClose}
        onCancel={handleCancelClose}
      >
        Có thay đổi chưa được lưu. Bạn có chắc muốn đóng không?
      </Modal>

      <Row></Row>
      <Row>
        <Col span={6}>
          <Avatar name={userData?.email} round size="150" textSizeRatio={2} />
        </Col>
        <Col span={1}></Col>
        <Col span={17}>
          <Form layout="vertical">
            <Form.Item label={<b>Full Name</b>}>
              <Input
                value={userData?.fullname}
                onChange={(e) =>
                  setUserData({ ...userData, fullname: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label={<b>User Name</b>}>
              <Input
                value={userData?.userName}
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label={<b>Email</b>}>
              <Input value={userData?.email} disabled />
            </Form.Item>

            <Form.Item label={<b>Phone Number</b>}>
              <Input
                value={userData?.phoneNumber}
                onChange={(e) =>
                  setUserData({ ...userData, phoneNumber: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label={<b>Address</b>}>
              <Input
                value={userData?.address}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label={<b>Date of Birth</b>}>
              <DatePicker
                value={moment(userData?.doB)}
                format={"DD/MM/YYYY"}
                allowClear={false}
                onChange={handleDobChange}
              />
            </Form.Item>

            <Form.Item label={<b>Gender</b>}>
              <Radio.Group
                value={userData?.gender}
                options={options}
                onChange={handleGenderChange}
              />
            </Form.Item>

            <div className="btnModal">
              <Button className="btn-close" onClick={handleClose}>
                Close
              </Button>
              <Button type="primary" className="btn-save" onClick={handleSave}>
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
