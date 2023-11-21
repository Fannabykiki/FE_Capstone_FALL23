import { IIteration } from "@/interfaces/iteration";
import { iterationApi } from "@/utils/api/iteration";
import { DATE_FORMAT } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { pick } from "lodash";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  iteration: IIteration;
  property: keyof IIteration;
}

export default function DisplayDate({ iteration, property }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(dayjs(iteration[property] as string));

  const { mutate: updateIteration } = useMutation({
    mutationKey: [iterationApi.updateKey],
    mutationFn: iterationApi.update,
    onSettled: () => setIsEditing(false),
    onSuccess: (err) => {
      console.error(err);
      toast.error("Update iteration date failed! Please try again later");
      setNewDate(dayjs(iteration[property] as string));
    },
  });

  const onUpdateDate = (date: Dayjs | null) => {
    if (date) {
      const newIterationData = pick(iteration, [
        "interationId",
        "interationName",
        "startDate",
        "endDate",
        "statusId",
      ]);
      updateIteration({
        id: iteration.interationId,
        data: { ...newIterationData, [property]: date.toDate() },
      });
      setNewDate(date);
    } else {
      setNewDate(dayjs(iteration[property] as string));
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <span
        className="text-xl cursor-pointer hover:underline"
        onClick={() => setIsEditing(true)}
      >
        {newDate.format(DATE_FORMAT)}
      </span>
    );
  }
  return (
    <>
      <DatePicker
        value={newDate}
        format={DATE_FORMAT}
        onChange={onUpdateDate}
      />
    </>
  );
}
