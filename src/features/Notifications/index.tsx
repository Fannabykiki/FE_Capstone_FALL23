import BellIcon from "@/assets/icons/iconBell";
import Header from "@/components/Layout/Header";
import NotiAll from "@/components/Notifications/NotiAll";
import NotiUnread from "@/components/Notifications/NotiUnread";
import { Card, Layout, Space, Tabs, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import TabPane from "antd/es/tabs/TabPane";

export default function Notifications() {
  return (
    <>
      <Layout className="min-h-screen flex flex-1 flex-col">
        <Header />
        <Content className="m-6 flex justify-center">
          <Card className="min-h-fit w-3/5">
            <Space className="flex items-center justify-between">
              <Typography className="text-3xl font-semibold">
                <BellIcon /> Notication
              </Typography>
            </Space>
            <Tabs className="mt-5" type="card">
              <TabPane tab="All" key="1">
                <NotiAll />
              </TabPane>
              <TabPane tab="Unread" key="2">
                <NotiUnread />
              </TabPane>
            </Tabs>
          </Card>
        </Content>
      </Layout>
    </>
  );
}
