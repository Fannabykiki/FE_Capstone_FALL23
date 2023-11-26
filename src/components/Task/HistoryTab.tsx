import { ITask } from "@/interfaces/task";
import { DATETIME_FORMAT } from "@/utils/constants";
import dayjs from "dayjs";

interface Props {
  task: ITask;
}

export default function HistoryTab({ task }: Props) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        {task.taskHistories
          ?.sort((a, b) => (a.changeAt < b.changeAt ? 1 : -1))
          .map((history) => (
            <div key={history.historyId}>
              - {history.title} -{" "}
              {dayjs(history.changeAt).format(DATETIME_FORMAT)}
            </div>
          ))}
      </div>
    </div>
  );
}
