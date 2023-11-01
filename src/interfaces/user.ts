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
  isAdmin: true;
  phoneNumber: string;
  statusId: string;
  userName: string;
}

export interface JwtTokenInfo {
  UserId: string;
  exp: number;
  iss: string;
  aud: string;
}
