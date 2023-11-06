import { useQuery } from "@tanstack/react-query";

import { IAdminProject } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { useAuthContext } from "@/context/Auth";

interface Params {
  [key: string]: string | undefined;
}

export default function useAdminProjectManagement(params: Params) {
  const { userInfo } = useAuthContext();
  const { data: project, isLoading } = useQuery<IAdminProject>({
    queryKey: [projectApi.getAdminProjectsKey, userInfo?.id],
    queryFn: ({ signal }) => projectApi.getAdminProjects(signal, params),
    enabled: Boolean(userInfo),
  });

  return {
    project,
    isLoading,
  };
}
