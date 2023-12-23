import CircleIcon from "@/assets/icons/iconCircle";
import { INotification } from "@/interfaces/notification";
import { notificationApi } from "@/utils/api/notification";
import { classNames } from "@/utils/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Typography } from "antd";
import dayjs from "dayjs";

interface Props {
  notifications: INotification[];
}

export default function NotiAll({ notifications }: Props) {
  const { mutate, isLoading } = useMutation({
    mutationKey: [notificationApi.readKey],
    mutationFn: notificationApi.read,
  });
  const queryClient = useQueryClient();
  const onNavigate = async (noti: INotification) => {
    if (!noti.isRead) {
      mutate([noti.notificationId], {
        onSettled: () => {
          window.open(noti.targetUrl, "_blank")?.focus();
        },
      });
    } else {
      window.open(noti.targetUrl, "_blank")?.focus();
    }
  };

  const onReadAllNoti = () => {
    mutate(
      notifications
        .filter((noti) => !noti.isRead)
        .map((noti) => noti.notificationId),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [notificationApi.getAllKey],
          });
          queryClient.invalidateQueries({
            queryKey: [notificationApi.getLatestKey],
          });
        },
      }
    );
  };

  return (
    <>
      <div className="flex flex-col gap-y-2 bg-white px-4 py-2 rounded-xl">
        <Button
          disabled={isLoading}
          className="w-fit self-end"
          type="link"
          onClick={onReadAllNoti}
        >
          Mark all as read
        </Button>
        {notifications.map((noti) => (
          <div
            key={noti.notificationId}
            className="text-black hover:text-black"
            onClick={() => onNavigate(noti)}
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
          </div>
        ))}
      </div>
    </>
  );
}
