export interface SocketEventHandler {
  message: string;
  handler: (...args: any[]) => void;
}

export interface IFormError {
  errors: {
    [key: string]: string[];
  };
}
