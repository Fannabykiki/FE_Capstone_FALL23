import { IComment } from "@/interfaces/comment";
import { Avatar, Button, Typography } from "antd";
import dayjs from "dayjs";
import AvatarWithColor from "../AvatarWithColor";

interface Props {
  comment: IComment;
}

export default function DisplayComment({ comment }: Props) {
  return (
    <div className="flex gap-x-2">
      <AvatarWithColor
        stringContent={comment.user.fullname || "Unknown"}
        className="flex-shrink-0"
      >
        {(comment.user.fullname ||
          comment.user.userName ||
          comment.user.email)[0].toUpperCase()}
      </AvatarWithColor>
      <div>
        <div className="flex gap-x-2">
          <span className="font-semibold">
            {comment.user.fullname ||
              comment.user.userName ||
              comment.user.email}
          </span>
          <span>{dayjs(comment.createAt).fromNow()}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: comment.content }}
          className="border-0 border-l-2 border-solid border-neutral-200 pl-2"
        />
        <div className="flex gap-x-2">
          <Button type="text">Reply</Button>
          <Button type="text">Edit</Button>
          <Button type="text">Delete</Button>
        </div>
        <div className="mt-4">
          {comment.subComments?.map((subComment) => (
            <DisplayComment comment={subComment} key={subComment.commentId} />
          ))}
        </div>
      </div>
    </div>
  );
}
