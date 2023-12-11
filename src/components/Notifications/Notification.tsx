import { Space, Tabs, Typography } from "antd";
import NotiAll from "./NotiAll";
import BellIcon from "@/assets/icons/iconBell";
import { INotification } from "@/interfaces/notification";
import { Link } from "react-router-dom";
import { paths } from "@/routers/paths";

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
          <Link to={paths.notification}>
            <Typography.Link>View All</Typography.Link>
          </Link>
        </Space>
        <Tabs
          className="mt-5"
          type="card"
          items={[
            {
              key: "All",
              label: "All",
              children: (
                <div className="max-h-[300px] overflow-y-auto">
                  <NotiAll notifications={notifications} />
                </div>
              ),
            },
            {
              key: "Unread",
              label: "Unread",
              children: (
                <div className="max-h-[300px] overflow-y-auto">
                  <NotiAll
                    notifications={notifications.filter(
                      (notification) => !notification.isRead
                    )}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
