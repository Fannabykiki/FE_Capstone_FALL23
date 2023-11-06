import { useQuery } from "@tanstack/react-query";

import { IAdminUsers } from "@/interfaces/user";
import { useAuthContext } from "@/context/Auth";
import { userApi } from "@/utils/api/user";

interface Params {
  [key: string]: string | undefined;
}

export default function useAdminUserManagement(params: Params) {
  const { userInfo } = useAuthContext();

  const { data: users, isLoading } = useQuery<IAdminUsers>({
    queryKey: [userApi.getAdminUsersKey, userInfo?.id],
    queryFn: ({ signal }) => userApi.getAdminUsers(signal, params),
    enabled: Boolean(userInfo),
  });

  return {
    users,
    isLoading,
  };
}
