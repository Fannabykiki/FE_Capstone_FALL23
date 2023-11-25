import useErrorMessage from "@/hooks/useErrorMessage";
import { ICreateStatusPayload, ITaskStatus } from "@/interfaces/task";
import { taskApi } from "@/utils/api/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, Typography } from "antd";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export default function CreateStatus({ open, onClose }: Props) {
  const [form] = Form.useForm();
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const statusList =
    queryClient.getQueryData<ITaskStatus[]>([
      taskApi.getTaskStatusKey,
      projectId,
    ]) || [];

  const initialValues = {
    title: "",
    order: 1,
    projectId,
  };
  const { errorInfo, setErrorInfo } = useErrorMessage();

  const { mutate: createStatus, isLoading } = useMutation({
    mutationFn: taskApi.createTaskStatus,
    mutationKey: [taskApi.createTaskStatusKey],
    onSuccess: async (_, variables) => {
      toast.success(`Create status '${variables.title}' succeed`);
      await queryClient.invalidateQueries({
        queryKey: [taskApi.getTaskStatusKey, projectId],
      });
      await queryClient.refetchQueries({
        queryKey: [taskApi.getTaskStatusKey, projectId],
      });
      onClose();
    },
    onError: (err: AxiosError<any>) => {
      console.error(err);
      if (err.response?.data) {
        if (err.response.data.errors) {
          form.setFields(
            Object.entries(err.response.data.errors).map(([key, value]) => ({
              name: key.toLowerCase(),
              errors: [value] as string[],
            }))
          );
        } else if (typeof err.response.data === "string") {
          setErrorInfo({
            isError: true,
            message: err.response.data,
          });
        }
      }
      toast.error(
        err.response?.data || "Create status failed! Please try again later"
      );
    },
  });

  const onCreateStatus = async () => {
    try {
      const values = await form.validateFields();
      createStatus({ ...values, projectId });
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  useEffect(() => {
    if (statusList?.length > 0) {
      form.setFieldValue("order", statusList.length + 1);
    }
  }, [statusList, form]);

  return (
    <Modal
      open={open}
      onOk={onCreateStatus}
      okText="Create"
      okButtonProps={{ loading: isLoading }}
      onCancel={onClose}
      title="Create new Status"
    >
      <Form<ICreateStatusPayload>
        form={form}
        initialValues={initialValues}
        layout="vertical"
      >
        {errorInfo.isError && (
          <Typography.Paragraph className="text-center text-red-400 font-semibold">
            {errorInfo.message}
          </Typography.Paragraph>
        )}
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please enter the status title",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="order" label="Order">
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
