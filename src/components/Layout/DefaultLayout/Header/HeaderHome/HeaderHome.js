import React from "react";
import { Link } from "react-router-dom";
import logoHeader from "../../../../../assets/images/LogoHeader.png";
import "./HeaderHome.css";
import { Button, Typography } from "antd";

const { Text } = Typography;

const HeaderHome = () => {
  return (
    <div className="HeaderHome">
      <div className="logoHeader">
        <img src={logoHeader} alt="logoHeader" />
      </div>
      <div className="buttonHeader">
        <Link to="/login">
          <Button className="btnLogin">
            <Text className="txt">Sign in</Text>
          </Button>
        </Link>

        <Link to="/register">
          <Button className="btnRegister">
            <Text className="txt">Register</Text>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderHome;
