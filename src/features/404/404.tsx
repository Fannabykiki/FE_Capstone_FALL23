import NotFound404 from "@/assets/images/NotFound.png";
import { Button, Image, Typography } from "antd";

const { Text } = Typography;

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Image preview={false} src={NotFound404} />
        <div className="mt-7">
          <Typography className="text-3xl font-extrabold uppercase text-black tracking-wider">
            Sorry, Page Not Found !
          </Typography>
          <Typography className="text-lg text-black mt-3">
            The page you are looking for might have been removed has its name
            changed or is temporarily unavailable.
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
