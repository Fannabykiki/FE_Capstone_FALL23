import React from "react";
import CardProject from "./Conponents/CardProject";
import TaskCreateProject from "./Conponents/TaskCreateProject";
import { Layout, List } from 'antd';
import { Col, Divider, Row } from 'antd';
const style = {
  background: '#0092ff',
  padding: '8px 0',
}

const data = [
  {
  },
];
const ProjectList = () => {

  return (
    <>
      <div>
        <TaskCreateProject></TaskCreateProject>
      </div>
      <br></br>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <CardProject></CardProject>
          </List.Item>
        )}
      />
     
   
    
    </>
  );
};

export default ProjectList;