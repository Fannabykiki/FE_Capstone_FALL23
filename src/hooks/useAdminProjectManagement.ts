import { useQuery } from "@tanstack/react-query";
import { faker } from "@faker-js/faker";

import { projectApi } from "@/utils/api/project";
import { useAuthContext } from "@/context/Auth";
import {
  IAdminProject,
  IAdminProjectAnalyzation,
  IProjectStatus,
} from "@/interfaces/project";

interface Params {
  queryString: string;
}

export default function useAdminProjectManagement(params: Params) {
  const { userInfo } = useAuthContext();

  const { data: project, isLoading: isLoadingGetAdminProjects } = useQuery<
    IAdminProject[]
  >({
    queryKey: [
      projectApi.getAdminProjectsKey,
      userInfo?.id,
      params.queryString,
    ],
    queryFn: async ({ signal }) => {
      const data: IAdminProject[] = await projectApi.getAdminProjects(
        signal,
        params.queryString
      );

      return data.map((prj) => ({
        ...prj,
        manager: { ...prj.manager, avatarColor: faker.color.rgb() },
        member: prj.member.map((mem) => ({
          ...mem,
          avatarColor: faker.color.rgb(),
        })),
      }));
    },
    enabled: Boolean(userInfo),
  });

  const { data: analyzation, isLoading: isLoadingGetAdminProjectsAnalyzation } =
    useQuery<IAdminProjectAnalyzation>({
      queryKey: [projectApi.getAdminProjectsAnalyzationKey, userInfo?.id],
      queryFn: ({ signal }) => projectApi.getAdminProjectsAnalyzation(signal),
      enabled: Boolean(userInfo),
    });

  const { data: statusList, isLoading: isLoadingGetProjectStatusOption } =
    useQuery<IProjectStatus[]>({
      queryKey: [projectApi.getAdminProjectsStatusKey, userInfo?.id],
      queryFn: ({ signal }) => projectApi.getAdminProjectsStatus(signal),
      enabled: Boolean(userInfo),
    });

  const isLoading =
    isLoadingGetAdminProjects ||
    isLoadingGetAdminProjectsAnalyzation ||
    isLoadingGetProjectStatusOption;

  return {
    project,
    analyzation,
    statusList,
    isLoading,
  };
}
