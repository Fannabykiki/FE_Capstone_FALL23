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
  id: string;
  name: string;
  email: string;
  statusName: string;
  isAdmin: boolean;
  phoneNumber: string;
  address: string;
  dob: Date;
}

export interface IAdminUsersAnalyzation {
  activeUsers: number;
  inactiveUser: number;
  percentActive: number;
  percentInactive: number;
  totalUser: number;
}
