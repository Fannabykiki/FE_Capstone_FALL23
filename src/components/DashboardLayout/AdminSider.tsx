import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Layout, Menu, Typography } from "antd";
import { AuthContext } from "@/context/Auth";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BrandHeader from "@/assets/images/BrandHeader.png";
import BrandIcon from "@/assets/images/BrandIcon.png";
import { paths } from "@/routers/paths";
import UserMenu from "./UserMenu";

type PathKeys = keyof typeof paths;
type PathValues = (typeof paths)[PathKeys];

interface MenuItem {
  label: string;
  key: PathValues;
  icon: React.ReactElement;
  children?: MenuItem[];
}

const AdminDashboardSider = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1200);
  const [selectedKeys, setSelectedKeys] = useState<string>("");

  const { userInfo } = useContext(AuthContext);

  const location = useLocation();

  const navigate = useNavigate();

  const iconSize = collapsed ? 16 : 20;

  const items: MenuItem[] = [
    {
      label: "Dashboard",
      key: paths.adminDashboard,
      icon: <HomeOutlined width={iconSize} height={iconSize} />,
    },
    {
      label: "User Management",
      key: paths.adminUserManagement,
      icon: <UserOutlined width={iconSize} height={iconSize} />,
    },
    {
      label: "Role Management",
      key: paths.adminRoleManagement,
      icon: <SettingOutlined width={iconSize} height={iconSize} />,
    },
  ];

  const onClickMenuItem = ({ key }: { key: string }) => {
    navigate(key);
  };

  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location.pathname]);

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={null}
      width={300}
      collapsedWidth={96}
      breakpoint="xl"
      className="relative p-2 !bg-white shadow-custom"
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-5 flex-1 h-0">
          <div className="flex justify-center items-center">
            <img
              className="h-16"
              src={collapsed ? BrandIcon : BrandHeader}
              alt={`Dev Tasker ${collapsed ? "collapsed" : "full"} logo`}
            />
          </div>
          <Menu
            mode="inline"
            items={items}
            onClick={onClickMenuItem}
            selectedKeys={[selectedKeys]}
            className="!border-none font-semibold text-base overflow-y-auto overflow-x-hidden flex-grow"
          />
          <Button type="text" onClick={() => setCollapsed((value) => !value)}>
            {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          </Button>
        </div>
        <Divider className="border-neutral-200" />
        <div className="flex justify-center items-center">
          {collapsed ? (
            <UserMenu>
              <UserOutlined className="h-10 w-10 bg-neutral-200 rounded-full flex justify-center" />
            </UserMenu>
          ) : (
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center gap-2">
                <UserOutlined className="h-10 w-10 bg-neutral-200 rounded-full flex justify-center" />
                <div className="flex flex-col">
                  <Typography.Text className="font-semibold break-keep">
                    {userInfo?.fullname || "User"}
                  </Typography.Text>
                  <Typography.Text className="break-keep">
                    {userInfo?.email || "Email"}
                  </Typography.Text>
                </div>
              </div>
              <UserMenu>
                <SettingOutlined className=" cursor-pointer" />
              </UserMenu>
            </div>
          )}
        </div>
      </div>
    </Layout.Sider>
  );
};

export default AdminDashboardSider;
