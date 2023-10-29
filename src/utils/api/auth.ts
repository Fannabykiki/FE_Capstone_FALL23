import { HTTP_METHODS } from "@/utils/constants";
import axiosClient from "./axios-client";

const login = (data) =>
  axiosClient({
    url: "/auth/login",
    method: HTTP_METHODS.POST,
    data,
  });

const register = (data) =>
  axiosClient({
    url: "/auth/register",
    method: HTTP_METHODS.POST,
    data,
  });

export const authApi = {
  login,
  register,
  loginKey: "login",
  registerKey: "register",
};
