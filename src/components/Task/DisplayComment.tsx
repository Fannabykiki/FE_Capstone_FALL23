import { IComment } from "@/interfaces/comment";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import AvatarWithColor from "../AvatarWithColor";
import { useState } from "react";
import AddComment from "./AddComment";
import { ITask } from "@/interfaces/task";
import { useAuthContext } from "@/context/Auth";
import useCommentActions from "@/hooks/useCommentActions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { taskApi } from "@/utils/api/task";
import { iterationApi } from "@/utils/api/iteration";
import { IIteration } from "@/interfaces/iteration";
import { projectApi } from "@/utils/api/project";
import { IProject } from "@/interfaces/project";
import { useParams } from "react-router-dom";

interface Props {
  comment: IComment;
  task: ITask;
  currentIteration: IIteration | undefined;
}

export default function DisplayComment({
  comment,
  task,
  currentIteration,
}: Props) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const parentComment = comment.replyTo
    ? task.commentResponse?.find((_c) => _c.commentId === comment.replyTo)
    : comment;

  const { userInfo } = useAuthContext();

  const { deleteCommentMutation } = useCommentActions();
  const queryClient = useQueryClient();

  const { projectId } = useParams();

  const onDelete = () => {
    Modal.confirm({
      title: "Delete comment",
      content: "Are you sure to delete this comment?",
      onOk: () =>
        deleteCommentMutation.mutate(comment.commentId, {
          onSuccess: async () => {
            toast.success("Delete comment succeed!");
            await queryClient.refetchQueries({
              queryKey: [taskApi.getDetailKey, comment.taskId],
            });
            await queryClient.refetchQueries({
              queryKey: [
                iterationApi.getTasksKey,
                currentIteration?.interationId || "",
              ],
            });
            await queryClient.invalidateQueries({
              queryKey: [taskApi.getKanbanTasksKey, projectId],
            });
          },
          onError: (err: any) => {
            console.error(err);
            toast.error("Delete comment failed! Please try again later");
          },
        }),
    });
  };

  return (
    <div className="flex gap-x-2">
      <AvatarWithColor
        stringContent={comment.user.userName || comment.user.email || "Unknown"}
        className="flex-shrink-0"
      >
        {(comment.user.userName || comment.user.email)[0].toUpperCase()}
      </AvatarWithColor>
      <div className="flex-grow">
        {isEditing ? (
          <>
            <AddComment
              task={task}
              parentComment={comment}
              isEditing
              onCancel={() => setIsEditing(false)}
            />
          </>
        ) : (
          <>
            <div className="flex gap-x-2">
              <span className="font-semibold">
                {comment.user.userName || comment.user.email}
              </span>
              <span>{dayjs(comment.createAt).fromNow()}</span>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: comment.content }}
              className="border-0 border-l-2 border-solid border-neutral-200 pl-2"
            />
            {!task?.isDelete && (
              <div className="flex gap-x-2">
                <Button type="text" onClick={() => setIsReplying(true)}>
                  Reply
                </Button>
                {userInfo!.id === comment.user.userId && (
                  <>
                    <Button type="text" onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                    <Button type="text" onClick={() => onDelete()}>
                      Delete
                    </Button>
                  </>
                )}
              </div>
            )}
          </>
        )}
        <div className="mt-4">
          {isReplying && (
            <AddComment
              task={task}
              parentComment={parentComment}
              onCancel={() => setIsReplying(false)}
            />
          )}
          {comment.subComments?.map((subComment) => (
            <DisplayComment
              task={task}
              comment={subComment}
              key={subComment.commentId}
              currentIteration={currentIteration}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
