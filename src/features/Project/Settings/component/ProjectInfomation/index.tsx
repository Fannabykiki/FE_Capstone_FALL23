import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
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
import { faker } from "@faker-js/faker";
import AvatarWithColor from "@/components/AvatarWithColor";

export default function ProjectInformation() {
  const [form] = Form.useForm();
  const { projectId } = useParams();
  const { detail } = useProjectDetail(projectId);

  const initialValues = {
    projectName: detail?.projectName,
    description: detail?.description,
    createDate: dayjs(detail?.createAt).format("DD/MM/YYYY"),
    dueDate: dayjs(detail?.endDate).format("DD/MM/YYYY"),
  };

  const { mutate: updateProject, isLoading } = useMutation({
    mutationFn: projectApi.updateProject,
    mutationKey: [projectApi.updateProjectKey],
  });

  const onSubmit = async () => {
    const formValues = await form.validateFields();
    const dataToUpdate = {
      projectName: formValues.projectName,
      description: formValues.description,
    };
    updateProject(
      {
        id: detail!.projectId,
        data: dataToUpdate,
      },
      {
        onSuccess: () => {
          toast.success("Update Project Successfully");
        },
      }
    );
  };

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleOpenModalCreate = () => {
    setIsModalDeleteOpen(true);
  };

  const handleCloseModalCreate = () => {
    setIsModalDeleteOpen(false);
  };

  const projectAdmin = detail?.projectMembers.find((member) => member.isOwner);

  return (
    <>
      <DeleteProject
        isOpen={isModalDeleteOpen}
        handleClose={handleCloseModalCreate}
      />

      <Card className="min-h-screen">
        <Typography className="text-3xl font-bold mb-10">
          Project Infomation
        </Typography>
        <Row>
          <Col span={12}>
            <Form layout="vertical" form={form} initialValues={initialValues}>
              <Form.Item label={<b>Name</b>} name="projectName">
                <Input />
              </Form.Item>
              <Form.Item label={<b>Description</b>} name="description">
                <Input />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={<b>Created Date</b>} name="createDate">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={<b>Due Date</b>} name="dueDate">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Space className="mt-5">
                <Button loading={isLoading} onClick={onSubmit} type="primary">
                  Save
                </Button>
              </Space>
            </Form>
          </Col>
          <Col span={3}></Col>
          <Col span={9}>
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
                <AvatarWithColor stringContent={projectAdmin.fullname}>
                  {projectAdmin.fullname.charAt(0).toUpperCase()}
                </AvatarWithColor>
              ) : null}
            </Col>
            <Col className="ml-3" span={19}>
              {projectAdmin ? (
                <>
                  <Typography.Title level={5} className="!m-0 min-h-[24px]">
                    {projectAdmin.fullname}
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
        <Typography className="text-xl font-medium">Delete Project</Typography>
        <Typography className="mt-2">
          This will affect all contents and members of this project.
        </Typography>
        <Button
          onClick={handleOpenModalCreate}
          className="mt-5"
          type="primary"
          danger
        >
          Delete
        </Button>
      </Card>
    </>
  );
}
