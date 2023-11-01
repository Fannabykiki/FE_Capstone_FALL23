import { JwtTokenInfo } from "@/interfaces/user";
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
  }).then((resp) => resp.data);
};

export const userApi = {
  getProfile,
  getProfileKey: "userGetProfile",
};
