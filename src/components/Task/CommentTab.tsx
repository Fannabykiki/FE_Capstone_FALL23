import { ITask } from "@/interfaces/task";
import AddComment from "./AddComment";
import DisplayComment from "./DisplayComment";

interface Props {
  task: ITask;
}

export default function CommentTab({ task }: Props) {
  return (
    <div>
      <AddComment taskId={task.taskId} />
      <div className="mt-8 flex flex-col gap-2">
        {task.commentResponse
          ?.sort((a, b) => (a.createAt < b.createAt ? 1 : -1))
          .map((comment) => (
            <DisplayComment
              task={task}
              comment={comment}
              key={comment.commentId}
            />
          ))}
      </div>
    </div>
  );
}
