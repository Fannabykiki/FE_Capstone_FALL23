import { projectApi } from "@/utils/api/project";
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

  const { mutate: remove, isLoading: isRemoving } = useMutation({
    mutationKey: [projectApi.removeKey],
    mutationFn: projectApi.remove,
  });

  const { mutate: updatePrivacyStatus, isLoading: isUpdatingPrivacyStatus } =
    useMutation({
      mutationKey: [projectApi.updatePrivacyKey],
      mutationFn: projectApi.updatePrivacy,
    });

  return {
    detail,
    isGettingDetail,
    actions: {
      remove,
      isRemoving,
      updatePrivacyStatus,
      isUpdatingPrivacyStatus,
      refetchDetail,
    },
  };
}
