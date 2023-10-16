import React from "react";
import CardProject from "./Conponents/CardProject";
import TaskCreateProject from "./Conponents/TaskCreateProject";
import { Layout, List } from 'antd';

const data = [
  {

  }
];
const ProjectList = () => {


  return (
    <>

      <div >
        <TaskCreateProject></TaskCreateProject>
      </div>
      <br></br>
      <List
        grid={{
          gutter: 10,
          column: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            {/* <Card title={item.title}>Card content</Card> */}
            <CardProject ></CardProject>
          </List.Item>
        )}
      />

    </>
  );
};

export default ProjectList;
