import useTaskActions from "@/hooks/useTaskActions";
import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import { projectApi } from "@/utils/api/project";
import { taskApi } from "@/utils/api/task";
import {
  ICreateTaskRequest,
  IGetTypeListResponse,
  ITaskStatus,
} from "@/interfaces/task";

const { TextArea } = Input;

interface Props {
  isOpen: boolean;
  handleClose: VoidFunction;
  initTaskData?: Partial<ICreateTaskRequest>;
  onSuccess: VoidFunction;
}

export default function UpdateTask({
  isOpen,
  handleClose,
  initTaskData = {},
  onSuccess,
}: Props) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { projectId } = useParams();

  const { updateTaskMutation } = useTaskActions();

  const { data: priorityList } = useQuery({
    queryKey: [taskApi.getTaskPriorityKey, projectId],
    queryFn: async ({ signal }) => taskApi.getTaskPriority(signal),
    enabled: Boolean(isOpen) && Boolean(projectId),
  });

  const typeList = queryClient.getQueryData<IGetTypeListResponse[]>([
    taskApi.getTaskTypeKey,
  ]);

  const statusList =
    queryClient.getQueryData<ITaskStatus[]>([
      taskApi.getTaskStatusKey,
      projectId,
    ]) || [];

  const { data: memberList } = useQuery({
    queryKey: [projectApi.getListUserInProjectByProjectIdKey, projectId],
    queryFn: async ({ signal }) =>
      projectApi.getListUserInProjectByProjectId(signal, projectId),
    enabled: Boolean(isOpen) && Boolean(projectId),
  });

  const { data: interationList, isLoading: isLoadingIterations } = useQuery({
    queryKey: [projectApi.getLisInterationInProjectByProjectIdKey, projectId],
    queryFn: async ({ signal }) =>
      projectApi.getLisInterationInProjectByProjectId(signal, projectId),
    enabled: Boolean(isOpen) && Boolean(projectId),
  });

  const onCancel = () => {
    form.resetFields();
    handleClose();
  };

  const onSubmit = (values: ICreateTaskRequest) => {
    if (!projectId) return;
    updateTaskMutation.mutate(values, {
      onSuccess: async () => {
        onSuccess();
        toast.success("Edit task successfully");
        handleClose();
      },
      onError: (err: any) => {
        console.error(err);
        toast.error(err.response?.data || "Edit task failed");
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      form.setFieldValue(
        "statusId",
        statusList.find((status) => status.title === "To do")?.boardStatusId
      );
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, statusList]);

  const initialValues = useMemo(() => {
    const values = {
      ...initTaskData,
      startDate: dayjs(initTaskData.startDate),
      dueDate: dayjs(initTaskData.dueDate),
    };
    return values;
  }, [initTaskData]);

  useEffect(() => {
    if (priorityList) {
      const selectingPriority = priorityList.find(
        (priority) => priority.title === initTaskData.priorityName
      )?.levelId;
      form.setFieldValue("priorityId", selectingPriority);
    }
  }, [priorityList, form, initTaskData]);

  useEffect(() => {
    if (interationList) {
      const selectingIteration = interationList.find(
        (interation) =>
          interation.interationName === initTaskData.interationName
      )?.interationId;
      form.setFieldValue("interationId", selectingIteration);
    }
  }, [interationList, form, initTaskData]);

  return (
    <Modal
      title="Edit Task"
      onCancel={onCancel}
      open={isOpen}
      onOk={form.submit}
      okButtonProps={{
        loading: updateTaskMutation.isLoading,
      }}
      okText="Save"
      width="35vw"
    >
      <Form
        className="w-full"
        layout="vertical"
        form={form}
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Interation"
          name="interationId"
          rules={[{ required: true, message: "Interation is required" }]}
        >
          <Select
            options={interationList?.map((interation) => ({
              label: interation.interationName,
              value: interation.interationId,
            }))}
            disabled={Boolean(initTaskData.interationId)}
            loading={isLoadingIterations}
          />
        </Form.Item>
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item
              label="Type"
              name="typeId"
              rules={[{ required: true, message: "Type is required" }]}
            >
              <Select
                options={typeList?.map((type) => ({
                  label: type.title,
                  value: type.typeId,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="State" name="statusId">
              <Select
                disabled
                options={statusList?.map((status) => ({
                  label: status.title,
                  value: status.boardStatusId,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Priority"
              name="priorityId"
              rules={[{ required: true, message: "Priority is required" }]}
            >
              <Select
                options={priorityList?.map((priority) => ({
                  label: priority.title,
                  value: priority.levelId,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Assign To"
          name="assignTo"
          rules={[{ required: true, message: "Assign To is required" }]}
        >
          <Select
            size="large"
            allowClear
            options={memberList?.map((member) => ({
              label: member.fullname,
              value: member.memberId,
            }))}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Start Date is required" }]}
            >
              <DatePicker
                className="w-full"
                disabledDate={(current) =>
                  current &&
                  form.getFieldValue("dueDate") &&
                  dayjs(form.getFieldValue("dueDate")).isBefore(current)
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Due Date"
              name="dueDate"
              rules={[{ required: true, message: "Due Date is required" }]}
            >
              <DatePicker
                className="w-full"
                disabledDate={(current) =>
                  current &&
                  form.getFieldValue("startDate") &&
                  dayjs(form.getFieldValue("startDate")).isAfter(current)
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Description" name="description">
          <TextArea showCount maxLength={100} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
