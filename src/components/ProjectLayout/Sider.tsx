import { useEffect, useState, useMemo } from "react";
import { Avatar, Button, Layout, Menu } from "antd";
import {
  ApartmentOutlined,
  CalendarOutlined,
  DeleteOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  InboxOutlined,
  LayoutOutlined,
  LineChartOutlined,
  SettingOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  TableOutlined,
} from "@ant-design/icons";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useProjectDetail from "@/hooks/useProjectDetail";
import useMenuCollapse from "@/hooks/useMenuCollapse";
import { paths } from "@/routers/paths";
import Brand from "../Layout/Brand";

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

  const { projectId } = useParams();
  const { detail } = useProjectDetail(projectId);

  const iconSize = menuCollapse ? 16 : 20;

  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const items: MenuItem[] = useMemo(
    () => [
      {
        label: "Overview",
        key: "overview",
        icon: <SolutionOutlined width={iconSize} height={iconSize} />,
        children: [
          {
            label: "Summary",
            key: generatePath(paths.project.detail, { projectId }),
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
            label: "Kanban",
            key: generatePath(paths.project.kanban, { projectId }),
            icon: <LayoutOutlined width={iconSize} height={iconSize} />,
          },
          {
            label: "Tasks",
            key: generatePath(paths.project.tasks, { projectId }),
            icon: <SnippetsOutlined width={iconSize} height={iconSize} />,
          },
          {
            label: "Sprints",
            key: generatePath(paths.project.sprint, { projectId }),
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
            key: generatePath(paths.project.calendar, { projectId }),
            icon: <CalendarOutlined width={iconSize} height={iconSize} />,
          },
          {
            label: "Trash Bin",
            key: generatePath(paths.project.trash, { projectId }),
            icon: <DeleteOutlined width={iconSize} height={iconSize} />,
          },
        ],
      },
      {
        label: "Report",
        key: generatePath(paths.project.report, { projectId }),
        icon: <LineChartOutlined width={iconSize} height={iconSize} />,
      },
      {
        label: "Settings",
        key: generatePath(paths.project.settings, { projectId }),
        icon: <SettingOutlined width={iconSize} height={iconSize} />,
      },
    ],
    [projectId, iconSize]
  );

  useEffect(() => {
    const keys = location.pathname;
    const openItem = items.find(
      (item) => item.children?.find((child) => child.key === keys)
    );
    if (openItem) {
      setOpenKeys([openItem.key as string]);
    }
    setSelectedKeys([keys]);
  }, [location.pathname, items]);

  const onClickMenuItem = ({ keyPath }: { keyPath: string[] }) => {
    navigate(keyPath[0]);
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
                <span className="font-semibold text-lg">
                  {detail?.projectName}
                </span>
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
            </div>
            <Button type="text" onClick={onToggleMenu}>
              {menuCollapse ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            </Button>
          </div>
        </div>
      </Layout.Sider>
    </>
  );
}
