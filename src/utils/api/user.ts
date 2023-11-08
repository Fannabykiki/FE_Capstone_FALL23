import { IUpdateUserPayload, JwtTokenInfo } from "@/interfaces/user";
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
  getProfileKey: "userGetProfile",
  updateKey: "userUpdate",

  //Admin
  getAdminUsers,
  getAdminUsersKey: "adminUsersGet",
  getAdminUsersAnalyzation,
  getAdminUsersAnalyzationKey: "getAdminUsersAnalyzation",
};
