import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import DeleteProject from "./modalDelete";
import useProjectDetail from "@/hooks/useProjectDetail";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { projectApi } from "@/utils/api/project";
import { toast } from "react-toastify";
import { AvatarWithColor } from "@/components";
import { DATE_FORMAT } from "@/utils/constants";
import useCheckProjectAdmin from "@/hooks/useCheckProjectAdmin";

interface IProp {
  isAdminOrPO: boolean;
}

export default function ProjectInformation({ isAdminOrPO }: IProp) {
  const [form] = Form.useForm();
  const { projectId } = useParams();
  const { detail } = useProjectDetail(projectId);

  const [modal, contextHolder] = Modal.useModal();

  const initialValues = {
    projectName: detail?.projectName,
    description: detail?.description,
    startDate: dayjs(detail?.startDate),
    endDate: dayjs(detail?.endDate),
  };

  const { mutate: updateProject, isLoading } = useMutation({
    mutationFn: projectApi.updateProject,
    mutationKey: [projectApi.updateProjectKey],
  });

  const { mutate: setDoneProject, isLoading: isLoadingSetDoneProject } =
    useMutation({
      mutationKey: [projectApi.setDoneProjectKey],
      mutationFn: projectApi.setDoneProject,
      onSuccess: async () => {
        toast.success("This project is done");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data || "Set project is done failed");
      },
    });

  const onSubmit = async () => {
    const formValues = await form.validateFields();
    const dataToUpdate = {
      projectName: formValues.projectName,
      description: formValues.description,
      endDate: formValues.endDate.toDate(),
    };
    updateProject(
      {
        ...dataToUpdate,
        projectId: detail!.projectId,
      },
      {
        onSuccess: () => {
          toast.success("Update Project Successfully");
        },
      }
    );
  };

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleOpenModalDelete = () => {
    setIsModalDeleteOpen(true);
  };

  const handleCloseModalDelete = () => {
    setIsModalDeleteOpen(false);
  };

  const isUserAdmin = useCheckProjectAdmin();

  const projectAdmin = detail?.projectMembers.find((member) => member.isOwner);
  if (detail)
    return (
      <>
        <DeleteProject
          isOpen={isModalDeleteOpen}
          handleClose={handleCloseModalDelete}
        />

        <Card className="min-h-screen">
          <Typography className="text-3xl font-bold mb-10">
            Project Infomation
          </Typography>
          <Row>
            <Col span={12}>
              <Form layout="vertical" form={form} initialValues={initialValues}>
                <Form.Item
                  label={<b>Name</b>}
                  name="projectName"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={!isAdminOrPO} />
                </Form.Item>
                <Form.Item label={<b>Description</b>} name="description">
                  <Input disabled={!isAdminOrPO} />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label={<b>Start Date</b>} name="startDate">
                      <DatePicker format={DATE_FORMAT} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={<b>End Date</b>} name="endDate">
                      <DatePicker
                        format={DATE_FORMAT}
                        disabledDate={(current) => {
                          const startDate = form.getFieldValue("startDate");
                          return current.isBefore(startDate);
                        }}
                        disabled={!isAdminOrPO}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Space className="flex mt-5 justify-between">
                  <Button
                    loading={isLoading || isLoadingSetDoneProject}
                    onClick={onSubmit}
                    type="primary"
                    disabled={!isAdminOrPO}
                  >
                    Save
                  </Button>
                  <Button
                    loading={isLoading || isLoadingSetDoneProject}
                    onClick={() =>
                      modal.confirm({
                        title: "Warning",
                        content:
                          "Are you sure to set status this project is done?",
                        onOk: () => setDoneProject({ projectId: projectId! }),
                      })
                    }
                    disabled={!isAdminOrPO}
                    type="primary"
                  >
                    Done Project
                  </Button>
                </Space>
              </Form>
            </Col>
            <Col span={9} offset={3}>
              <AvatarWithColor
                style={{ fontSize: "50px" }}
                size={100}
                shape="square"
                stringContent={detail?.projectName || "Unknown"}
              >
                {detail?.projectName.charAt(0).toUpperCase() || "U"}
              </AvatarWithColor>
            </Col>
          </Row>
          <Divider />
          <Typography className="text-xl font-medium">
            Project Administrator
          </Typography>
          <div className="mt-3">
            <Row>
              <Col span={1} className="flex justify-center items-center">
                {projectAdmin ? (
                  <AvatarWithColor
                    stringContent={projectAdmin.userName || projectAdmin.email}
                  >
                    {(projectAdmin.userName ||
                      projectAdmin.email)?.[0].toUpperCase()}
                  </AvatarWithColor>
                ) : null}
              </Col>
              <Col className="ml-3" span={19}>
                {projectAdmin ? (
                  <>
                    <Typography.Title level={5} className="!m-0 min-h-[24px]">
                      {projectAdmin.userName}
                    </Typography.Title>
                    <Typography.Text className="min-h-[19px]">
                      {projectAdmin.email}
                    </Typography.Text>
                  </>
                ) : null}
              </Col>
            </Row>
          </div>
          <Divider />
          <Typography className="text-xl font-medium">
            Delete Project
          </Typography>
          <Typography className="mt-2">
            This will affect all contents and members of this project.
          </Typography>
          <Button
            onClick={handleOpenModalDelete}
            className="mt-5"
            type="primary"
            danger
            disabled={!isAdminOrPO}
          >
            Delete
          </Button>
        </Card>
        {contextHolder}
      </>
    );
  return <></>;
}
