import { Button, Input } from "antd";
import AvatarWithColor from "../AvatarWithColor";
import { useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { ITask } from "@/interfaces/task";
import useCommentActions from "@/hooks/useCommentActions";

interface Props {
  task: ITask;
}

export default function AddComment({ task }: Props) {
  const [isCommenting, setIsCommenting] = useState(false);

  const [comment, setComment] = useState("");

  const { createCommentMutation } = useCommentActions();

  const onSubmit = () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment.");
      return;
    }
    createCommentMutation.mutate(
      {
        taskId: task.taskId,
        content: comment,
      },
      {
        onSuccess: () => {
          toast.success("Create new comment succeed");
          onCancelComment();
        },
        onError: (err) => {
          console.error(err);
          toast.error("Create comment failed! Please try again later");
        },
      }
    );
  };

  const onStartComment = () => {
    setIsCommenting(true);
    setComment("");
  };

  const onCancelComment = () => {
    setIsCommenting(false);
    setComment("");
  };

  if (!isCommenting) {
    return (
      <div className="flex gap-x-2">
        <AvatarWithColor stringContent="T">T</AvatarWithColor>
        <Input.TextArea placeholder="Add a comment" onFocus={onStartComment} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-x-2">
        <AvatarWithColor stringContent="T">T</AvatarWithColor>
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
