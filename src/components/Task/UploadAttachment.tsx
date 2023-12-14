import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { attachmentApi } from "@/utils/api/attachment";
import { Button, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import {
  DeleteOutlined,
  LinkOutlined,
  PictureOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { taskApi } from "@/utils/api/task";
import { iterationApi } from "@/utils/api/iteration";
import { useParams } from "react-router-dom";

interface Props {
  taskId: string;
  interationId: string;
}

const UploadAttachment = ({ taskId, interationId }: Props) => {
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState<RcFile[]>();
  const { projectId } = useParams();
  const { mutate: uploadFile, isLoading } = useMutation({
    mutationKey: [attachmentApi.createKey],
    mutationFn: attachmentApi.create,
    onSuccess: (data: any) => {
      if (Object.hasOwn(data, "isSucceed") && !data.isSucceed) {
        toast.error(
          data?.message || "Upload file failed! Please try again later"
        );
        setSelectedFiles(undefined);
      } else {
        toast.success("File uploaded successfully");
        setSelectedFiles(undefined);
        queryClient.invalidateQueries({
          queryKey: [taskApi.getDetailKey, taskId],
        });
        queryClient.refetchQueries({
          queryKey: [iterationApi.getTasksKey, interationId],
        });
        queryClient.refetchQueries({
          queryKey: [taskApi.getKanbanTasksKey, projectId],
        });
      }
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(
        error.response?.data || "Upload file failed! Please try again later"
      );
    },
  });

  // Handler for file selection
  const handleUpload = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles?.forEach((file) => {
        formData.append("file", file);
      });
      uploadFile({
        taskId,
        data: formData,
      });
    }
  };

  const onBeforeUpload = (_: RcFile, fileList: RcFile[]) => {
    setSelectedFiles(fileList);
    return false;
  };

  const onRemoveTempFile = (uid: string) => {
    setSelectedFiles(selectedFiles?.filter((file) => file.uid !== uid));
  };

  return (
    <>
      <Upload beforeUpload={onBeforeUpload} multiple showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload Attachment</Button>
      </Upload>
      {selectedFiles && (
        <div>
          {selectedFiles.map((file) => (
            <div
              key={file.uid}
              className="mt-4 rounded-lg p-2 gap-x-4 border border-solid border-neutral-200 flex items-center"
            >
              {file.type.startsWith("image") ? (
                <PictureOutlined />
              ) : (
                <LinkOutlined />
              )}
              <span className="flex-grow">{file.name}</span>
              <Button
                danger
                icon={<DeleteOutlined />}
                type="link"
                onClick={() => onRemoveTempFile(file.uid)}
              />
            </div>
          ))}
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
