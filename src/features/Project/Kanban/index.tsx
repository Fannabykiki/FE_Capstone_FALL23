import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { Button, Select, Typography } from "antd";
import useDetailView from "@/hooks/useDetailView";
import { CreateIteration } from "@/components/Modal";
import useProjectDetail from "@/hooks/useProjectDetail";
import { IIteration } from "@/interfaces/iteration";
import { IterationDisplay } from "@/components";

export enum TaskType {
  Main = "Work Item",
  Bug = "Bug",
  Task = "Task",
}
const Kanban = () => {
  const [selectedIteration, setSelectedIteration] = useState<
    IIteration | undefined
  >(undefined);
  const { projectId } = useParams();
  const { iterations } = useProjectDetail(projectId);

  useEffect(() => {
    if (iterations && iterations.length > 0) {
      setSelectedIteration(
        iterations.find((iteration) => iteration.status === "Current") ||
          iterations[0]
      );
    }
  }, [iterations]);

  return (
    <>
      <Typography.Title>Kanban</Typography.Title>
      {selectedIteration ? (
        <IterationDisplay iterationId={selectedIteration.interationId} />
      ) : (
        <Typography.Paragraph>No iteration selected</Typography.Paragraph>
      )}
    </>
  );
};

export default Kanban;
