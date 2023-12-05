import React from "react";
import { Typography } from "antd";
import KanbanDisplay from "@/components/Kanban";

export enum TaskType {
  Main = "Work Item",
  Bug = "Bug",
  Task = "Task",
}
const Kanban = () => {
  return (
    <>
      <React.Fragment>
        <div className="flex justify-between items-center mb-4">
          <Typography.Title className="flex gap-x-2 !mb-0">
            Kanban
          </Typography.Title>
        </div>
        <KanbanDisplay />
      </React.Fragment>
    </>
  );
};

export default Kanban;
