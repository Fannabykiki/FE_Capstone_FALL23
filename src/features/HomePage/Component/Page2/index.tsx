import { Button, Card, Col, Image, Row, Typography } from "antd";
import ImgPage2 from "@/assets/images/ImgPage2.png";

const { Text, Link } = Typography;

export default function Page2() {
  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center">
      <Card className="bg-sky-900 min-h-max w-5/6 mt-20 shadow-2xl">
        <Row>
          <Col className="flex flex-col mt-4" span={13}>
            <Text className="text-6xl text-white font-bold tracking-wider font-batangas italic">
              "<span className="text-teal-300">DevTasker</span> brings together
              all your tasks, team members, and tools"
            </Text>
            <Text className="text-white mt-10 text-lg tracking-wider font-batangas italic">
              Keep everything in one place—even if your team isn't together.
            </Text>
            <Button className="mt-24 rounded-3xl bg-white shadow-2xl h-16 w-52">
              <Text className="text-black text-xl font-bold uppercase">
                Register Now
              </Text>
            </Button>
          </Col>
          <Col span={11}>
            <Image preview={false} src={ImgPage2} />
          </Col>
        </Row>
      </Card>
    </div>
  );
}
