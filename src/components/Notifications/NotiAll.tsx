import CircleIcon from "@/assets/icons/iconCircle";
import { INotification } from "@/interfaces/notification";
import { classNames } from "@/utils/common";
import { Avatar, List, Typography } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface Props {
  notifications: INotification[];
}

export default function NotiAll({ notifications }: Props) {
  const navigate = useNavigate();

  return (
    <List
      itemLayout="horizontal"
      dataSource={notifications}
      renderItem={(item, index) => (
        <List.Item
          className="hover:bg-neutral-200 p-2"
          onClick={() => navigate(item.targetUrl)}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
              />
            }
            title={
              <div className="flex items-center">
                <Typography.Link
                  className={classNames(
                    "flex-grow",
                    !item.isRead && "text-[#a0a3a7]"
                  )}
                >
                  {item.title}
                </Typography.Link>
                {!item.isRead && (
                  <div>
                    <CircleIcon style={{ fontSize: "12px" }} />
                  </div>
                )}
              </div>
            }
            description={dayjs(item.createAt).fromNow()}
          />
        </List.Item>
      )}
    />
  );
}
