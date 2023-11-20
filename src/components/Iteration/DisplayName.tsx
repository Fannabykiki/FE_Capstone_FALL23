import { IIteration } from "@/interfaces/iteration";
import { Input } from "antd";
import { useState } from "react";

interface Props {
  iteration: IIteration;
}

export default function DisplayName({ iteration }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(iteration.interationName);

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
      className="w-[500px]"
      onBlur={() => setIsEditing(false)}
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
    />
  );
}
