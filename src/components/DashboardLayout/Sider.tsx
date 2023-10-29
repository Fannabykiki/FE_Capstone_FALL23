import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Layout, Menu, Typography } from "antd";
import { AuthContext } from "@/context/Auth";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makePath } from "@/utils/common";
import UserMenu from "./UserMenu";
import BrandHeader from "@/assets/images/BrandHeader.png";
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
  const { userInfo } = useContext(AuthContext);

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
      <img
        className="h-[29px]"
        src={BrandIcon}
        alt={`Dev Tasker collapsed logo`}
      />
    ) : (
      <img
        className="h-16"
        src={BrandHeader}
        alt={`Dev Tasker full sized logo`}
      />
    );

  const UserSetting = () => (
    <div>
      <Divider className="border-neutral-200 dark:border-neutral-800" />
      <div className="flex flex-col gap-5">
        {collapsed ? (
          <UserMenu>
            <UserOutlined className="!h-10 !w-10 m-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-200" />
          </UserMenu>
        ) : (
          <div className="flex justify-between items-center text-neutral-950 dark:text-neutral-200">
            <div className="flex items-center gap-2">
              <UserOutlined className="!h-10 !w-10 m-1 bg-neutral-200 dark:bg-neutral-800" />
              <div className="flex flex-col">
                <Typography.Text className="font-semibold text-base break-keep">
                  {userInfo?.name || "User"}
                </Typography.Text>
                <Typography.Text className="break-keep">
                  {userInfo?.email || "Email"}
                </Typography.Text>
              </div>
            </div>
            <UserMenu>
              <SettingOutlined className="dark:text-neutral-500" />
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
        className="relative p-lg"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-lg flex-1 h-0">
            <div className="h-xl mb-lg">
              <div className="flex flex-rol justify-center items-center">
                <Logo />
              </div>
              <div
                onClick={() => setCollapsed((value) => !value)}
                className="absolute top-[28px] -right-sm"
              >
                {collapsed ? (
                  <DoubleRightOutlined className="text-neutral-500" />
                ) : (
                  <DoubleLeftOutlined className="text-neutral-500" />
                )}
              </div>
            </div>
            <Menu
              mode="inline"
              items={items}
              onClick={onClickMenuItem}
              openKeys={openKeys}
              selectedKeys={selectedKeys}
              onOpenChange={onOpenSubMenu}
              className="!border-none font-semibold text-base overflow-y-auto overflow-x-hidden"
            />
          </div>
          <UserSetting />
        </div>
      </Layout.Sider>
    </>
  );
}
