import { Button, Input } from "antd";
import AvatarWithColor from "../AvatarWithColor";
import { useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import useCommentActions from "@/hooks/useCommentActions";
import { IComment } from "@/interfaces/comment";
import { useAuthContext } from "@/context/Auth";
import { useQueryClient } from "@tanstack/react-query";
import { taskApi } from "@/utils/api/task";

interface Props {
  taskId: string;
  parentComment?: IComment;
  onCancelReplying?: VoidFunction;
}

export default function AddComment({
  taskId,
  parentComment,
  onCancelReplying,
}: Props) {
  const [isCommenting, setIsCommenting] = useState(false);

  const [comment, setComment] = useState("");

  const { createCommentMutation, replyCommentMutation } = useCommentActions();
  const queryClient = useQueryClient();

  const onSubmit = () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment.");
      return;
    }
    if (!parentComment) {
      // Add comment
      createCommentMutation.mutate(
        {
          taskId,
          content: comment,
        },
        {
          onSuccess: async () => {
            toast.success("Create new comment succeed");
            await queryClient.refetchQueries({
              queryKey: [taskApi.getDetailKey, taskId],
            });
            onCancelComment();
          },
          onError: (err) => {
            console.error(err);
            toast.error("Create comment failed! Please try again later");
          },
        }
      );
    } else {
      // Reply comment
      replyCommentMutation.mutate(
        {
          id: parentComment.commentId,
          data: {
            commentId: parentComment.commentId,
            content: comment,
          },
        },
        {
          onSuccess: async () => {
            toast.success("Reply to comment succeed");
            await queryClient.refetchQueries({
              queryKey: [taskApi.getDetailKey, taskId],
            });
            onCancelComment();
          },
          onError: (err) => {
            console.error(err);
            toast.error("Reply to comment failed! Please try again later");
          },
        }
      );
    }
  };

  const onStartComment = () => {
    setIsCommenting(true);
    setComment("");
  };

  const onCancelComment = () => {
    setIsCommenting(false);
    setComment("");
    onCancelReplying?.();
  };

  const { userInfo } = useAuthContext();

  if (!isCommenting && !parentComment) {
    return (
      <div className="flex gap-x-2">
        <AvatarWithColor
          stringContent={
            userInfo!.fullname ||
            userInfo!.userName ||
            userInfo!.email ||
            "Unknown"
          }
          className="flex-shrink-0"
        >
          {(userInfo!.fullname ||
            userInfo!.userName ||
            userInfo!.email)[0].toUpperCase()}
        </AvatarWithColor>
        <Input.TextArea placeholder="Add a comment" onFocus={onStartComment} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-x-2">
        <AvatarWithColor
          stringContent={
            userInfo!.fullname ||
            userInfo!.userName ||
            userInfo!.email ||
            "Unknown"
          }
        >
          {(userInfo!.fullname ||
            userInfo!.userName ||
            userInfo!.email)[0].toUpperCase()}
        </AvatarWithColor>
        <ReactQuill
          theme="snow"
          value={comment}
          onChange={setComment}
          className="w-full h-fit"
        />
      </div>
      <div className="flex gap-x-2 justify-end mt-4">
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
        <Button onClick={onCancelComment}>Cancel</Button>
      </div>
    </div>
  );
}
