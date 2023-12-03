import { Space, Tabs, Typography } from "antd";
import NotiAll from "./NotiAll";
import BellIcon from "@/assets/icons/iconBell";
import { INotification } from "@/interfaces/notification";

interface Props {
  notifications: INotification[];
}

export default function Notification({ notifications }: Props) {
  return (
    <>
      <div className="min-h-fit w-[400px]">
        <Space className="flex items-center justify-between">
          <Typography className="text-xl font-semibold">
            <BellIcon /> Notication
          </Typography>
          <Typography.Link>View All</Typography.Link>
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
      </div>
    </>
  );
}
