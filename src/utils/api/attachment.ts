import { HTTP_METHODS } from "../constants";
import axiosClient from "./axios-client";
import { ICreateAttachmentPayload } from "@/interfaces/attachment";
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

const download = async (fileName: string) =>
  axiosClient({
    url: `/api/attachment-management/attachments/download/${fileName}`,
    method: HTTP_METHODS.GET,
    responseType: "blob",
  }).then((resp) => fileDownload(resp.data, fileName));

export const attachmentApi = {
  create,
  createKey: "attachmentCreate",
  download,
  downloadKey: "attachmentDownload",
};
