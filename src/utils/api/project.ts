import {
  ICreateProjectPayload,
  IProject,
  IUpdateInfoProjectPayload,
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

const getListByUser = (signal: AbortSignal | undefined): Promise<IProject[]> =>
  axiosClient({
    url: `/api/project-management/projects`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const getPermission = (
  signal: AbortSignal | undefined,
  projectId: string,
  userId: string
): Promise<IProject> =>
  axiosClient({
    url: `/api/project-management/projects/permission`,
    method: HTTP_METHODS.GET,
    signal,
    params: {
      projectId,
      userId,
    },
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

const remove = async (id: string) =>
  axiosClient({
    url: `/api/project-management/projects/${id}`,
    method: HTTP_METHODS.DELETE,
  }).then((resp) => resp.data);

const getInfo = (
  signal: AbortSignal | undefined,
  projectId: string
): Promise<IProject> =>
  axiosClient({
    url: `/api/project-management/projects/info/${projectId}`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const updateInfo = async ({ id, data }: IUpdateInfoProjectPayload) =>
  axiosClient({
    url: `/api/project-management/projects/privacy/${id}`,
    method: HTTP_METHODS.PUT,
    data: data,
  }).then((resp) => resp.data);

const createRole = async ({ id, data }: IUpdateInfoProjectPayload) =>
  axiosClient({
    url: `/api/project-management/projects/roles`,
    method: HTTP_METHODS.PUT,
    data: data,
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

// ======================================= Admin =======================================

const getAdminProjects = async (
  signal: AbortSignal | undefined,
  params: { [key: string]: string | undefined }
) =>
  axiosClient({
    url: "/api/project-management/admin/projects",
    method: HTTP_METHODS.GET,
    signal,
    params,
  }).then((resp) => resp.data);

export const projectApi = {
  create,
  createKey: "projectCreate",
  getListByUser,
  getListByUserKey: "projectGetListByUser",
  getPermission,
  getPermissionKey: "projectGetPermission",
  getDetail,
  getDetailKey: "projectGetDetail",
  remove,
  removeKey: "projectRemove",
  updatePrivacy,
  updatePrivacyKey: "projectUpdatePrivacy",

  //Admin
  getAdminProjects,
  getAdminProjectsKey: "adminProjectsGet",
};
