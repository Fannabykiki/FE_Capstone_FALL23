import { IComment } from "@/interfaces/comment";
import { Button } from "antd";
import dayjs from "dayjs";
import AvatarWithColor from "../AvatarWithColor";
import { useState } from "react";
import AddComment from "./AddComment";
import { ITask } from "@/interfaces/task";

interface Props {
  comment: IComment;
  task: ITask;
}

export default function DisplayComment({ comment, task }: Props) {
  const [isReplying, setIsReplying] = useState(false);
  const parentComment = comment.replyTo
    ? task.commentResponse?.find((_c) => _c.commentId === comment.replyTo)
    : comment;

  return (
    <div className="flex gap-x-2">
      <AvatarWithColor
        stringContent={comment.user.userName || comment.user.email || "Unknown"}
        className="flex-shrink-0"
      >
        {(comment.user.userName || comment.user.email)[0].toUpperCase()}
      </AvatarWithColor>
      <div className="flex-grow">
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
        <div className="flex gap-x-2">
          <Button type="text" onClick={() => setIsReplying(true)}>
            Reply
          </Button>
          <Button type="text">Edit</Button>
          <Button type="text">Delete</Button>
        </div>
        <div className="mt-4">
          {isReplying && (
            <AddComment
              taskId={comment.taskId}
              parentComment={parentComment}
              onCancelReplying={() => setIsReplying(false)}
            />
          )}
          {comment.subComments?.map((subComment) => (
            <DisplayComment
              task={task}
              comment={subComment}
              key={subComment.commentId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
