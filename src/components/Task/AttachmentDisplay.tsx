import { IAttachment } from "@/interfaces/attachment";
import { attachmentApi } from "@/utils/api/attachment";
import { iterationApi } from "@/utils/api/iteration";
import { taskApi } from "@/utils/api/task";
import { DeleteOutlined, LinkOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { toast } from "react-toastify";

interface Props {
  attachment: IAttachment;
  iterationId: string;
}

export default function AttachmentDisplay({ attachment, iterationId }: Props) {
  const onDownloadAttachment = async () => {
    await attachmentApi.download(attachment.title, attachment.taskId);
  };

  const queryClient = useQueryClient();

  const { mutate: removeAttachment, isLoading } = useMutation({
    mutationKey: [attachmentApi.removeKey],
    mutationFn: attachmentApi.remove,
    onSuccess: async () => {
      await queryClient.refetchQueries([
        taskApi.getDetailKey,
        attachment.taskId,
      ]);
      await queryClient.invalidateQueries([
        iterationApi.getTasksKey,
        iterationId,
      ]);
      toast.success("Delete attachment succeed!");
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
          onClick={() => removeAttachment(attachment)}
        />
      </div>
    </>
  );
}
