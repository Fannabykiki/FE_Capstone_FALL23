import React from "react";
import "./RegisterPage.css";
import logoMail from "../../../assets/images/maillogo.png";

const VerifyMail = () => {
  return (
    <div className="Register">
      <div className="FormVerify">
        <div className="Logo">
          <img className="ImageLogo" src={logoMail} alt="logoMail" />
        </div>
      </div>
    </div>
  );
};

export default VerifyMail;
