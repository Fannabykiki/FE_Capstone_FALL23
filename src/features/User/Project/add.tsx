import { useAuthContext } from "@/context/Auth";
import { EProjectStatus, ICreateProjectPayload } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function AddProject() {
  const [form] = Form.useForm();
  const { userInfo } = useAuthContext();
  const initialValues = {
    projectName: "",
    projectStatus: "",
    description: "",
    startDate: dayjs(),
    endDate: dayjs(),
    privacyStatus: "",
    createAt: new Date(),
    createBy: userInfo!.id,
  };

  const { mutate: createProject, isLoading } = useMutation({
    mutationFn: projectApi.create,
    mutationKey: [projectApi.createKey],
    onSuccess: (data, variables, context) => {
      toast.success(`Create project '${variables.projectName}' succeed`);
      form.resetFields();
    },
  });

  const onCreateProject = async (values: ICreateProjectPayload) => {
    createProject(values);
  };

  return (
    <div>
      <Typography.Title level={1}>Create New Project</Typography.Title>
      <div className="flex justify-center">
        <Form<ICreateProjectPayload>
          form={form}
          initialValues={initialValues}
          className="w-2/3"
          layout="vertical"
          onFinish={onCreateProject}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="projectName" label="Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="projectStatus" label="Status">
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
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="privacyStatus"
            label="Privacy"
            valuePropName="checked"
          >
            <Switch />
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
          <Form.Item hidden name="createAt" />
          <Form.Item hidden name="createBy" />
          <div className="text-right">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Confirm
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
