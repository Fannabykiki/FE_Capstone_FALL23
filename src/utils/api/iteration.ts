import {
  ICreateIterationPayload,
  IUpdateIterationPayload,
} from "@/interfaces/iteration";
import { HTTP_METHODS } from "../constants";
import axiosClient from "./axios-client";

const create = async (data: ICreateIterationPayload) =>
  axiosClient({
    url: `/api/Iteration-management`,
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const update = ({ id, data }: IUpdateIterationPayload): Promise<any[]> =>
  axiosClient({
    url: `/api/Iteration-management/Iteration/${id}`,
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

const getList = (
  signal: AbortSignal | undefined,
  boardId: string
): Promise<any[]> =>
  axiosClient({
    url: `/api/Iteration-management/Iteration/${boardId}`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const getDetail = (
  signal: AbortSignal | undefined,
  iterationId: string
): Promise<any[]> =>
  axiosClient({
    url: `/api/Iteration-management/Iteration`,
    method: HTTP_METHODS.GET,
    signal,
    params: {
      iterationId,
    },
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
