import React, { useState, useEffect } from "react";
import { Card, Space } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const CardProject = () => {
  const [projectCard, setProjectCard] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const userId = JSON.parse(decodeURIComponent(sessionStorage.userId));

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/project-management/projects/user/${userId}`
        );
        setProjectCard(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    getProjects();
  }, []);

  if (projectCard.length === 0) {
    return <div>You don't have any project.</div>;
  }

  return (
    <Space direction="vertical" size={16}>
      {projectCard.map((project) => (
        <Card
          key={project.projectId}
          title={project.projectName}
          extra={<Link to={`/user/project/${project.projectId}`}>More</Link>}
          style={{
            width: 300,
            backgroundColor: "#eee8e8",
            margin: "10px",
            display: "block",
          }}
        >
          <p>Description: {project.description}</p>
          <p>
            Privacy Status: {project.privacyStatus ? " Public" : " Private"}
          </p>
        </Card>
      ))}
    </Space>
  );
};

export default CardProject;
