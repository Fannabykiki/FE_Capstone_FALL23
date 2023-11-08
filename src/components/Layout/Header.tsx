import { Breadcrumb, Layout, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

import { useAuthContext } from "@/context/Auth";
import UserMenu from "../UserMenu";

export default function Header() {
  const { userInfo } = useAuthContext();

  const location = useLocation();

  return (
    <Layout.Header className="flex items-center justify-between bg-white shadow-custom">
      <Breadcrumb
        className="whitespace-nowrap font-semibold"
        items={location.pathname
          .split("/")
          .filter(Boolean)
          .map((item) => ({
            title: item.charAt(0).toUpperCase() + item.slice(1),
          }))}
      />
      <UserMenu>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <UserOutlined className="h-10 w-10 bg-neutral-200 border border-solid rounded-full flex justify-center" />
            <div className="flex flex-col">
              <Typography.Text className="font-semibold text-base break-keep">
                {userInfo?.fullname || "User"}
              </Typography.Text>
              <Typography.Text className="break-keep">
                {userInfo?.email || "Email"}
              </Typography.Text>
            </div>
          </div>
        </div>
      </UserMenu>
    </Layout.Header>
  );
}
