import Header from "@/components/Layout/Header";
import { ProjectOutlined, UnlockOutlined } from "@ant-design/icons";
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
import { Content } from "antd/es/layout/layout";
import Brand from "@/assets/images/Brand.png";
import { faker } from "@faker-js/faker";

const { Text } = Typography;

export default function InviteMember() {
  return (
    <>
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
                Phan Luong Nam invited you to collaborate
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
                    DevTasker Project
                  </Tag>
                </Col>
                <Col
                  className="flex flex-col justify-center items-center text-rose-800"
                  span={12}
                >
                  <UnlockOutlined className="text-4xl" />
                  <Text className="text-xl font-medium text-rose-800">
                    Role
                  </Text>
                  <Tag color="#9f1239" className="mt-3 text-xl font-bold">
                    Member
                  </Tag>
                </Col>
              </Row>

              <Space className="flex justify-center mt-14">
                <Button className="bg-green-500 ">
                  <Text className="text-white font-medium">
                    Accecpt Invitation
                  </Text>
                </Button>
                <Button type="primary" danger>
                  <Text className="text-white font-medium">Decline</Text>
                </Button>
              </Space>
            </Space>
          </Card>
        </Content>
      </Layout>
    </>
  );
}
