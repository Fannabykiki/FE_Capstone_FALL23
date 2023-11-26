import { IIteration, IUpdateIterationPayload } from "@/interfaces/iteration";
import { iterationApi } from "@/utils/api/iteration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "antd";
import { pick } from "lodash";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  iteration: IIteration;
}

export default function DisplayName({ iteration }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(iteration.interationName);

  const queryClient = useQueryClient();

  const { projectId } = useParams();

  const { mutate: updateIteration } = useMutation({
    mutationKey: [iterationApi.updateKey],
    mutationFn: iterationApi.update,
    onSettled: () => setIsEditing(false),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [iterationApi.getListKey, projectId],
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Update iteration name failed! Please try again later");
      setNewName(iteration.interationName);
    },
  });

  const onUpdateName = () => {
    if (newName && newName !== iteration.interationName) {
      const newIterationData = pick(iteration, [
        "interationId",
        "startDate",
        "endDate",
        "statusId",
      ]) as IUpdateIterationPayload;
      updateIteration({ ...newIterationData, interationName: newName });
    } else {
      setNewName(iteration.interationName);
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <span
        className="cursor-pointer hover:underline"
        onClick={() => setIsEditing(true)}
      >
        {newName}
      </span>
    );
  }
  return (
    <Input
      autoFocus
      className="w-[500px]"
      onBlur={onUpdateName}
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
    />
  );
}
