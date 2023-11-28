import {
  ChangePassword,
  IUpdateUserPayload,
  IUpdateUserStatus,
  JwtTokenInfo,
} from "@/interfaces/user";
import { HTTP_METHODS } from "@/utils/constants";
import { jwtDecode } from "jwt-decode";
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

const update = (data: IUpdateUserPayload) =>
  axiosClient({
    url: "/api/user-management/users",
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
  queryString: string
) =>
  axiosClient({
    url: "/api/user-management/admin/users" + queryString,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const getAdminUsersAnalyzation = async (signal: AbortSignal | undefined) =>
  axiosClient({
    url: "/api/user-management/admin/users/analyzation",
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const changeUserStatus = (data: IUpdateUserStatus) =>
  axiosClient({
    url: "/api/user-management/users/change-status",
    method: HTTP_METHODS.PUT,
    data,
  });

export const userApi = {
  getProfile,
  update,
  changePassword,
  getProfileKey: "userGetProfile",
  updateKey: "userUpdate",
  changePasswordKey: "userChangePassword",

  //Admin
  getAdminUsers,
  getAdminUsersKey: "adminUsersGetKey",
  getAdminUsersAnalyzation,
  getAdminUsersAnalyzationKey: "getAdminUsersAnalyzationKey",
  changeUserStatus,
  changeUserStatusKey: "changeUserStatusKey",
};
