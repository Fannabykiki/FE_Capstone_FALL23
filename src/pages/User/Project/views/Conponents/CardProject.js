
import React from 'react'

import TaskCreateProject from './TaskCreateProject';
import { Card, Space } from 'antd';
const CardProject = () => {

    return (
        <>

            <Space direction="vertical" size={16}>
                <Card
                    title="ProjectName"
                    extra={<a href="#">More</a>}
                    style={{
                        width: 300, backgroundColor: '#eee8e8', margin: '10px', display: 'block'
                    }}
                >
                    <p>Description</p>

                </Card>

            </Space>

        </>
    )
}
export default CardProject;