import useTaskActions from "@/hooks/useTaskActions";
import { useEffect } from "react";
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

export default function CreateTask({
  isOpen,
  handleClose,
  initTaskData = {},
  onSuccess,
}: Props) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { projectId } = useParams();

  const { createTaskMutation, createSubtaskMutation } = useTaskActions();

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
    if (initTaskData.taskId) {
      createSubtaskMutation.mutate(
        {
          ...values,
          taskId: initTaskData.taskId,
        },
        {
          onSuccess: async () => {
            onSuccess();
            toast.success("Create subtask successfully");
            handleClose();
          },
          onError: (err) => {
            console.error(err);
            toast.error("Create subtask failed");
          },
        }
      );
    } else {
      createTaskMutation.mutate(
        { ...values, projectId, prevId: null },
        {
          onSuccess: async () => {
            onSuccess();
            toast.success("Create task successfully");
            handleClose();
          },
          onError: (err) => {
            console.error(err);
            toast.error("Create task failed");
          },
        }
      );
    }
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

  return (
    <Modal
      title="New Task"
      onCancel={onCancel}
      open={isOpen}
      onOk={form.submit}
      okButtonProps={{
        loading:
          createTaskMutation.isLoading || createSubtaskMutation.isLoading,
      }}
      okText="Create"
      width="80vw"
    >
      <Form
        className="w-full"
        layout="vertical"
        form={form}
        onFinish={onSubmit}
        initialValues={initTaskData}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={12}>
          <Col span={6}>
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
          </Col>
          <Col span={6}>
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
          <Col span={6}>
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
          <Col span={6}>
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
