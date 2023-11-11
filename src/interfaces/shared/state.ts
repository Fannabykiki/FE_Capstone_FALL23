import { UserInfo } from "../user";

export interface IAuthState {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
}

export interface IErrorInfoState {
  isError: boolean;
  message: string;
}
