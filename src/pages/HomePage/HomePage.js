import React from "react";
import "./HomePage.css";
import content1 from "../../assets/images/Home1.png";

const HomePage = () => {
  return (
    <div className="HomePage">
      <div>
        <div>
          <img className="img" src={content1} alt="content1" />
        </div>
      </div>

      <div>
        <div>
          <img className="img" src={content1} alt="content1" />
        </div>
      </div>

      <div>
        <div>
          <img className="img" src={content1} alt="content1" />
        </div>
      </div>

      <div>
        <div>
          <img className="img" src={content1} alt="content1" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
