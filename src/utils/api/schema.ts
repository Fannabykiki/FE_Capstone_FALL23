import { IPermissionSchemeInputType } from "@/features/Admin/PermissionSchemes/CreateEditPermissionScheme";
import { HTTP_METHODS } from "../constants";
import axiosClient from "./axios-client";
import {
  IGrantPermissionRequest,
  IRevokePermissionRequest,
} from "@/interfaces/schema";

const getAdminSchemas = async (
  signal: AbortSignal | undefined,
  queryString: string
) =>
  axiosClient({
    url: "/api/schema-management/schemas" + queryString,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const createPermissionScheme = (data: IPermissionSchemeInputType) =>
  axiosClient({
    url: "/api/schema-management/schemas",
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const updatePermissionScheme = (data: IPermissionSchemeInputType) =>
  axiosClient({
    url: "/api/schema-management/schemas",
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

const grantPermission = (data: IGrantPermissionRequest) =>
  axiosClient({
    url: "/api/schema-management/schemas/grant-permission",
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

const revokePermission = (data: IRevokePermissionRequest) =>
  axiosClient({
    url: "/api/schema-management/schemas/revoke-permission",
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

const deleteSchema = (id: string) =>
  axiosClient({
    url: `/api/schema-management/system/schema/${id}`,
    method: HTTP_METHODS.DELETE,
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
  deleteSchema,
  deleteSchemaKey: "deleteSchemaKey",
};
