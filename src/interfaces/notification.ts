export interface INotification {
  notificationId: string;
  title: string;
  description: string;
  createAt: Date;
  targetUrl: string;
  isRead: boolean;
  recerverId: string;
}
