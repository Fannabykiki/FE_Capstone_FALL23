import {
  ILoginPayload,
  IRegisterPayload,
  IVerifyAccountPayload,
} from "@/interfaces/auth";
import { HTTP_METHODS } from "@/utils/constants";
import axiosClient from "./axios-client";

const login = (data: ILoginPayload) =>
  axiosClient({
    url: "/api/authentication/token",
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const register = (data: IRegisterPayload) =>
  axiosClient({
    url: "/api/authentication/register",
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const forgotPassword = (email: string) =>
  axiosClient({
    url: `/api/authentication/forgot-password?email=${email}`,
    method: HTTP_METHODS.POST,
  }).then((resp) => resp.data);

const verifyAccount = (params: IVerifyAccountPayload) =>
  axiosClient({
    url: `/api/authentication/verify-user`,
    method: HTTP_METHODS.POST,
    params,
  }).then((resp) => resp.data);

export const authApi = {
  login,
  register,
  forgotPassword,
  verifyAccount,
  loginKey: "authLogin",
  registerKey: "authRegister",
  forgotPasswordKey: "authForgotPassword",
  verifyAccountKey: "authVerifyAccount",
};
