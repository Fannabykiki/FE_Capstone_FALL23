import {
  ChangePassword,
  IUpdateUserPayload,
  JwtTokenInfo,
} from "@/interfaces/user";
import { HTTP_METHODS } from "@/utils/constants";
import jwtDecode from "jwt-decode";
import axiosClient from "./axios-client";

const getProfile = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Session is invalid");
  }
  const tokenInfo = jwtDecode<JwtTokenInfo>(token);
  return axiosClient({
    url: `/users/profile/${tokenInfo.UserId}`,
    method: HTTP_METHODS.GET,
  }).then((resp) => ({ ...resp.data, id: tokenInfo.UserId }));
};

const update = ({ id, data }: IUpdateUserPayload) =>
  axiosClient({
    url: `/api/user-management/users/${id}`,
    method: HTTP_METHODS.PUT,
    data,
  });

const changePassword = async (data: ChangePassword) =>
  axiosClient({
    url: `api/authentication/change-password`,
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

// ======================================= Admin =======================================

const getAdminUsers = async (
  signal: AbortSignal | undefined,
  params: { [key: string]: string | undefined }
) =>
  axiosClient({
    url: "/api/user-management/admin/users",
    method: HTTP_METHODS.GET,
    signal,
    params,
  }).then((resp) => resp.data);

const getAdminUsersAnalyzation = async (signal: AbortSignal | undefined) =>
  axiosClient({
    url: "/api/user-management/admin/users/analyzation",
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

export const userApi = {
  getProfile,
  update,
  changePassword,
  getProfileKey: "userGetProfile",
  updateKey: "userUpdate",
  changePasswordKey: "userChangePassword",

  //Admin
  getAdminUsers,
  getAdminUsersKey: "adminUsersGet",
  getAdminUsersAnalyzation,
  getAdminUsersAnalyzationKey: "getAdminUsersAnalyzation",
};
