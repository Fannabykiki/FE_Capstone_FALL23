import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { Select, Typography } from "antd";
import useDetailView from "@/hooks/useDetailView";
import { CreateIteration } from "@/components/Modal";
import useProjectDetail from "@/hooks/useProjectDetail";
import { IIteration } from "@/interfaces/iteration";
import { IterationDisplay } from "@/components";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/utils/constants";

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

  const onChangeIteration = (value: string) => {
    if (value === "new") {
      onOpenCreateIterationModal();
    } else {
      setSelectedIteration(
        iterations?.find((iteration) => iteration.interationId === value)
      );
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
      {selectedIteration ? (
        <>
          <div className="flex justify-between items-center">
            <Typography.Title>
              Sprints {selectedIteration.interationName}
            </Typography.Title>
            <span className="text-xl">
              {dayjs(selectedIteration.startDate).format(DATE_FORMAT)} -{" "}
              {dayjs(selectedIteration.endDate).format(DATE_FORMAT)}
            </span>
          </div>
          <IterationDisplay iterationId={selectedIteration.interationId} />
        </>
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
