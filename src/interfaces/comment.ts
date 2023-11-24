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
