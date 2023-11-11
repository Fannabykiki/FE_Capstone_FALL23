import useListProjectOfUser from "@/hooks/useListProjectOfUser";
import {
  EProjectPrivacyStatusLabel,
  ICreateProjectPayload,
} from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { useMutation } from "@tanstack/react-query";
import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Switch,
} from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export default function CreateProject({ open, onClose }: Props) {
  const [form] = Form.useForm();
  const initialValues = {
    projectName: "",
    description: "",
    startDate: dayjs(),
    endDate: dayjs(),
    privacyStatus: true,
  };

  const { refetchProjects } = useListProjectOfUser();

  const { mutate: createProject, isLoading } = useMutation({
    mutationFn: projectApi.create,
    mutationKey: [projectApi.createKey],
    onSuccess: (_, variables) => {
      toast.success(`Create project '${variables.projectName}' succeed`);
      refetchProjects();
      onClose();
    },
  });

  const onCreateProject = async () => {
    try {
      const values = await form.validateFields();
      createProject(values);
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal
      open={open}
      onOk={onCreateProject}
      okText="Create"
      okButtonProps={{ loading: isLoading }}
      onCancel={onClose}
      title="Create new Project"
    >
      <Form<ICreateProjectPayload>
        form={form}
        initialValues={initialValues}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="projectName"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter the project name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="privacyStatus"
              label="Privacy"
              valuePropName="checked"
            >
              <Switch
                checkedChildren={EProjectPrivacyStatusLabel.Public}
                unCheckedChildren={EProjectPrivacyStatusLabel.Private}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
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
        {/* <Form.Item hidden name="createAt" />
        <Form.Item hidden name="createBy" /> */}
      </Form>
    </Modal>
  );
}
