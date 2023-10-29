export interface SocketEventHandler {
  message: string;
  handler: (...args: any[]) => void;
}
