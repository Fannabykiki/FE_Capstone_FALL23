import { iterationApi } from "@/utils/api/iteration";
import { projectApi } from "@/utils/api/project";
import { taskApi } from "@/utils/api/task";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useProjectDetail(projectId: string | undefined) {
  const {
    data: detail,
    isLoading: isGettingDetail,
    refetch: refetchDetail,
  } = useQuery({
    queryKey: [projectApi.getInfoKey, projectId],
    queryFn: ({ signal }) => projectApi.getInfo(signal, projectId!),
    enabled: Boolean(projectId),
  });

  const {
    data: iterations,
    refetch: refetchIterations,
    isLoading: isGettingIterations,
  } = useQuery({
    queryKey: [iterationApi.getListKey, projectId],
    queryFn: ({ signal }) => iterationApi.getList(signal, projectId!),
    enabled: Boolean(projectId),
    placeholderData: [],
  });

  const { mutate: updatePrivacyStatus, isLoading: isUpdatingPrivacyStatus } =
    useMutation({
      mutationKey: [projectApi.updatePrivacyKey],
      mutationFn: projectApi.updatePrivacy,
    });

  return {
    detail,
    iterations,
    actions: {
      isGettingDetail,
      updatePrivacyStatus,
      isUpdatingPrivacyStatus,
      refetchDetail,
      refetchIterations,
      isGettingIterations,
    },
  };
}
