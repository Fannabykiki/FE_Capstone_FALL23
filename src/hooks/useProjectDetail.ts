import { projectApi } from "@/utils/api/project";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useProjectDetail(projectId: string | undefined) {
  const { data: detail, isLoading: isGettingDetail } = useQuery({
    queryKey: [projectApi.getInfoKey, projectId],
    queryFn: ({ signal }) => projectApi.getInfo(signal, projectId!),
    enabled: Boolean(projectId),
  });

  const { data: members, isLoading: isGettingMembers } = useQuery({
    queryKey: [projectApi.getDetailKey, projectId],
    queryFn: ({ signal }) => projectApi.getDetail(signal, projectId!),
    enabled: Boolean(projectId),
  });

  const { mutate: remove, isLoading: isRemoving } = useMutation({
    mutationKey: [projectApi.removeKey],
    mutationFn: projectApi.remove,
  });

  return {
    detail,
    isGettingDetail,
    members,
    isGettingMembers,
    actions: {
      remove,
      isRemoving,
    },
  };
}
