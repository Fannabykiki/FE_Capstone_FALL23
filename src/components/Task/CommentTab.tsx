import { ITask } from "@/interfaces/task";
import AddComment from "./AddComment";
import DisplayComment from "./DisplayComment";
import { IIteration } from "@/interfaces/iteration";
import { useQueryClient } from "@tanstack/react-query";
import { iterationApi } from "@/utils/api/iteration";
import { useParams } from "react-router-dom";

interface Props {
  task: ITask;
}

export default function CommentTab({ task }: Props) {
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const iterations: IIteration[] =
    queryClient.getQueryData([iterationApi.getListKey, projectId]) || [];
  const currentIteration = iterations?.find(
    (iteration) => iteration.interationName === task?.interationName
  );
  return (
    <div>
      <AddComment task={task} />
      <div className="mt-8 flex flex-col gap-2">
        {task.commentResponse
          ?.sort((a, b) => (a.createAt < b.createAt ? 1 : -1))
          .map((comment) => (
            <DisplayComment
              currentIteration={currentIteration}
              task={task}
              comment={comment}
              key={comment.commentId}
            />
          ))}
      </div>
    </div>
  );
}
