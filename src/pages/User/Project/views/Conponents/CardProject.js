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

export default CardProject;