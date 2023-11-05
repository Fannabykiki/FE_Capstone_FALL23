import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Layout, Menu, Typography } from "antd";
import { useAuthContext } from "@/context/Auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makePath } from "@/utils/common";
import UserMenu from "../UserMenu";
import BrandHeaderLight from "@/assets/images/BrandHeaderLight.png";
import BrandIcon from "@/assets/images/BrandIcon.png";
import { paths } from "@/routers/paths";

type PathKeys = keyof typeof paths;
type PathValues = (typeof paths)[PathKeys];

interface MenuItem {
  label: string;
  key: PathValues;
  icon: React.ReactElement;
  children?: MenuItem[];
}

export default function DashboardSider() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1200);
  const iconSize = collapsed ? 16 : 20;

  const items: MenuItem[] = [
    {
      label: "Dashboard",
      key: paths.dashboard,
      icon: <HomeOutlined width={iconSize} height={iconSize} />,
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { userInfo } = useAuthContext();

  useEffect(() => {
    const keys = location.pathname.split("/").slice(1);
    setOpenKeys(keys);
    setSelectedKeys(keys);
  }, [location.pathname]);

  const onClickMenuItem = ({ keyPath }: { keyPath: string[] }) => {
    navigate(makePath([...keyPath].reverse()));
  };

  const onOpenSubMenu = (keys: string[]) => {
    const rootKeys = items
      .filter((item) => {
        if (Object.hasOwn(item, "children")) {
          return item.children;
        }
        return [];
      })
      .map((i) => i.key);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const Logo = () =>
    collapsed ? (
      <img className="h-16" src={BrandIcon} alt={`Dev Tasker collapsed logo`} />
    ) : (
      <img
        className="h-16"
        src={BrandHeaderLight}
        alt={`Dev Tasker full sized logo`}
      />
    );

  const UserSetting = () => (
    <div>
      <Divider className="border-neutral-200" />
      <div className="flex flex-col gap-5">
        {collapsed ? (
          <UserMenu>
            <UserIcon />
          </UserMenu>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <UserIcon />
              <div className="flex flex-col">
                <Typography.Text className="font-semibold text-neutral-200 text-base break-keep">
                  {userInfo?.fullname || "User"}
                </Typography.Text>
                <Typography.Text className="break-keep text-neutral-200">
                  {userInfo?.email || "Email"}
                </Typography.Text>
              </div>
            </div>
            <UserMenu>
              <SettingOutlined className="text-neutral-200 cursor-pointer" />
            </UserMenu>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={null}
        width={300}
        collapsedWidth={96}
        breakpoint="xl"
        className="relative p-2"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-5 flex-1 h-0">
            <div className="flex justify-center items-center">
              <Logo />
            </div>
            <Menu
              mode="inline"
              theme="dark"
              items={items as any}
              onClick={onClickMenuItem}
              openKeys={openKeys}
              selectedKeys={selectedKeys}
              onOpenChange={onOpenSubMenu}
              className="!border-none font-semibold text-base overflow-y-auto overflow-x-hidden flex-grow"
            />
            <Button type="text" onClick={() => setCollapsed((value) => !value)}>
              {collapsed ? (
                <DoubleRightOutlined className="text-neutral-200" />
              ) : (
                <DoubleLeftOutlined className="text-neutral-200" />
              )}
            </Button>
          </div>
          <UserSetting />
        </div>
      </Layout.Sider>
    </>
  );
}

const UserIcon = () => (
  <UserOutlined className="h-10 w-10 bg-neutral-200 rounded-full flex justify-center" />
);
