import { IAttachment } from "@/interfaces/attachment";
import { attachmentApi } from "@/utils/api/attachment";
import { DeleteOutlined, LinkOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";

interface Props {
  attachment: IAttachment;
}

export default function AttachmentDisplay({ attachment }: Props) {
  const onDownloadAttachment = async () => {
    await attachmentApi.download(
      "279836806_5504002959610777_4351905139587678826_n.jpg" // TODO: replace with attachment fileName
    );
  };

  return (
    <>
      <div className="flex items-center gap-x-4 border border-solid border-neutral-200 rounded-lg px-4 py-2">
        <LinkOutlined />
        <div className="flex-grow">
          <Button type="link" onClick={onDownloadAttachment}>
            {attachment.title || attachment.attachmentId}
          </Button>
        </div>
        <Button type="link" danger icon={<DeleteOutlined />} />
      </div>
    </>
  );
}
