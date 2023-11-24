import {
  ICreateCommentPayload,
  IReplyCommentPayload,
  IUpdateCommentPayload,
} from "@/interfaces/comment";
import { HTTP_METHODS } from "../constants";
import axiosClient from "./axios-client";

const create = async (data: ICreateCommentPayload) =>
  axiosClient({
    url: `/api/comment-management/comment`,
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const update = (data: IUpdateCommentPayload): Promise<any[]> =>
  axiosClient({
    url: `/api/comment-management/comment`,
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

const remove = (id: string): Promise<any> =>
  axiosClient({
    url: `/api/comment-management/comment/${id}`,
    method: HTTP_METHODS.DELETE,
  }).then((resp) => resp.data);

const reply = async ({ id, data }: IReplyCommentPayload) =>
  axiosClient({
    url: `/api/comment-management/comment/reply/${id}`,
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const getListOfTask = (
  signal: AbortSignal | undefined,
  taskId: string
): Promise<any[]> =>
  axiosClient({
    url: `/api/comment-management/comment/${taskId}`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

export const commentApi = {
  create,
  createKey: "commentCreate",
  update,
  updateKey: "commentUpdate",
  remove,
  removeKey: "commentRemove",
  reply,
  replyKey: "commentReply",
  getListOfTask,
  getListOfTaskKey: "commentGetListOfTask",
};
