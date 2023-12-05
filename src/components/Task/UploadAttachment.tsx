import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { attachmentApi } from "@/utils/api/attachment";
import { Button, Image, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import {
  DeleteOutlined,
  FileImageOutlined,
  LinkOutlined,
  PictureOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { taskApi } from "@/utils/api/task";

interface Props {
  taskId: string;
}

const UploadAttachment = ({ taskId }: Props) => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<RcFile>();

  const { mutate: uploadFile, isLoading } = useMutation({
    mutationKey: [attachmentApi.createKey],
    mutationFn: attachmentApi.create,
    onSuccess: (data: any) => {
      if (Object.hasOwn(data, "isSucceed") && !data.isSucceed) {
        toast.error(
          data?.message || "Upload file failed! Please try again later"
        );
        setSelectedFile(undefined);
      } else {
        toast.success("File uploaded successfully");
        setSelectedFile(undefined);
        queryClient.invalidateQueries({
          queryKey: [taskApi.getDetailKey, taskId],
        });
      }
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Upload file failed! Please try again later");
    },
  });

  // Handler for file selection
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile!);
    uploadFile({
      taskId,
      data: formData,
    });
  };

  const onBeforeUpload = (file: RcFile) => {
    setSelectedFile(file);
    return false;
  };

  return (
    <>
      <Upload beforeUpload={onBeforeUpload} multiple showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload Attachment</Button>
      </Upload>
      {selectedFile && (
        <div>
          <div className="mt-4 rounded-lg p-2 gap-x-4 border border-solid border-neutral-200 flex items-center">
            {selectedFile.type.startsWith("image") ? (
              <PictureOutlined />
            ) : (
              <LinkOutlined />
            )}
            <span className="flex-grow">{selectedFile.name}</span>
            <Button
              danger
              icon={<DeleteOutlined />}
              type="link"
              onClick={() => setSelectedFile(undefined)}
            />
          </div>
          <div className="text-right mt-4">
            <Button type="primary" onClick={handleUpload} loading={isLoading}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadAttachment;
