import { useAuthContext } from "@/context/Auth";
import { IProjectMember } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useCheckProjectAdmin() {
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const { userInfo } = useAuthContext();

  const memberList =
    queryClient.getQueryData<IProjectMember[]>([
      projectApi.getListUserInProjectByProjectIdKey,
      projectId,
    ]) || [];
    
  if (!projectId || memberList?.length === 0) {
    return false;
  }
  
  const memberSelfInfo = memberList?.find(
    (member) => member.userId === userInfo!.id
  );

  const adminRoles = ["PO", "System Admin"];

  const isUserAdmin =
    memberSelfInfo?.isOwner ||
    adminRoles.includes(memberSelfInfo?.roleName || "");

  return isUserAdmin;
}
