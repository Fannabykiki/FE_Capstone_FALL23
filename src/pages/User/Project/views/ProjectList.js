import React from "react";
import CardProject from "./Conponents/CardProject";
import TaskCreateProject from "./Conponents/TaskCreateProject";
import { Layout, List } from 'antd';

const data = [
  {
    title: 'tt1'
  },
  {
    title: 'tt1'
  },
  {
    title: 'tt1'
  },
  {
    title: 'tt1'
  },
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
          gutter: 16,
          column: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            {/* <Card title={item.title}>Card content</Card> */}
            <CardProject></CardProject>
          </List.Item>
        )}
      />

    </>
  );
};

export default ProjectList;
