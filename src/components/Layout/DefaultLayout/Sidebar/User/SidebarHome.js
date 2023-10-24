import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Menu, Button, Typography } from "antd";
import logoHeader from "../../../../../assets/images/LogoHeader.png";
import Avatar from "react-avatar";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Text } = Typography;

const SidebarUser = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ username: "" });

  const signOutHandler = () => {
    sessionStorage.clear();
    navigate("/logout");
  };

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

  return (
    <div className="sidebar-user-home">
      <Menu mode="vertical" theme="light">
        <div className="imgSidebar">
          <img src={logoHeader} alt="logoHeader" />
        </div>
        <Menu.Item key="overview" title="Overview">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              className="avatar"
              name={userInfo.username}
              square
              size="35"
              textSizeRatio={2}
            />
            <Text style={{ marginLeft: "15px" }}>
              {<b>{userInfo.username}</b>}
            </Text>
          </div>
        </Menu.Item>
      </Menu>
      <div className="sidebar-footer">
        <Button
          onClick={signOutHandler}
          size="middle"
          icon={<LogoutOutlined />}
          className="logout-button"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default SidebarUser;
