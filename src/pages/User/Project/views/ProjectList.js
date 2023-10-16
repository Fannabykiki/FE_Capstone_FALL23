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
<<<<<<< HEAD

  }
=======
  },
>>>>>>> 842f7e659d5fa2ad540d9aeca058aa1413d8fe9f
];
const ProjectList = () => {

  return (
    <>
      <div>
        <TaskCreateProject></TaskCreateProject>
      </div>
      <br></br>
      <List
<<<<<<< HEAD
        grid={{
          gutter: 10,
          column: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            {/* <Card title={item.title}>Card content</Card> */}
            <CardProject ></CardProject>
=======
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <CardProject></CardProject>
>>>>>>> 842f7e659d5fa2ad540d9aeca058aa1413d8fe9f
          </List.Item>
        )}
      />
     
   
    
    </>
  );
};

export default ProjectList;