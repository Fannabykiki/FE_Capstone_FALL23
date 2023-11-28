import { commentApi } from "@/utils/api/comment";
import { useMutation } from "@tanstack/react-query";

export default function useCommentActions() {
  const createCommentMutation = useMutation({
    mutationKey: [commentApi.createKey],
    mutationFn: commentApi.create,
  });

  const updateCommentMutation = useMutation({
    mutationKey: [commentApi.updateKey],
    mutationFn: commentApi.update,
  });

  const deleteCommentMutation = useMutation({
    mutationKey: [commentApi.removeKey],
    mutationFn: commentApi.remove,
  });

  const replyCommentMutation = useMutation({
    mutationKey: [commentApi.replyKey],
    mutationFn: commentApi.reply,
  });

  return {
    createCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
    replyCommentMutation,
  };
}
