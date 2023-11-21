import { IIteration } from "@/interfaces/iteration";
import { iterationApi } from "@/utils/api/iteration";
import { useMutation } from "@tanstack/react-query";
import { Input } from "antd";
import { pick } from "lodash";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  iteration: IIteration;
}

export default function DisplayName({ iteration }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(iteration.interationName);

  const { mutate: updateIteration } = useMutation({
    mutationKey: [iterationApi.updateKey],
    mutationFn: iterationApi.update,
    onSettled: () => setIsEditing(false),
    onSuccess: (err) => {
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
      ]);
      updateIteration({
        id: iteration.interationId,
        data: { ...newIterationData, interationName: newName },
      });
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
