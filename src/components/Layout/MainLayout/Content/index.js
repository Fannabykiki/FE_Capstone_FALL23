import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

const LayoutContent = ({ children }) => {
  return (
    <div>
      <Scrollbars>{children}</Scrollbars>
    </div>
  );
};

export default LayoutContent;
