import { Button, Col, Image, Row, Typography } from "antd";

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
import { paths } from "@/routers/paths";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function Page1() {
  const navigate = useNavigate();

  return (
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
          Optimize Project Management, Task Organization, Collaboration, and
          Execution Across Every Department with Our All-in-One Platform
        </Typography>

        <Button
          onClick={() => navigate(paths.login)}
          className="mt-10 self-center rounded-3xl bg-green-500 shadow-2xl h-16 w-52"
        >
          <Text className="text-white text-2xl  font-bold">Sign In</Text>
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
  );
}
