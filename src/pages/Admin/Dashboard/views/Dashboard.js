import { UserOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <Typography.Title level={2}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard icon={<UserOutlined />} title={"User"} value={1235} />
        <DashboardCard icon={<UserOutlined />} title={"User"} value={1235} />
        <DashboardCard icon={<UserOutlined />} title={"User"} value={1235} />
        <DashboardCard icon={<UserOutlined />} title={"User"} value={1235} />
        <DashboardCard icon={<UserOutlined />} title={"User"} value={1235} />
      </Space>
    </div>
  );
};

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default Dashboard;
