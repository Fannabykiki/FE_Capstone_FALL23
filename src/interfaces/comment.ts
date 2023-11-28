import { UserInfo } from "./user";

export interface ICreateCommentPayload {
  taskId?: string;
  commentId?: string;
  content: string;
}

export interface IUpdateCommentPayload {
  commentId: string;
  content: string;
}

export interface IReplyCommentPayload {
  id: string;
  data: ICreateCommentPayload;
}

export interface IComment {
  commentId: string;
  content: string;
  createAt: Date;
  deleteAt: Date | null;
  replyTo: string | null;
  taskId: string;
  updateAt: Date | null;
  user: UserInfo;
  subComments: IComment[] | null;
}
