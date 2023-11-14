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
const TaskBoard = () => {
  const [selectedIteration, setSelectedIteration] = useState<
    IIteration | undefined
  >(undefined);
  const {
    openView: openCreateIterationModal,
    onOpenView: onOpenCreateIterationModal,
    onCloseView: onCloseCreateIterationModal,
  } = useDetailView();
  const { projectId } = useParams();
  const { iterations, actions } = useProjectDetail(projectId);

  useEffect(() => {
    if (iterations && iterations.length > 0) {
      setSelectedIteration(
        iterations.find((iteration) => iteration.status === "Current") ||
          iterations[0]
      );
    }
  }, [iterations]);

  const onChangeIteration = (interationId: string) => {
    setSelectedIteration(
      iterations?.find((iteration) => iteration.interationId === interationId)
    );
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Typography.Title>Sprints</Typography.Title>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => onOpenCreateIterationModal()}
        >
          New Sprint
        </Button>
      </div>
      <div className="flex gap-x-2 items-center mb-4">
        <label>Select sprint:</label>
        <Select
          options={(iterations || []).map((iteration) => ({
            label: iteration.interationName,
            value: iteration.interationId,
          }))}
          loading={actions.isGettingIterations}
          value={selectedIteration?.interationId || null}
          onChange={onChangeIteration}
        />
      </div>
      {selectedIteration ? (
        <IterationDisplay iterationId={selectedIteration.interationId} />
      ) : (
        <Typography.Paragraph>No iteration selected</Typography.Paragraph>
      )}
      {openCreateIterationModal && (
        <CreateIteration
          open={openCreateIterationModal}
          onClose={onCloseCreateIterationModal}
        />
      )}
    </>
  );
};

export default TaskBoard;
