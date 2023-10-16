<<<<<<< HEAD
import React from 'react';
import { Card, Space } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CardProject = () => {
    const [projectCard, setProjctCard] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/project-management/projects/${userId}`);
                setProjctCard(response.data);
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        if (userId) {
            getProject();
        }
    }, []);

    if (!projectCard) {
        return <div>You don't have any project.</div>;
    }

    return (
        <Space direction="vertical" size={16}>
            <Card
                title={projectCard.projectName}
                extra={<a href="#">More</a>}
                style={{ width: 300, backgroundColor: '#eee8e8', margin: '10px', display: 'block' }}
            >
                <p>Description</p>
                <p>{projectCard.privacyStatus}</p>
            </Card>
        </Space>
    );
};

=======
import React, { useState, useEffect } from 'react';
import { Card, Space } from 'antd';
import axios from 'axios';

const CardProject = () => {
  const [projectCard, setProjectCard] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const userId = JSON.parse(decodeURIComponent(sessionStorage.userId));
        
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/project-management/projects/${userId}`);
        setProjectCard(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching project data:', error);
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
          title={project.projectName}
          extra={<a href="#">More</a>}
          style={{ width: 300, backgroundColor: '#eee8e8', margin: '10px', display: 'block' }}
        >
          <p>Description: {project.description}</p>
          <p>Privacy Status: {project.privacyStatus ? ' Public' : ' Private'}</p>
        </Card>
      ))}
    </Space>
  );
};

>>>>>>> 842f7e659d5fa2ad540d9aeca058aa1413d8fe9f
export default CardProject;