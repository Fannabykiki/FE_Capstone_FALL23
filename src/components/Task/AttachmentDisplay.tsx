import { IAttachment } from "@/interfaces/attachment";
import { attachmentApi } from "@/utils/api/attachment";
import { taskApi } from "@/utils/api/task";
import { DeleteOutlined, LinkOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { toast } from "react-toastify";

interface Props {
  attachment: IAttachment;
}

export default function AttachmentDisplay({ attachment }: Props) {
  const onDownloadAttachment = async () => {
    await attachmentApi.download(attachment.title);
  };

  const queryClient = useQueryClient();

  const { mutate: removeAttachment, isLoading } = useMutation({
    mutationKey: [attachmentApi.removeKey],
    mutationFn: attachmentApi.remove,
    onSuccess: () => {
      toast.success("Delete attachment succeed!");
      queryClient.invalidateQueries([taskApi.getDetailKey, attachment.taskId]);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Delete attachment failed! Please try again later");
    },
  });

  return (
    <>
      <div className="flex items-center gap-x-4 border border-solid border-neutral-200 rounded-lg px-4 py-2">
        <LinkOutlined />
        <div className="flex-grow">
          <Button type="link" onClick={onDownloadAttachment}>
            {attachment.title || attachment.attachmentId}
          </Button>
        </div>
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          loading={isLoading}
          onClick={() => removeAttachment(attachment.title)}
        />
      </div>
    </>
  );
}
