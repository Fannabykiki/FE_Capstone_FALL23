import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  PlusOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Layout, Menu, Skeleton, Typography } from "antd";
import { useAuthContext } from "@/context/Auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makePath } from "@/utils/common";
import UserMenu from "../UserMenu";
import { paths } from "@/routers/paths";
import useMenuCollapse from "@/hooks/useMenuCollapse";
import useDetailView from "@/hooks/useDetailView";
import { CreateProject } from "../Modal";
import Brand from "./Brand";
import useListProjectOfUser from "@/hooks/useListProjectOfUser";

type PathKeys = keyof typeof paths;
type PathValues = (typeof paths)[PathKeys];

interface MenuItem {
  label: string;
  key: PathValues;
  icon: React.ReactElement;
  children?: MenuItem[];
}

export default function UserSider() {
  const { menuCollapse, onToggleMenu } = useMenuCollapse(
    window.innerWidth < 1200
  );
  const {
    openView: openCreateProjectModal,
    onOpenView: onOpenCreateProjectModal,
    onCloseView: onCloseCreateProjectModal,
  } = useDetailView();
  const { projects, isLoading: isGettingProjects } = useListProjectOfUser();

  const iconSize = menuCollapse ? 16 : 20;

  const items: MenuItem[] = [
    {
      label: "Dashboard",
      key: paths.userPages.dashboard,
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

  return (
    <>
      <Layout.Sider
        collapsible
        collapsed={menuCollapse}
        onCollapse={onToggleMenu}
        trigger={null}
        width={300}
        collapsedWidth={96}
        breakpoint="xl"
        className="relative p-2"
        theme="light"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-5 flex-1 h-0">
            <div className="flex justify-center items-center">
              <Brand menuCollapse={menuCollapse} />
            </div>
            <div className="flex-grow">
              <Menu
                mode="inline"
                items={items as any}
                onClick={onClickMenuItem}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                onOpenChange={onOpenSubMenu}
                className="!border-none font-semibold text-base overflow-y-auto overflow-x-hidden"
              />
              <Divider />
              {isGettingProjects ? (
                <div className="px-2 py-4">
                  <Skeleton.Button active block />
                </div>
              ) : (
                <Menu
                  mode="inline"
                  items={(projects || []).map((project) => ({
                    label: project.projectName,
                    key: project.projectId,
                    icon: <DoubleRightOutlined />,
                    onClick: () =>
                      navigate(
                        paths.userPages.project.detail(project.projectId)
                      ),
                  }))}
                  openKeys={openKeys}
                  selectedKeys={selectedKeys}
                  className="!border-none font-semibold text-base overflow-y-auto overflow-x-hidden"
                />
              )}
              <div className="px-2">
                <Button
                  title="Add Project"
                  icon={<PlusOutlined />}
                  type="primary"
                  block
                  onClick={() => onOpenCreateProjectModal()}
                >
                  {!menuCollapse && "Add Project"}
                </Button>
              </div>
            </div>
            <Button type="text" onClick={onToggleMenu}>
              {menuCollapse ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            </Button>
          </div>
          {/* User settings */}
          <>
            <div>
              <Divider className="border-neutral-200" />
              <div className="flex flex-col gap-5">
                {menuCollapse ? (
                  <UserMenu>
                    <UserIcon />
                  </UserMenu>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <UserIcon />
                      <div className="flex flex-col">
                        <Typography.Text className="font-semibold text-base break-keep">
                          {userInfo?.fullname || "User"}
                        </Typography.Text>
                        <Typography.Text className="break-keep">
                          {userInfo?.email || "Email"}
                        </Typography.Text>
                      </div>
                    </div>
                    <UserMenu>
                      <SettingOutlined className="cursor-pointer" />
                    </UserMenu>
                  </div>
                )}
              </div>
            </div>
          </>
        </div>
      </Layout.Sider>
      {openCreateProjectModal && (
        <CreateProject
          open={openCreateProjectModal}
          onClose={onCloseCreateProjectModal}
        />
      )}
    </>
  );
}

const UserIcon = () => (
  <UserOutlined className="h-10 w-10 bg-neutral-200 border border-solid rounded-full flex justify-center" />
);
