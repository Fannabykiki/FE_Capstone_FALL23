import { projectApi } from "@/utils/api/project";
import { useQuery } from "@tanstack/react-query";

export default function useProjectDetail(projectId: string) {
  const { data: detail, isLoading: isGettingDetail } = useQuery({
    queryKey: [projectApi.getDetailKey, projectId],
    queryFn: ({ signal }) => projectApi.getDetail(signal, projectId),
  });
}
