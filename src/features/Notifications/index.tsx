import BellIcon from "@/assets/icons/iconBell";
import Header from "@/components/Layout/Header";
import NotiAll from "@/components/Notifications/NotiAll";
import { notificationApi } from "@/utils/api/notification";
import { useQuery } from "@tanstack/react-query";
import { Card, Layout, Space, Tabs, Typography } from "antd";
import { Content } from "antd/es/layout/layout";

export default function Notifications() {
  const { data: notifications } = useQuery({
    queryKey: [notificationApi.getAllKey],
    queryFn: ({ signal }) => notificationApi.getAll(signal),
    initialData: [],
  });
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
            <Tabs
              className="mt-5"
              type="card"
              items={[
                {
                  key: "All",
                  label: "All",
                  children: <NotiAll notifications={notifications} />,
                },
                {
                  key: "Unread",
                  label: "Unread",
                  children: (
                    <NotiAll
                      notifications={notifications.filter(
                        (notification) => !notification.isRead
                      )}
                    />
                  ),
                },
              ]}
            />
          </Card>
        </Content>
      </Layout>
    </>
  );
}
