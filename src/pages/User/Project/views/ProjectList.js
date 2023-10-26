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

  }

];
const ProjectList = () => {

  return (
    <>
      <TaskCreateProject></TaskCreateProject>
      <br></br>
      <div>
        <List
          dataSource={data}
          renderItem={(item) => (

            <CardProject ></CardProject>


          )}
        />
      </div>



    </>
  );
};

export default ProjectList;