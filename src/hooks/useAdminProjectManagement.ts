import { useQuery } from "@tanstack/react-query";

import { IAdminProject, IAdminProjectAnalyzation } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { useAuthContext } from "@/context/Auth";
import { randomBgColor } from "@/utils/random";

interface Params {
  [key: string]: string | undefined;
}

export default function useAdminProjectManagement(params: Params) {
  const { userInfo } = useAuthContext();

  const { data: project, isLoading: isLoadingGetAdminProjects } = useQuery<
    IAdminProject[]
  >({
    queryKey: [projectApi.getAdminProjectsKey, userInfo?.id, params],
    queryFn: async ({ signal }) => {
      const data: IAdminProject[] = await projectApi.getAdminProjects(
        signal,
        params
      );

      return data.map((prj) => ({
        ...prj,
        manager: { ...prj.manager, avatarColor: randomBgColor() },
        member: prj.member.map((mem) => ({
          ...mem,
          avatarColor: randomBgColor(),
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

  const isLoading =
    isLoadingGetAdminProjects || isLoadingGetAdminProjectsAnalyzation;

  return {
    project,
    analyzation,
    isLoading,
  };
}
