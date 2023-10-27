import React, { useEffect, useState } from "react";
import "./ProjectList.css";
import TaskCreateProject from "./Conponents/TaskCreateProject";
import Board from "../../../../assets/images/Board.png";
import { Card, Col, List, Row, Spin, Typography } from "antd";
import axios from "axios";
import Avatar from "react-avatar";

const { Text } = Typography;
const { Meta } = Card;

const ProjectList = () => {
  const [projectCard, setProjectCard] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getListProjects = async () => {
      try {
        const userId = JSON.parse(decodeURIComponent(sessionStorage.userId));

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/project-management/projects/user/${userId}`
        );
        const firstThreeProjects = response.data.slice(0, 3);
        setProjectCard(firstThreeProjects);
        setProjectList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    getListProjects();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (projectCard.length === 0) {
    return <div>You don't have any project.</div>;
  }

  return (
    <>
      <TaskCreateProject></TaskCreateProject>
      <br />
      <div>
        <Row gutter={16}>
          {projectCard.map((project) => (
            <Col span={8} key={project.projectId}>
              <Card
                className="custom-card"
                hoverable
                actions={[
                  <img
                    className="icon-card"
                    src={Board}
                    alt="icon"
                    key="board"
                  />,
                ]}
              >
                <div>
                  <Meta
                    avatar={
                      <Avatar
                        className="avatar-card"
                        textSizeRatio={1.8}
                        size="55"
                        name={project.projectName}
                      />
                    }
                    title={
                      <Text className="txt-title">{project.projectName}</Text>
                    }
                    description={project.description}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="project-list">
          <List
            split
            itemLayout="horizontal"
            dataSource={projectList}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <img
                    className="icon-list"
                    src={Board}
                    alt="icon"
                    key="board"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className="avatar-card"
                      textSizeRatio={1.5}
                      size="50"
                      name={item.projectName}
                    />
                  }
                  title={<Text className="txt-title">{item.projectName}</Text>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectList;
