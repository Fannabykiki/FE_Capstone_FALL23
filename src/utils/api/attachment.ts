import { HTTP_METHODS } from "../constants";
import axiosClient from "./axios-client";
import { IAttachment, ICreateAttachmentPayload } from "@/interfaces/attachment";
import fileDownload from "js-file-download";

const create = async ({ taskId, data }: ICreateAttachmentPayload) =>
  axiosClient({
    url: `/api/attachment-management/attachments`,
    method: HTTP_METHODS.POST,
    data,
    params: {
      taskId,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((resp) => resp.data);

const download = async (fileName: string, taskId: string) =>
  axiosClient({
    url: `/api/attachment-management/attachments/download/${fileName}/${taskId}`,
    method: HTTP_METHODS.GET,
    responseType: "blob",
  }).then((resp) => fileDownload(resp.data, fileName));

const remove = async (attachment: IAttachment) =>
  axiosClient({
    url: `/api/attachment-management/attachments/${attachment.title}/${attachment.taskId}`,
    method: HTTP_METHODS.DELETE,
  }).then((resp) => resp.data);

export const attachmentApi = {
  create,
  createKey: "attachmentCreate",
  download,
  downloadKey: "attachmentDownload",
  remove,
  removeKey: "attachmentRemove",
};
