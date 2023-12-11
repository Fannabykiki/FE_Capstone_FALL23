import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useParams, useSearchParams } from "react-router-dom";
import { Select, Typography } from "antd";
import useDetailView from "@/hooks/useDetailView";
import { CreateIteration } from "@/components/Modal";
import useProjectDetail from "@/hooks/useProjectDetail";
import { IIteration } from "@/interfaces/iteration";
import {
  IterationDisplay,
  IterationDisplayDate,
  IterationDisplayName,
} from "@/components";
import { classNames } from "@/utils/common";

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
        setSearchParams((prev) => {
          prev.set(
            "sprint",
            (
              iterations.find((iteration) => iteration.status === "Current") ||
              iterations[0]
            ).interationId
          );
          return prev;
        });
      }
    }
  }, [searchParams, iterations, setSearchParams]);

  const onChangeIteration = (value: string) => {
    if (value === "new") {
      onOpenCreateIterationModal();
    } else {
      setSearchParams((prev) => {
        prev.set("sprint", value);
        return prev;
      });
    }
  };

  return (
    <>
      <div className="flex gap-x-2 items-center mb-4">
        <label>Select sprint:</label>
        <Select
          showSearch
          className="min-w-[400px]"
          optionFilterProp="searchValue"
          options={[
            ...(iterations || []).map((iteration) => ({
              searchValue: iteration.interationName,
              label: (
                <div className="flex items-center justify-between">
                  <span>{iteration.interationName}</span>
                  <span
                    className={classNames(
                      "text-xs px-2 py-0.5 rounded-full",
                      iteration.status === "Current"
                        ? "bg-blue-400 text-white"
                        : "bg-neutral-100"
                    )}
                  >
                    {iteration.status}
                  </span>
                </div>
              ),
              value: iteration.interationId,
            })),
            {
              label: (
                <div className="flex gap-x-2">
                  <PlusOutlined />
                  <span>New sprint</span>
                </div>
              ),
              value: "new",
            },
          ]}
          loading={actions.isGettingIterations}
          value={selectedIteration?.interationId || null}
          onChange={onChangeIteration}
        />
      </div>
      {selectedIteration ? (
        <React.Fragment key={selectedIteration.interationId}>
          <div className="flex justify-between items-center mb-4">
            <Typography.Title className="flex gap-x-2 !mb-0">
              <IterationDisplayName iteration={selectedIteration} />
            </Typography.Title>
            <div>
              <IterationDisplayDate
                iteration={selectedIteration}
                property="startDate"
              />
              {" - "}
              <IterationDisplayDate
                iteration={selectedIteration}
                property="endDate"
              />
            </div>
          </div>
          <IterationDisplay iterationId={selectedIteration.interationId} />
        </React.Fragment>
      ) : (
        <Typography.Paragraph>No sprint selected</Typography.Paragraph>
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
