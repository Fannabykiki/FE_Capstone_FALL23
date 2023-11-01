import { ILoginPayload, IRegisterPayload } from "@/interfaces/auth";
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
    url: "/api/user-management/users",
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const forgotPassword = (email: string) =>
  axiosClient({
    url: `/api/authentication/forgot-password?email=${email}`,
    method: HTTP_METHODS.POST,
  }).then((resp) => resp.data);

const sendMail = (email: string) =>
  axiosClient({
    url: `/api/authentication/send-mail`,
    method: HTTP_METHODS.POST,
    data: {
      email,
    },
  }).then((resp) => resp.data);

export const authApi = {
  login,
  register,
  forgotPassword,
  sendMail,
  loginKey: "authLogin",
  registerKey: "authRegister",
  forgotPasswordKey: "authForgotPassword",
  sendMailKey: "authSendMail",
};
