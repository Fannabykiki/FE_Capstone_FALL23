import { Space, Tabs, Typography } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import NotiAll from "./NotiAll";
import NotiUnread from "./NotiUnread";
import BellIcon from "@/assets/icons/iconBell";

export default function Notification() {
  return (
    <>
      <div className="min-h-fit w-[400px]">
        <Space className="flex items-center justify-between">
          <Typography className="text-xl font-semibold">
            <BellIcon /> Notication
          </Typography>
          <a>View All</a>
        </Space>
        <Tabs className="mt-5" type="card">
          <TabPane tab="All" key="1">
            <NotiAll />
          </TabPane>
          <TabPane tab="Unread" key="2">
            <NotiUnread />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
