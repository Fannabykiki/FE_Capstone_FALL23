import React, { useState, useEffect } from 'react';
import { Card, Space } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CardProject = () => {
  const [projectCard, setProjectCard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const userId = JSON.parse(decodeURIComponent(sessionStorage.userId));

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/project-management/projects/user/${userId}`);
        setProjectCard(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    getProjects();
  }, []);

  const handleSettingClick = (projectId) => {
    sessionStorage.setItem('projectId', projectId); // Lưu project ID vào session
    navigate('/project-settings'); // Chuyển hướng đến trang /project-settings
  };

  return (
    <Space direction="vertical" size={12} style={{ display: 'flex', flexDirection: 'row' }}>
      {projectCard.map((project) => (
        <Card
          key={project.projectId}
          title={project.projectName}
          extra={<a onClick={() => handleSettingClick(project.projectId)}>Setting</a>} // Gọi hàm xử lý sự kiện và truyền project ID
          style={{ width: 300, backgroundColor: '#eee8e8', margin: '10px', display: 'block' }}
        >
          <p>Description: {project.description}</p>
          <p>Privacy Status: {project.privacyStatus ? ' Public' : ' Private'}</p>
        </Card>
      ))}
    </Space>
  );
};

export default CardProject;