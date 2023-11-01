export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IVerifyAccountPayload {
  email: string;
  verifyToken: string;
}
