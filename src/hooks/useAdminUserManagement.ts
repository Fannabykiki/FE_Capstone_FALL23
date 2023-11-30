import { useQuery } from "@tanstack/react-query";

import { IAdminUsers, IAdminUsersAnalyzation } from "@/interfaces/user";
import { useAuthContext } from "@/context/Auth";
import { userApi } from "@/utils/api/user";

interface Params {
  queryString: string;
}

export default function useAdminUserManagement(params: Params) {
  const { userInfo } = useAuthContext();

  const { data: users, isLoading: isLoadingGetAdminUsers } = useQuery<
    IAdminUsers[]
  >({
    queryKey: [userApi.getAdminUsersKey, userInfo?.id, params.queryString],
    queryFn: ({ signal }) => userApi.getAdminUsers(signal, params.queryString),
    enabled: Boolean(userInfo),
  });

  const { data: analyzation, isLoading: isLoadingGetAdminUsersAnalyzation } =
    useQuery<IAdminUsersAnalyzation>({
      queryKey: [userApi.getAdminUsersAnalyzationKey, userInfo?.id],
      queryFn: ({ signal }) => userApi.getAdminUsersAnalyzation(signal),
      enabled: Boolean(userInfo),
    });

  const isLoading = isLoadingGetAdminUsers || isLoadingGetAdminUsersAnalyzation;

  return {
    users,
    analyzation,
    isLoading,
  };
}
