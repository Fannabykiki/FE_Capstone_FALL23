import useErrorMessage from "@/hooks/useErrorMessage";
import useListProjectOfUser from "@/hooks/useListProjectOfUser";
import {
  EProjectPrivacyStatusLabel,
  ICreateProjectPayload,
} from "@/interfaces/project";
import { IErrorInfoState } from "@/interfaces/shared/state";
import { projectApi } from "@/utils/api/project";
import { lowerCaseFirstLetter } from "@/utils/common";
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
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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
  const { errorInfo, setErrorInfo } = useErrorMessage();

  const { refetchProjects } = useListProjectOfUser();

  const { mutate: createProject, isLoading } = useMutation({
    mutationFn: projectApi.create,
    mutationKey: [projectApi.createKey],
    onSuccess: (_, variables) => {
      toast.success(`Create project '${variables.projectName}' succeed`);
      refetchProjects();
      onClose();
    },
    onError: (err: AxiosError<any>) => {
      console.error(err);
      if (err.response?.data) {
        if (err.response.data.errors) {
          form.setFields(
            Object.entries(err.response.data.errors).map(([key, value]) => ({
              name: lowerCaseFirstLetter(key),
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
      maskClosable={false}
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
        {errorInfo.isError && (
          <Typography.Paragraph className="text-center text-red-400 font-semibold">
            {errorInfo.message}
          </Typography.Paragraph>
        )}
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
