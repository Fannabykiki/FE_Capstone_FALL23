export enum Gender {
  Male = 1,
  Female = 0,
}

export interface UserInfo {
  address: string;
  doB: string;
  email: string;
  fullname: string;
  gender: Gender;
  isAdmin: boolean;
  phoneNumber: string;
  statusId: string;
  userName: string;
  isFirstTime: boolean;
  id: string;
}

export interface JwtTokenInfo {
  UserId: string;
  exp: number;
  iss: string;
  aud: string;
}

export interface IUpdateProfile
  extends Pick<
    UserInfo,
    "fullname" | "address" | "doB" | "gender" | "phoneNumber" | "userName"
  > {}

export interface IUpdateUserPayload {
  id: string;
  data: IUpdateProfile;
}

export interface IAdminUsers {
  userId: string;
  userName: string;
  email: string;
  phoneNumber: string;
  statusName: string;
  isAdmin: boolean;
  address: string;
  dob: Date | null;
}

export interface IAdminUsersAnalyzation {
  activeUsers: number;
  inactiveUser: number;
  percentActive: number;
  percentInactive: number;
  totalUser: number;
}
