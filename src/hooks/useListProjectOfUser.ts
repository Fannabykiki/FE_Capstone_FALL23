import { useQuery } from "@tanstack/react-query";

import { projectApi } from "@/utils/api/project";
import { useAuthContext } from "@/context/Auth";

export default function useListProjectOfUser() {
  const { userInfo } = useAuthContext();
  const {
    data: projects,
    isLoading,
    refetch: refetchProjects,
  } = useQuery({
    queryKey: [projectApi.getListByUserKey, userInfo?.id],
    queryFn: ({ signal }) => projectApi.getListByUser(signal),
    enabled: Boolean(userInfo),
  });

  return {
    projects,
    isLoading,
    refetchProjects,
  };
}
