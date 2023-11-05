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
  Typography,
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
    privacyStatus: false,
  };

  const { mutate: createProject, isLoading } = useMutation({
    mutationFn: projectApi.create,
    mutationKey: [projectApi.createKey],
    onSuccess: (_, variables) => {
      toast.success(`Create project '${variables.projectName}' succeed`);
      onClose();
    },
  });

  const onCreateProject = async () => {
    const values = await form.validateFields();
    createProject(values);
  };

  return (
    <Modal
      open={open}
      onOk={onCreateProject}
      okText="Create"
      okButtonProps={{ loading: isLoading }}
      onCancel={onClose}
    >
      <Typography.Title level={1}>Create New Project</Typography.Title>
      <Form<ICreateProjectPayload>
        form={form}
        initialValues={initialValues}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="projectName" label="Name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* <Form.Item name="projectStatus" label="Status">
              <Select
                options={[
                  {
                    label: "Open",
                    value: EProjectStatus.Open,
                  },
                  {
                    label: "Close",
                    value: EProjectStatus.Close,
                  },
                ]}
              />
            </Form.Item> */}
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
            <Form.Item name="startDate" label="Start Date">
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="endDate" label="End Date">
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
