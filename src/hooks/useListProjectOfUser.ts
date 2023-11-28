import { useAuthContext } from "@/context/Auth";
import { projectApi } from "@/utils/api/project";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";

export default function useListProjectOfUser() {
  const { userInfo } = useAuthContext();
  const {
    data: projects,
    isLoading,
    refetch: refetchProjects,
  } = useQuery({
    queryKey: [projectApi.getListByUserKey, userInfo?.id],
    queryFn: async ({ signal }) => {
      const data = await projectApi.getListByUser(signal);
      return data.map((project) => ({
        ...project,
        bgColor: faker.color.rgb(),
      }));
    },
    enabled: Boolean(userInfo),
  });

  return {
    projects,
    isLoading,
    refetchProjects,
  };
}
