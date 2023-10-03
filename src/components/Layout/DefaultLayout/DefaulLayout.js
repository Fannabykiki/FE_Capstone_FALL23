import React from "react";
import Footer from "./Footer/Footer";

const DefaulLayout = ({ chidlren }) => {
  return (
    <div>
      <div className="container">
        <div className="content">{chidlren}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaulLayout;
