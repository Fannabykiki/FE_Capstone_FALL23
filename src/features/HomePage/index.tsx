import {
  Button,
  Col,
  Divider,
  Image,
  Layout,
  Row,
  Space,
  Typography,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

import BrandHeader from "@/assets/images/BrandHeader.png";
import ImgHome1 from "@/assets/images/ImgHome1.png";
import ImgHome2 from "@/assets/images/ImgHome2.png";

import HUST from "@/assets/images/HomePage/HUST.png";
import FPT from "@/assets/images/HomePage/FPT.png";
import HCMUT from "@/assets/images/HomePage/HCMUT.png";
import PTIT from "@/assets/images/HomePage/PTIT.png";
import HUET from "@/assets/images/HomePage/HUET.png";
import MTA from "@/assets/images/HomePage/MTA.png";
import DUT from "@/assets/images/HomePage/DUT.png";
import UIT from "@/assets/images/HomePage/UIT.png";

const { Text, Link } = Typography;

export default function HomePage() {
  return (
    <Space className="w-full" direction="vertical">
      <Layout className="min-h-screen">
        <Header className="bg-teal-50 w-full flex items-center justify-between">
          <Image preview={false} src={BrandHeader} />
          <div className="flex">
            <Button className="mr-3 rounded-3xl bg-teal-400 h-10 w-24">
              <Text className="text-white text-base font-semibold">
                Sign In
              </Text>
            </Button>
            <Button className="rounded-3xl bg-teal-700 h-10 w-24">
              <Text className="text-white text-base font-semibold">
                Register
              </Text>
            </Button>
          </div>
        </Header>

        <Content className="bg-white">
          {/* Page 1 */}
          <div>
            <Row className="min-h-screen">
              <Col className="mt-28" span={6}>
                <Image preview={false} src={ImgHome1} />
              </Col>

              <Col
                className="flex flex-col items-center justify-center h-full mt-14"
                span={12}
              >
                <Typography className="text-center mb-4 text-custom leading-custom font-bold">
                  One platform that simplifies all workflows
                </Typography>

                <Typography className="text-center mt-6 mb-4 text-xl/8">
                  Optimize Project Management, Task Organization, Collaboration,
                  and Execution Across Every Department with Our All-in-One
                  Platform
                </Typography>

                <Button className="mt-10 self-center rounded-3xl bg-green-500 shadow-2xl h-16 w-52">
                  <Text className="text-white text-2xl  font-bold">
                    Sign In
                  </Text>
                </Button>

                <Typography className="text-center mt-24 mb-4 text-sm/5 uppercase font-normal tracking-widest">
                  DevTasker is aimed at university students.
                </Typography>

                <Row className="mt-5">
                  <Col className="flex items-center justify-center" span={3}>
                    <Image preview={false} src={FPT} />
                  </Col>
                  <Col className="flex items-center justify-center" span={3}>
                    <Image preview={false} src={HUST} />
                  </Col>
                  <Col className="flex items-center justify-center" span={3}>
                    <Image preview={false} src={PTIT} />
                  </Col>
                  <Col className="flex items-center justify-center" span={3}>
                    <Image preview={false} src={HUET} />
                  </Col>
                  <Col className="flex items-center justify-center" span={3}>
                    <Image preview={false} src={MTA} />
                  </Col>
                  <Col className="flex items-center justify-center" span={3}>
                    <Image preview={false} src={HCMUT} />
                  </Col>
                  <Col className="flex items-center justify-center" span={3}>
                    <Image preview={false} src={UIT} />
                  </Col>
                  <Col className="flex items-center justify-center" span={3}>
                    <Image preview={false} src={DUT} />
                  </Col>
                </Row>
              </Col>

              <Col className="mt-28" span={6}>
                <Image preview={false} src={ImgHome2} />
              </Col>
            </Row>
          </div>
          {/* Page 2 */}
          <div>
            <Row>
              <Col span={4}></Col>
              <Col
                className="min-h-screen flex flex-col items-center justify-center"
                span={16}
              >
                <Typography.Title>
                  One platform to streamline all workflows
                </Typography.Title>
                <Typography>
                  Your all-in-one platform to manage projects, organize work,
                  enhance collaboration and accelerate execution across all
                  departments.
                </Typography>
                <Button>Sign In</Button>
              </Col>
              <Col span={4}></Col>
            </Row>
          </div>
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
