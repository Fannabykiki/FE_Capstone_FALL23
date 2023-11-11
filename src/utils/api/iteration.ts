import { ICreateIterationPayload } from "@/interfaces/iteration";
import { HTTP_METHODS } from "../constants";
import axiosClient from "./axios-client";

const create = async (data: ICreateIterationPayload) =>
  axiosClient({
    url: `/api/Iteration-management`,
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const getDetail = (
  signal: AbortSignal | undefined,
  projectId: string
): Promise<IProjectMember[]> =>
  axiosClient({
    url: `/api/project-management/projects/${projectId}`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

export const projectApi = {
  create,
  createKey: "iterationCreate",
  update,
  updateKey: "iterationUpdate",
  getList,
  getListKey: "iterationGetList",
  getDetail,
  getDetailKey: "iterationGetDetail",
};
