import { INotification } from "@/interfaces/notification";
import { HTTP_METHODS } from "../constants";
import axiosClient from "./axios-client";

const getLatest = async (
  signal: AbortSignal | undefined
): Promise<INotification[]> =>
  axiosClient({
    url: `/api/notification/latest`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

export const notificationApi = {
  getLatest,
  getLatestKey: "notificationGetLatest",
};
