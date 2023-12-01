import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useParams, useSearchParams } from "react-router-dom";
import { Select, Typography } from "antd";
import useDetailView from "@/hooks/useDetailView";
import useProjectDetail from "@/hooks/useProjectDetail";
import { IIteration } from "@/interfaces/iteration";
import KanbanDisplay from "@/components/Kanban";
import { CreateIteration } from "@/components";

export enum TaskType {
  Main = "Work Item",
  Bug = "Bug",
  Task = "Task",
}
const Kanban = () => {
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
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sprintId = searchParams.get("sprint");
    if (iterations && iterations.length > 0) {
      if (sprintId) {
        setSelectedIteration(
          iterations.find((iteration) => iteration.interationId === sprintId) ||
            iterations[0]
        );
      } else {
        const newSearchParams = new URLSearchParams();
        newSearchParams.set(
          "sprint",
          (
            iterations.find((iteration) => iteration.status === "Current") ||
            iterations[0]
          ).interationId
        );
        setSearchParams(newSearchParams);
      }
    }
  }, [searchParams, iterations, setSearchParams]);

  const onChangeIteration = (value: string) => {
    if (value === "new") {
      onOpenCreateIterationModal();
    } else {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("sprint", value);
      setSearchParams(newSearchParams);
    }
  };

  return (
    <>
      <div className="flex gap-x-2 items-center mb-4">
        <label>Select sprint:</label>
        <Select
          className="min-w-[400px]"
          options={[
            {
              label: (
                <div className="flex gap-x-2">
                  <PlusOutlined />
                  <span>New sprint</span>
                </div>
              ),
              value: "new",
            },
            ...(iterations || []).map((iteration) => ({
              label: (
                <div className="flex items-center justify-between">
                  <span>{iteration.interationName}</span>
                  <span className="text-xs bg-neutral-100 px-2 rounded-full">
                    {iteration.status}
                  </span>
                </div>
              ),
              value: iteration.interationId,
            })),
          ]}
          loading={actions.isGettingIterations}
          value={selectedIteration?.interationId || null}
          onChange={onChangeIteration}
        />
      </div>
      <Typography.Title>Kanban</Typography.Title>
      {selectedIteration ? (
        <KanbanDisplay iterationId={selectedIteration.interationId} />
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

export default Kanban;
