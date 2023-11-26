export interface ICreateAttachmentPayload {
  taskId: string;
  data: FormData;
}

export interface IAttachment {
  attachmentId: string;
  createAt: Date;
  createBy: string;
  deleteAt: Date | null;
  expireTime: Date | null;
  isDeleted: boolean;
  taskId: string;
  title: string;
}
