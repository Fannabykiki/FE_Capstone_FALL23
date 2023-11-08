import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  LockOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

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

const AdminDashboardSider = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1200);
  const [selectedKeys, setSelectedKeys] = useState<string>("");

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
    {
      label: "Permission Schemes",
      key: paths.adminPermissionManagement,
      icon: <LockOutlined width={iconSize} height={iconSize} />,
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
      theme="light"
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
            items={items as any}
            onClick={onClickMenuItem}
            selectedKeys={[selectedKeys]}
            className="!border-none font-semibold text-base overflow-y-auto overflow-x-hidden flex-grow"
          />
          <Button type="text" onClick={() => setCollapsed((value) => !value)}>
            {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          </Button>
        </div>
      </div>
    </Layout.Sider>
  );
};

export default AdminDashboardSider;
