import { useEffect, useState } from "react";
import { ProjectOutlined, UnlockOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Content } from "antd/es/layout/layout";
import { faker } from "@faker-js/faker";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  Layout,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";

import { projectApi } from "@/utils/api/project";
import Header from "@/components/Layout/Header";
import { useAuthContext } from "@/context/Auth";
import Brand from "@/assets/images/Brand.png";
import { paths } from "@/routers/paths";

const { Text } = Typography;

export default function InviteMember() {
  const [disabled, setDisabled] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const { userInfo } = useAuthContext();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isError } = useQuery({
    queryKey: [projectApi.checkEmailInviteKey, searchParams.get("invitation")],
    queryFn: ({ signal }) =>
      projectApi.checkEmailInvite(signal, {
        invationId: searchParams.get("invitation")!,
      }),
    enabled: Boolean(searchParams.get("invitation")),
  });

  const { mutate: acceptInvite, isLoading: accepting } = useMutation({
    mutationKey: [projectApi.acceptEmailInviteKey],
    mutationFn: projectApi.acceptEmailInvite,
    onSuccess: () => {
      setDisabled(true);
      toast.success("Accept invitation successfully!");
      queryClient.invalidateQueries({
        queryKey: [
          projectApi.checkEmailInviteKey,
          searchParams.get("invitation"),
        ],
      });
      navigate(paths.user);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data || "Has an error, please try again");
    },
  });

  const { mutate: declineInvite, isLoading: declining } = useMutation({
    mutationKey: [projectApi.declineEmailInviteKey],
    mutationFn: projectApi.declineEmailInvite,
    onSuccess: () => {
      setDisabled(true);
      toast.success("Decline invitation successfully!");
      queryClient.invalidateQueries({
        queryKey: [
          projectApi.checkEmailInviteKey,
          searchParams.get("invitation"),
        ],
      });
      navigate(paths.user);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data || "Has an error, please try again");
    },
  });

  useEffect(() => {
    if (
      isError ||
      (data &&
        (data?.statusName !== "Pending" || data.inviteTo !== userInfo?.email))
    ) {
      let message = "Invitation has been error";
      if (isError) {
        message = "URL invalid";
      } else if (data.inviteTo !== userInfo?.email) {
        message = "Email invalid";
      } else if (data?.statusName === "Accepted") {
        message = "Invitation accepted";
      } else if (data?.statusName === "Rejected") {
        message = "Invitation rejected";
      } else {
        message = "Invitation has been cancelled";
      }
      toast.error(message);
      navigate(paths.user);
    }
  }, [data, isError, navigate, userInfo?.email]);

  return (
    <Layout className="min-h-screen flex flex-1 flex-col">
      <Header />
      <Content className="m-6">
        <Card className="min-h-fit min-w-fit flex justify-center">
          <Space direction="vertical">
            <Space className="flex justify-center mb-28">
              <Image preview={false} src={Brand} />
            </Space>
            <Space className="flex justify-center mb-5">
              <Avatar size={90} src={faker.image.avatarGitHub()} />
              <Text className="text-3xl font-bold">+</Text>
              <Avatar size={90} src={faker.image.avatarGitHub()} />
            </Space>

            <Text className="text-3xl font-semibold">
              {data?.inviteBy} invited you to collaborate
            </Text>

            <Row className="mt-5" gutter={[48, 48]}>
              <Col
                className="flex flex-col justify-center items-center text-cyan-800"
                span={12}
              >
                <ProjectOutlined className="text-4xl" />
                <Text className="text-xl font-medium text-cyan-800">
                  Project
                </Text>
                <Tag color="#155e75" className="mt-3 text-xl font-bold">
                  {data?.projectName}
                </Tag>
              </Col>
              <Col
                className="flex flex-col justify-center items-center text-rose-800"
                span={12}
              >
                <UnlockOutlined className="text-4xl" />
                <Text className="text-xl font-medium text-rose-800">Role</Text>
                <Tag color="#9f1239" className="mt-3 text-xl font-bold">
                  Member
                </Tag>
              </Col>
            </Row>

            <Space className="flex justify-center mt-14">
              <Button
                className="bg-green-500"
                loading={accepting}
                disabled={disabled}
                onClick={() => {
                  if (!data) return;
                  acceptInvite({
                    email: data.inviteTo,
                    invitationId: data.invitationId,
                    projectId: data.projectId,
                  });
                }}
              >
                <Text className="text-white font-medium">Accept</Text>
              </Button>
              <Button
                type="primary"
                danger
                loading={declining}
                disabled={disabled}
                onClick={() => {
                  if (!data) return;
                  declineInvite({
                    email: data.inviteTo,
                    invitationId: data.invitationId,
                    projectId: data.projectId,
                  });
                }}
              >
                <Text className="text-white font-medium">Decline</Text>
              </Button>
            </Space>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}
