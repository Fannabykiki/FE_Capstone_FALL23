import {
  ICreateProjectPayload,
  IProject,
  IUpdatePrivacyProjectPayload,
} from "@/interfaces/project";
import { HTTP_METHODS } from "../constants";
import axiosClient from "./axios-client";

const create = async (data: ICreateProjectPayload) =>
  axiosClient({
    url: `/api/project-management/projects`,
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const remove = async (id: string) =>
  axiosClient({
    url: `/api/project-management/projects/${id}`,
    method: HTTP_METHODS.DELETE,
  }).then((resp) => resp.data);

const updatePrivacy = async ({
  id,
  privacyStatus,
}: IUpdatePrivacyProjectPayload) =>
  axiosClient({
    url: `/api/project-management/projects/privacy/${id}`,
    method: HTTP_METHODS.PUT,
    data: { privacyStatus },
  }).then((resp) => resp.data);

const getListByUser = (
  signal: AbortSignal | undefined,
  userId: string
): Promise<IProject[]> =>
  axiosClient({
    url: `/api/project-management/projects/user/${userId}`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const getDetail = (
  signal: AbortSignal | undefined,
  projectId: string
): Promise<IProject> =>
  axiosClient({
    url: `/api/project-management/projects/${projectId}`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

export const projectApi = {
  create,
  createKey: "projectCreate",
  remove,
  removeKey: "projectRemove",
  updatePrivacy,
  updatePrivacyKey: "projectUpdatePrivacy",
  getListByUser,
  getListByUserKey: "projectGetListByUser",
  getDetail,
  getDetailKey: "projectGetDetail",
};
