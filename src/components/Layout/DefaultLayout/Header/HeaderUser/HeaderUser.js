import React, { useState, useEffect } from "react";
import "./HeaderUser.css";
import {
  Dropdown,
  Menu,
  Badge,
  Modal,
  Row,
  Col,
  Form,
  Input,
  message,
  DatePicker,
  Radio,
  Button,
} from "antd";
import { BellOutlined } from "@ant-design/icons";
import ChangePassword from "../../../../../pages/User/ChangePassword/views/ChangePassword";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../HeaderUser/HeaderDomain";
import moment from "moment";
import "moment/locale/vi";

const options = [
  { label: "Male", value: 1 },
  { label: "Female", value: 0 },
];

const HeaderUser = () => {
  const notificationCount = 3; // Số lượng thông báo (thay đổi tùy ý)
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null);
  const [isDataChanged, setDataChanged] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [tempUserData, setTempUserData] = useState(null);

  const signOutHandler = () => {
    sessionStorage.clear();
    navigate("/logout");
  };

  //---------Get User Info---------//
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const userId = JSON.parse(decodeURIComponent(sessionStorage.userId));
    getUser(userId)
      .then((data) => {
        data.doB = moment(data.doB);
        setUserData(data);
        console.log(moment(data.doB));
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      });
  };

  //---------Update User Info---------//
  const handleSave = () => {
    updateUser(userData)
      .then((updatedData) => {
        getUser(updatedData.userId)
          .then((data) => {
            setUserData(data);
            setIsSaved(true);
            setTempUserData({ ...data });
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

  //----------Modal User Profile----------//
  const showProfileModal = () => {
    if (userData) {
      setDataChanged(false);
      setTempUserData({ ...userData });
      form.setFieldsValue(userData);
    }
    setIsProfileModalVisible(true);
  };

  const showConfirmModal = () => {
    setConfirmModalVisible(true);
  };

  const handleClose = () => {
    if (isDataChanged && !isSaved) {
      showConfirmModal();
    } else {
      setIsProfileModalVisible(false);
    }
  };

  const handleConfirmClose = () => {
    if (!isSaved) {
      setIsProfileModalVisible(false);
      setConfirmModalVisible(false);
      // Khôi phục dữ liệu từ dữ liệu tạm thời
      if (tempUserData) {
        form.setFieldsValue(tempUserData);
        setUserData(tempUserData);
      }
    } else {
      setIsProfileModalVisible(false);
    }
  };

  const handleCancelClose = () => {
    setConfirmModalVisible(false);
  };

  //----------Modal Change Password ----------//
  const showChangePasswordModal = () => {
    setIsChangePassword(true);
  };

  //---------Change Input User Profile---------//
  const handleFullNameChange = (e) => {
    setUserData({ ...userData, fullname: e.target.value });
    setDataChanged(true);
  };

  const handleUserNameChange = (e) => {
    setUserData({ ...userData, userName: e.target.value });
    setDataChanged(true);
  };

  const handlePhoneNumberChange = (e) => {
    setUserData({ ...userData, phoneNumber: e.target.value });
    setDataChanged(true);
  };

  const handleAddressChange = (e) => {
    setUserData({ ...userData, address: e.target.value });
    setDataChanged(true);
  };

  const handleDobChange = (date, dateString) => {
    const isoDateString = moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD");
    setUserData({ ...userData, doB: isoDateString });
    setDataChanged(true);
  };

  const handleGenderChange = (e) => {
    setUserData({ ...userData, gender: e.target.value });
    setDataChanged(true);
  };

  //----------Change Input Reset Password----------//

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={showProfileModal}>
        Profile
      </Menu.Item>
      <Menu.Item key="changepassword" onClick={showChangePasswordModal}>
        Change Password
      </Menu.Item>
      <Menu.Item key="logout" onClick={signOutHandler}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const initialValues = {
    fullname: userData?.fullname,
    userName: userData?.userName,
    email: userData?.email,
    phoneNumber: userData?.phoneNumber,
    address: userData?.address,
    doB: moment(userData?.doB, "YYYY-MM-DD"), // Định dạng lại ngày tháng
    gender: userData?.gender,
  };

  return (
    <div className="HeaderUser">
      <div className="ContentHeader">
        <div style={{ marginRight: "20px" }}>
          <Badge count={notificationCount}>
            <BellOutlined style={{ fontSize: "20px" }} />
          </Badge>
        </div>
        <span style={{ marginRight: "20px" }}>|</span>
        <div style={{ marginRight: "20px" }}>
          <span>{userData?.userName}</span>
        </div>
        <span style={{ marginRight: "20px" }}>|</span>
        <div style={{ marginRight: "20px" }}>
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div>
              <Avatar
                round
                name={userData?.userName}
                size="28"
                textSizeRatio={2}
              />
            </div>
          </Dropdown>
        </div>
      </div>

      {/* User Profile */}
      <Modal
        style={{ top: 20 }}
        width={700}
        title="User Profile"
        open={isProfileModalVisible}
        onCancel={handleClose}
        footer={
          <div className="btnModal">
            <Button className="btn-close" onClick={handleClose}>
              Close
            </Button>
            <Button type="primary" className="btn-save" onClick={handleSave}>
              Save
            </Button>
          </div>
        }
      >
        <br />
        <Row></Row>
        <Row>
          <Col span={6}>
            <Avatar name={userData?.email} round size="150" textSizeRatio={2} />
          </Col>
          <Col span={1}></Col>
          <Col span={17}>
            <Form layout="vertical" form={form} initialValues={initialValues}>
              <Form.Item name="fullname" label={<b>Full Name</b>}>
                <Input onChange={handleFullNameChange} />
              </Form.Item>

              <Form.Item name="userName" label={<b>User Name</b>}>
                <Input onChange={handleUserNameChange} />
              </Form.Item>

              <Form.Item name="email" label={<b>Email</b>}>
                <Input disabled />
              </Form.Item>

              <Form.Item
                label={<b>Phone Number</b>}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Phone number should only contain digits!",
                  },
                ]}
              >
                <Input onChange={handlePhoneNumberChange} />
              </Form.Item>

              <Form.Item name="address" label={<b>Address</b>}>
                <Input onChange={handleAddressChange} />
              </Form.Item>

              <Form.Item name="doB" label={<b>Date of Birth</b>}>
                <DatePicker
                  format={"DD/MM/YYYY"}
                  allowClear={false}
                  onChange={handleDobChange}
                />
              </Form.Item>

              <Form.Item name="gender" label={<b>Gender</b>}>
                <Radio.Group options={options} onChange={handleGenderChange} />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>

      {/* Change Password */}
      <Modal
        style={{ top: 20 }}
        title="Change Password"
        open={isChangePassword}
        onCancel={() => setIsChangePassword(false)}
        footer={null}
      >
        <br />
        <ChangePassword />
      </Modal>

      <Modal
        title="Xác nhận đóng modal"
        visible={isConfirmModalVisible}
        onOk={handleConfirmClose}
        onCancel={handleCancelClose}
      >
        Có thay đổi chưa được lưu. Bạn có chắc muốn đóng không?
      </Modal>
    </div>
  );
};

export default HeaderUser;
