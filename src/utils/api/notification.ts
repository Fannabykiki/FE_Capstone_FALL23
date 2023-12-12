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

const getAll = async (
  signal: AbortSignal | undefined
): Promise<INotification[]> =>
  axiosClient({
    url: `/api/notification/allNotification`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const read = async (listNotificationIds: string[]): Promise<INotification[]> =>
  axiosClient({
    url: `/api/notification/read`,
    method: HTTP_METHODS.POST,
    data: { listNotificationIds },
  }).then((resp) => resp.data);

export const notificationApi = {
  getLatest,
  getLatestKey: "notificationGetLatest",
  getAll,
  getAllKey: "notificationGetAll",
  read,
  readKey: "notificationRead",
};
