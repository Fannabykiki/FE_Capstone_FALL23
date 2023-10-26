import React from "react";
import Footer from "./Footer/Footer";
import HeaderHome from "./Header/HeaderHome/HeaderHome";
import HomePage from "../../../pages/HomePage/HomePage";

const DefaulLayout = () => {
  return (
    <div>
      <HeaderHome />

      <HomePage />

      <Footer />
    </div>
  );
};

export default DefaulLayout;
