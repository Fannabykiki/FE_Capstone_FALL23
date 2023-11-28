import { Button, Image, Layout, Space, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import BrandHeader from "@/assets/images/BrandHeader.png";
import Page1 from "./Component/Page1";
import Page2 from "./Component/Page2";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routers/paths";

const { Text, Link } = Typography;

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Space className="w-full" direction="vertical">
      <Layout className="min-h-screen">
        <Header className="bg-teal-50 w-full flex items-center justify-between">
          <Image preview={false} src={BrandHeader} />
          <div className="flex">
            <Button
              onClick={() => navigate(paths.login)}
              className="mr-3 rounded-3xl bg-teal-400 h-10 w-24"
            >
              <Text className="text-white text-base font-semibold">
                Sign In
              </Text>
            </Button>
            <Button
              onClick={() => navigate(paths.register)}
              className="rounded-3xl bg-teal-700 h-10 w-24"
            >
              <Text className="text-white text-base font-semibold">
                Register
              </Text>
            </Button>
          </div>
        </Header>

        <Content className="bg-white">
          <Page1 />
          <Page2 />
          <div className="bg-white min-h-screen flex items-center justify-center p-4"></div>
        </Content>

        <Footer className="flex items-center justify-between bg-teal-50">
          <Text>Copyright © 2023 SEP490 - G57</Text>
          <div>
            <Link>
              <TwitterOutlined className="text-xl mr-6" />
            </Link>
            <Link>
              <FacebookOutlined className="text-xl mr-6" />
            </Link>
            <Link>
              <LinkedinOutlined className="text-xl mr-6" />
            </Link>
            <Link>
              <YoutubeOutlined className="text-xl mr-6" />
            </Link>
            <Link>
              <InstagramOutlined className="text-xl" />
            </Link>
          </div>
        </Footer>
      </Layout>
    </Space>
  );
}
