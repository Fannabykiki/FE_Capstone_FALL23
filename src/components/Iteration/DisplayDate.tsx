import { IIteration } from "@/interfaces/iteration";
import { DATE_FORMAT } from "@/utils/constants";
import dayjs from "dayjs";
import { useState } from "react";

interface Props {
  iteration: IIteration;
}

export default function DisplayDate({ iteration }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState({
    startDate: dayjs(iteration.startDate),
    endDate: dayjs(iteration.endDate),
  });

  if (!isEditing) {
    return (
      <span className="text-xl">
        {newDate.startDate.format(DATE_FORMAT)} -{" "}
        {newDate.endDate.format(DATE_FORMAT)}
      </span>
    );
  }
  return <></>;
}
