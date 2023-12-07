import CircleIcon from "@/assets/icons/iconCircle";
import { INotification } from "@/interfaces/notification";
import { classNames } from "@/utils/common";
import { Typography } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface Props {
  notifications: INotification[];
}

export default function NotiAll({ notifications }: Props) {
  return (
    <>
      <div className="max-h-[300px] overflow-y-auto flex flex-col gap-y-2">
        {notifications.map((noti) => (
          <Link
            key={noti.notificationId}
            to={noti.targetUrl}
            className="text-black hover:text-black"
          >
            <div
              className={classNames(
                "flex justify-between items-center p-2 border-0 border-b border-solid border-neutral-300",
                "hover:bg-neutral-200 cursor-pointer select-none"
              )}
            >
              <div>
                <div className="flex gap-x-2">
                  <Typography.Link>{noti.title}</Typography.Link>
                  <span>-</span>
                  <Typography.Text className="text-neutral-400">
                    {dayjs(noti.createAt).fromNow()}
                  </Typography.Text>
                </div>
                <div dangerouslySetInnerHTML={{ __html: noti.description }} />
              </div>
              {!noti.isRead && (
                <div>
                  <CircleIcon style={{ fontSize: "12px" }} />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
