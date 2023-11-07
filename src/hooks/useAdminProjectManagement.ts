import { useQuery } from "@tanstack/react-query";

import { IAdminProject, IAdminProjectAnalyzation } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { useAuthContext } from "@/context/Auth";

interface Params {
  [key: string]: string | undefined;
}

export default function useAdminProjectManagement(params: Params) {
  const { userInfo } = useAuthContext();

  const { data: project, isLoading: isLoadingGetAdminProjects } =
    useQuery<IAdminProject>({
      queryKey: [projectApi.getAdminProjectsKey, userInfo?.id, params],
      queryFn: ({ signal }) => projectApi.getAdminProjects(signal, params),
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
