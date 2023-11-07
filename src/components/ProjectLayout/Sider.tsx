import {
  ApartmentOutlined,
  CalendarOutlined,
  DeleteOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  InboxOutlined,
  LineChartOutlined,
  PlusOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makePath } from "@/utils/common";
import { paths } from "@/routers/paths";
import useMenuCollapse from "@/hooks/useMenuCollapse";
import useDetailView from "@/hooks/useDetailView";
import { CreateProject } from "../Modal";
import Brand from "./Brand";

type PathKeys = keyof typeof paths;
type PathValues = (typeof paths)[PathKeys];

interface MenuItem {
  label: string;
  key: PathValues;
  icon?: React.ReactElement;
  children?: MenuItem[];
}

export default function ProjectSider() {
  const { menuCollapse, onToggleMenu } = useMenuCollapse(
    window.innerWidth < 1200
  );
  const {
    openView: openCreateProjectModal,
    onOpenView: onOpenCreateProjectModal,
    onCloseView: onCloseCreateProjectModal,
  } = useDetailView();

  const iconSize = menuCollapse ? 16 : 20;

  const items: MenuItem[] = [
    {
      label: "Overview",
      key: "overview",
      icon: <SolutionOutlined width={iconSize} height={iconSize} />,
      children: [
        {
          label: "Summary",
          key: "summary",
          icon: <InboxOutlined width={iconSize} height={iconSize} />,
        },
      ],
    },
    {
      label: "Boards",
      key: "boards",
      icon: <TableOutlined width={iconSize} height={iconSize} />,
      children: [
        {
          label: "Work Items",
          key: "tasks",
          icon: <SnippetsOutlined width={iconSize} height={iconSize} />,
        },
        {
          label: "Sprints",
          key: "sprints",
          icon: (
            <ApartmentOutlined
              className="-rotate-90"
              width={iconSize}
              height={iconSize}
            />
          ),
        },
        {
          label: "Calendar",
          key: "calendar",
          icon: <CalendarOutlined width={iconSize} height={iconSize} />,
        },
        {
          label: "Trash Bin",
          key: "trash-bin",
          icon: <DeleteOutlined width={iconSize} height={iconSize} />,
        },
      ],
    },
    {
      label: "Report",
      key: "report",
      icon: <LineChartOutlined width={iconSize} height={iconSize} />,
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

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
            <div className="px-2 flex gap-x-4 items-center">
              <Avatar shape="square">T</Avatar>
              {!menuCollapse && (
                <span className="font-semibold text-lg">Project name</span>
              )}
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
