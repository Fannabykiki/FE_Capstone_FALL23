import React, { useState, useEffect } from "react";
import "./HeaderUser.css";
import { Dropdown, Menu, Badge, Modal } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import UserProfile from "../../../../../pages/User/UserProfile/views/UserProfile";
import ChangePassword from "../../../../../pages/User/ChangePassword/views/ChangePassword";
import Avatar from "react-avatar";

const HeaderUser = () => {
  const notificationCount = 3; // Số lượng thông báo (thay đổi tùy ý)
  const [userInfo, setUserInfo] = useState({ username: "" });
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  useEffect(() => {
    getUserLogin(); // Gọi hàm để lấy thông tin người dùng
  }, []);

  const getUserLogin = async () => {
    const userId = JSON.parse(decodeURIComponent(sessionStorage.userId));
    console.log(userId);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/profile/${userId}`
      );
      console.log(response);

      // Sau khi nhận dữ liệu từ API, cập nhật state userInfo
      setUserInfo({
        username: response.data.userName,
      });
    } catch (error) {
      console.error("Lỗi khi gọi API: ", error);
    }
  };

  const showProfileModal = () => {
    setIsProfileModalVisible(true);
  };

  const showChangePasswordModal = () => {
    setIsChangePassword(true);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={showProfileModal}>
        Profile
      </Menu.Item>
      <Menu.Item key="changepassword" onClick={showChangePasswordModal}>
        Change Password
      </Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

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
          <span>{userInfo.username}</span>
        </div>
        <span style={{ marginRight: "20px" }}>|</span>
        <div style={{ marginRight: "20px" }}>
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div>
              <Avatar
                round
                name={userInfo.username}
                size="28"
                textSizeRatio={2}
              />
            </div>
          </Dropdown>
        </div>
      </div>

      <Modal
        style={{ top: 20 }}
        width={700}
        title="User Profile"
        open={isProfileModalVisible}
        onCancel={() => setIsProfileModalVisible(false)}
        footer={null}
      >
        <br />
        <UserProfile />
      </Modal>

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
    </div>
  );
};

export default HeaderUser;
