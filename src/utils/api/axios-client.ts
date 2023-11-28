import qs from "query-string";
import axios from "axios";
import { API_PATH } from "@/utils/constants";

const axiosClient = axios.create({
  baseURL: API_PATH,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "bracket" }),
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    //handle token here
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
