import {
  ICreateMemberRolePayload,
  ICreateProjectPayload,
  IInteration,
  IInvitationInfo,
  IProject,
  IProjectMember,
  IReportProject,
  IUpdateMemberRolePayload,
  IUpdatePrivacyProjectPayload,
  IUpdateProjectPayload,
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

const deleteProject = async (data: { projectId: string }) =>
  axiosClient({
    url: "/api/project-management/projects/delete",
    method: HTTP_METHODS.PUT,
    data,
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

const updateProject = async (data: IUpdateProjectPayload) =>
  axiosClient({
    url: "/api/project-management/projects/info",
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

const createRole = async (data: ICreateMemberRolePayload) =>
  axiosClient({
    url: `/api/project-management/roles`,
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const updateMemberRole = async (data: IUpdateMemberRolePayload) =>
  axiosClient({
    url: "/api/project-management/roles",
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

const updatePrivacy = async (data: IUpdatePrivacyProjectPayload) =>
  axiosClient({
    url: "api/project-management/projects/privacy",
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

const restoreProject = async (data: { projectId: string }) =>
  axiosClient({
    url: "/api/project-management/project/restoration",
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

const getAdminProjects = async (
  signal: AbortSignal | undefined,
  queryString: string
) =>
  axiosClient({
    url: "/api/project-management/admin/projects" + queryString,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const getAdminProjectsAnalyzation = async (signal: AbortSignal | undefined) =>
  axiosClient({
    url: "/api/project-management/admin/projects/analyzation",
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const getAdminProjectsStatus = async (signal: AbortSignal | undefined) =>
  axiosClient({
    url: "/api/project-management/projects/status",
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const getAdminUsersAnalyzationByUserId = async (
  signal: AbortSignal | undefined,
  userId: string | undefined
) =>
  axiosClient({
    url: `/api/project-management/projects/analyzation/${userId}`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const getWorkItemListByProjectId = async (
  signal: AbortSignal | undefined,
  projectId: string | undefined,
  queryString: string
) =>
  axiosClient({
    url: `/api/project-management/projects/tasks/${projectId}` + queryString,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const getReportProjectByProjectId = async (
  signal: AbortSignal | undefined,
  projectId: string | undefined
): Promise<IReportProject> =>
  axiosClient({
    url: `/api/project-management/projects/report/${projectId}`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const getListUserInProjectByProjectId = (
  signal: AbortSignal | undefined,
  projectId: string | undefined
): Promise<IProjectMember[]> =>
  axiosClient({
    url: `/api/project-management/projects/${projectId}`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const getLisInterationInProjectByProjectId = (
  signal: AbortSignal | undefined,
  projectId: string | undefined
): Promise<IInteration[]> =>
  axiosClient({
    url: `/api/project-management/projects/interation/${projectId}`,
    method: HTTP_METHODS.GET,
    signal,
  }).then((resp) => resp.data);

const sendEmailInvite = (data: { email: string[]; projectId: string }) =>
  axiosClient({
    url: "/api/project-management/projects/invitation",
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const acceptEmailInvite = (data: {
  email: string;
  invitationId: string;
  projectId: string;
}) =>
  axiosClient({
    url: "/api/project-management/projects/accept-invitation",
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const declineEmailInvite = (data: {
  email: string;
  invitationId: string;
  projectId: string;
}) =>
  axiosClient({
    url: "/api/project-management/projects/decline-invitation",
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const checkEmailInvite = (
  signal: AbortSignal | undefined,
  params: { invationId: string }
): Promise<IInvitationInfo> =>
  axiosClient({
    url: "/api/project-management/projects/check-invitation",
    method: HTTP_METHODS.GET,
    signal,
    params,
  }).then((resp) => resp.data);

const removeMember = (params: { memberId: string }) =>
  axiosClient({
    url: "/api/project-management/projects/remove-member",
    method: HTTP_METHODS.POST,
    params,
  }).then((resp) => resp.data);

const changeProjectSchema = ({
  projectId,
  data,
}: {
  projectId: string;
  data: { schemaId: string };
}) =>
  axiosClient({
    url: `/api/project-management/project/change-schema/${projectId}`,
    method: HTTP_METHODS.PUT,
    data,
  }).then((resp) => resp.data);

const outProject = (data: { projectId: string }) =>
  axiosClient({
    url: "/api/project-management/projects/exit-project",
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

const setDoneProject = (data: { projectId: string }) =>
  axiosClient({
    url: "/api/project-management/projects/close-project",
    method: HTTP_METHODS.POST,
    data,
  }).then((resp) => resp.data);

export const projectApi = {
  create,
  createKey: "projectCreate",
  getListByUser,
  getListByUserKey: "projectGetListByUser",
  getPermission,
  getPermissionKey: "projectGetPermission",
  updateProject,
  updateProjectKey: "updateProject",
  deleteProject,
  deleteProjectKey: "deleteProjectKey",
  getInfo,
  getInfoKey: "projectGetInfo",
  createRole,
  createRoleKey: "projectCreateRole",
  updateMemberRole,
  updateMemberRoleKey: "projectUpdateMemberRole",
  updatePrivacy,
  updatePrivacyKey: "projectUpdatePrivacy",
  restoreProject,
  restoreProjectKey: "restoreProjectKey",
  getWorkItemListByProjectId,
  getWorkItemListByProjectIdKey: "getWorkItemListByProjectIdKey",
  getListUserInProjectByProjectId,
  getListUserInProjectByProjectIdKey: "getListUserInProjectByProjectIdKey",
  getLisInterationInProjectByProjectId,
  getLisInterationInProjectByProjectIdKey:
    "getLisInterationInProjectByProjectIdKey",
  sendEmailInvite,
  sendEmailInviteKey: "sendEmailInviteKey",
  getAdminProjects,
  getAdminProjectsKey: "getAdminProjectsKey",
  getAdminProjectsAnalyzation,
  getAdminProjectsAnalyzationKey: "getAdminProjectsAnalyzationKey",
  getAdminUsersAnalyzationByUserId,
  getAdminUsersAnalyzationByUserIdKey: "getAdminUsersAnalyzationByUserIdKey",
  getAdminProjectsStatus,
  getAdminProjectsStatusKey: "getAdminProjectsStatusKey",
  acceptEmailInvite,
  acceptEmailInviteKey: "acceptEmailInviteKey",
  declineEmailInvite,
  declineEmailInviteKey: "declineEmailInviteKey",
  removeMember,
  removeMemberKey: "removeMemberKey",
  checkEmailInvite,
  checkEmailInviteKey: "checkEmailInviteKey",
  getReportProjectByProjectId,
  getReportProjectByProjectIdKey: "getReportProjectByProjectIdKey",
  changeProjectSchema,
  changeProjectSchemaKey: "changeProjectSchemaKey",
  outProject,
  outProjectKey: "outProjectKey",
  setDoneProject,
  setDoneProjectKey: "setDoneProjectKey",
};
