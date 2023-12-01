import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";

import NotePadSvg from "@/assets/icons/iconNotepad";
import { projectApi } from "@/utils/api/project";
import AwardSvg from "@/assets/icons/iconAward";
import ChatSvg from "@/assets/icons/iconChat";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const InviteMemberModal = ({ isOpen, handleClose }: Props) => {
  const [form] = Form.useForm();

  const { projectId } = useParams();

  const { mutate: sendEmailInvite, isLoading } = useMutation({
    mutationKey: [projectApi.sendEmailInviteKey],
    mutationFn: projectApi.sendEmailInvite,
    onSuccess: (_, variables) => {
      toast.success(
        `Send email invitation to ${variables.email[0]} successfully!`
      );
      handleClose();
    },
    onError: (error: any, variables) => {
      toast.error(
        error?.response?.data ||
          `Send email invitation to ${variables.email[0]} failed!`
      );
    },
  });

  const onCancel = () => {
    form.resetFields();
    handleClose();
  };

  const onSubmit = (values: { email: string }) => {
    if (!projectId) return;
    sendEmailInvite({
      email: [values.email],
      projectId,
    });
  };

  return (
    <Modal maskClosable={false} open={isOpen} onCancel={onCancel} width="700px" footer={false}>
      <Space direction="vertical" className="w-full ">
        <Space direction="vertical" className="w-full text-center gap-0">
          <Typography.Title level={3}>
            Invite member to your project
          </Typography.Title>
          <Typography>
            In order to size up your team, <br /> make invitation to your member
          </Typography>
        </Space>
        <Row gutter={12}>
          <Col span={8}>
            <Space
              direction="vertical"
              className="w-full flex items-center justify-center"
            >
              <ChatSvg className="bg-[#EEEDFD] text-[#7A6EF0] p-8 rounded-full" />
              <Typography.Title level={5} className="!m-0">
                Send Invitation
              </Typography.Title>
              <Typography className="text-center text-xs">
                Send your referral link to your member
              </Typography>
            </Space>
          </Col>
          <Col span={8}>
            <Space
              direction="vertical"
              className="w-full flex items-center justify-center"
            >
              <NotePadSvg className="bg-[#EEEDFD] text-[#7A6EF0] p-8 rounded-full" />
              <Typography.Title level={5} className="!m-0">
                Registration
              </Typography.Title>
              <Typography className="text-center text-xs">
                Let them register to our services
              </Typography>
            </Space>
          </Col>
          <Col span={8}>
            <Space
              direction="vertical"
              className="w-full flex items-center justify-center"
            >
              <AwardSvg className="bg-[#EEEDFD] text-[#7A6EF0] p-8 rounded-full" />
              <Typography.Title level={5} className="!m-0">
                Joining team
              </Typography.Title>
              <Typography className="text-center text-xs">
                Your teammate will accept/delice the invitation
              </Typography>
            </Space>
          </Col>
        </Row>
        <Divider />
        <Space direction="vertical" className="w-full">
          <Typography.Title level={4}>Invite your teammate</Typography.Title>
          <Form
            layout="vertical"
            className="w-full"
            form={form}
            onFinish={onSubmit}
          >
            <Row gutter={12} className="w-full">
              <Col span={20}>
                <Form.Item
                  label={
                    <Typography className="text-xs">
                      Enter your teammate email address and invite them to join
                      DevTasker
                    </Typography>
                  }
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Invalid email",
                    },
                  ]}
                >
                  <Input type="email" placeholder="Enter your teammate email" />
                </Form.Item>
              </Col>
              <Col span={4} className="flex justify-center items-center ">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mt-[8px] bg-[#7367F0] hover:!bg-[#4f3ff5]"
                  loading={isLoading}
                >
                  Send
                </Button>
              </Col>
            </Row>
          </Form>
        </Space>
      </Space>
    </Modal>
  );
};

export default InviteMemberModal;
