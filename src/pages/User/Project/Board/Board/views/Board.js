import React from "react";
import "./Board.css";
import { LayoutOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Divider, Typography } from "antd";

const { Text } = Typography;

const Board = () => {
  return (
    <div>
      <div className="headerBoard">
        <div className="header-title">
          <LayoutOutlined />
          <Text className="txtTitle">DevTasker - Board</Text>
          <UsergroupAddOutlined
            style={{ fontSize: "20px", marginLeft: "20px" }}
          />
        </div>
        <div>icon</div>
      </div>
      <Divider className="divider-custom" />
      <div>Content</div>
    </div>
  );
};

export default Board;
