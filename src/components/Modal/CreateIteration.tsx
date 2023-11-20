import { ICreateIterationPayload } from "@/interfaces/iteration";
import { paths } from "@/routers/paths";
import { iterationApi } from "@/utils/api/iteration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Col, DatePicker, Form, Input, Modal, Row } from "antd";
import dayjs from "dayjs";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export default function CreateIteration({ open, onClose }: Props) {
  const [form] = Form.useForm();
  const initialValues = {
    interationName: "",
    startDate: dayjs(),
    endDate: dayjs(),
  };

  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!projectId) {
      navigate(paths.user);
    }
  }, [projectId, navigate]);

  const { mutate: createProject, isLoading } = useMutation({
    mutationFn: iterationApi.create,
    mutationKey: [iterationApi.createKey],
    onSuccess: (_, variables) => {
      toast.success(`Create Iteration '${variables.interationName}' succeed`);
      queryClient.refetchQueries({
        queryKey: [iterationApi.getListKey, projectId],
      });
      onClose();
    },
  });

  const onCreate = async () => {
    try {
      const values = await form.validateFields();
      createProject({ ...values, projectId });
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal
      open={open}
      onOk={onCreate}
      okText="Create"
      okButtonProps={{ loading: isLoading }}
      onCancel={onClose}
      title="Create new Iteration"
    >
      <Form<ICreateIterationPayload>
        form={form}
        initialValues={initialValues}
        layout="vertical"
      >
        <Form.Item
          name="interationName"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter the iteration name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[
                {
                  required: true,
                  message: "Please select the start date",
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="endDate"
              label="End Date"
              dependencies={["startDate"]}
              rules={[
                {
                  required: true,
                  message: "Please select the end date",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("startDate").isBefore(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("End date must be after start date")
                    );
                  },
                }),
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
