import AccessDenied403 from "@/assets/images/AccessDenied.png";
import { Button, Image, Typography } from "antd";

const { Text } = Typography;

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Image preview={false} src={AccessDenied403} />
        <div className="mt-7">
          <Typography className="text-3xl font-extrabold uppercase text-black tracking-wider">
            Access Denied
          </Typography>
          <Typography className="text-lg text-black mt-3">
            You do not have permission to view this page.
          </Typography>
          <Typography className="text-lg text-black mt-3">
            Please check your credentials and try again.
          </Typography>
        </div>
        <div className="mt-4">
          <Button className="rounded-3xl bg-blue-500 shadow-2xl h-12 w-48">
            <Text className="font-bold text-white">GO TO HOMEPAGE</Text>
          </Button>
        </div>
      </div>
    </div>
  );
}
