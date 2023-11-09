import { IPermissionSchemeInputType } from "@/features/Admin/PermissionSchemes/CreateEditPermissionScheme";
import { HTTP_METHODS } from "../constants";
import axiosClient from "./axios-client";
import {
  IGrantPermissionRequest,
  IRevokePermissionRequest,
} from "@/interfaces/schema";

const getAdminSchemas = async (
  signal: AbortSignal | undefined,
  params: { [key: string]: string | undefined }
) =>
  axiosClient({
    url: "/api/schema-management/schemas",
    method: HTTP_METHODS.GET,
    signal,
    params,
  }).then((resp) => resp.data);

const createPermissionScheme = (data: IPermissionSchemeInputType) =>
  axiosClient({
    url: "/api/schema-management/schemas",
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const updatePermissionScheme = ({
  id,
  data,
}: {
  id: string;
  data: IPermissionSchemeInputType;
}) =>
  axiosClient({
    url: `/api/schema-management/schemas/${id}`,
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

const getAdminSchemaDetail = async (
  signal: AbortSignal | undefined,
  id: string
) =>
  axiosClient({
    url: `/api/schema-management/schemas/${id}`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const grantPermission = ({ id, data }: IGrantPermissionRequest) =>
  axiosClient({
    url: `/api/schema-management/schemas/grant-permission/${id}`,
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

const revokePermission = ({ id, data }: IRevokePermissionRequest) =>
  axiosClient({
    url: `/api/schema-management/schemas/revoke-permission/${id}`,
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

export const schemaApi = {
  getAdminSchemas,
  getAdminSchemasKey: "getAdminSchemasKey",
  createPermissionScheme,
  createPermissionSchemeKey: "createPermissionSchemeKey",
  updatePermissionScheme,
  updatePermissionSchemeKey: "updatePermissionSchemeKey",
  getAdminSchemaDetail,
  getAdminSchemaDetailKey: "getAdminSchemaDetailKey",
  grantPermission,
  grantPermissionKey: "grantPermissionKey",
  revokePermission,
  revokePermissionKey: "revokePermissionKey",
};
