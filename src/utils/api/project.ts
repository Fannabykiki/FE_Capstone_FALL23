import { ICreateProjectPayload } from "@/interfaces/project";
import { HTTP_METHODS } from "../constants";
import axiosClient from "./axios-client";

const create = async (data: ICreateProjectPayload) =>
  axiosClient({
    url: `/api/project-management/projects`,
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

export const projectApi = {
  create,
  createKey: "projectCreate",
};
