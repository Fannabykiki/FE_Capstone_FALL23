import React from "react";
import logo from "../../assets/images/Devtask.png";
import "./Logout.css";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { routes } from "../../navigations/routes";
import { useDispatch } from "react-redux";
import { logout } from "../../containers/app/slice";

const Logout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const goToLogin = () => {
    dispatch(logout());
    navigate(routes.Login.path);
  };
  return (
    <div className="Logout">
      <div className="FormLogout">
        <div className="Logo">
          <img className="ImageLogo" src={logo} alt="Logo" />
        </div>
        <Result
          status="success"
          title="You have been sign out"
          subTitle="Thank you !"
          extra={[
            <Button onClick={goToLogin} type="primary" key="console">
              Go to sign in
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default Logout;
