import useListProjectOfUser from "@/hooks/useListProjectOfUser";
import { useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import {
  Avatar,
  Col,
  Dropdown,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import { useAuthContext } from "@/context/Auth";
import { IProject } from "@/interfaces/project";
import { generatePath, useNavigate } from "react-router-dom";
import { paths } from "@/routers/paths";
import { classNames } from "@/utils/common";
import { MoreOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { projectApi } from "@/utils/api/project";
import { toast } from "react-toastify";
import useDebounceValue from "@/hooks/useDebounceValue";

export default function UserDashboard() {
  const { projects, refetchProjects } = useListProjectOfUser();
  const { userInfo } = useAuthContext();

  const [modal, contextHolder] = Modal.useModal();

  const navigate = useNavigate();

  const { mutate: restoreProject } = useMutation({
    mutationKey: [projectApi.restoreProjectKey],
    mutationFn: projectApi.restoreProject,
    onSuccess: async () => {
      await refetchProjects();
      toast.success("Restore project successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || "Restore project failed");
    },
  });
  const navigateToProject = (projectId: string) => {
    navigate(
      generatePath(paths.project.detail, {
        projectId,
      })
    );
  };

  const mostRecentProjects: IProject[] = useMemo(() => {
    const savedProjects = localStorage.getItem(`${userInfo?.id}-projects`);
    if (savedProjects) {
      const parsedSavedProjects = JSON.parse(savedProjects) as IProject[];
      return parsedSavedProjects.filter(
        (project) =>
          projects?.find((_project) => _project.projectId === project.projectId)
      );
    }
    return [];
  }, [userInfo, projects]);

  const [projectName, setProjectName] = useState("");

  const debounceProjectName = useDebounceValue(projectName, 1000);

  return (
    <div>
      <Typography.Title>Projects</Typography.Title>
      <div className="my-4 w-80">
        <Input
          placeholder="Filter by project name"
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 flex-wrap">
        <div className="flex gap-x-4">
          {mostRecentProjects?.slice(0, 4).map((project) => (
            <div
              key={project.projectId}
              onClick={() => navigateToProject(project.projectId)}
              className="cursor-pointer basis-1/4 bg-white rounded p-4 pb-12 shadow hover:shadow-lg"
            >
              <div className="flex gap-4 items-center">
                <Avatar shape="square">
                  <span className="text-white select-none font-semibold uppercase">
                    {project.projectName?.slice(0, 1)}
                  </span>
                </Avatar>
                <div>
                  <div>
                    <span className="font-semibold">{project.projectName}</span>
                  </div>
                  <div>
                    <span className="font-light text-xs">
                      {project.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {projects
          ?.filter(
            (project) =>
              !debounceProjectName ||
              project.projectName
                .toLowerCase()
                .includes(debounceProjectName.toLowerCase())
          )
          .map((project) => (
            <Row
              key={project.projectId}
              onClick={() =>
                !project.deleteAt && navigateToProject(project.projectId)
              }
              className={classNames(
                "cursor-pointer bg-white rounded p-4 flex items-center shadow hover:shadow-lg",
                project.deleteAt ? "opacity-50" : ""
              )}
            >
              <Col span={22} className="flex gap-4">
                <Avatar shape="square">
                  <span className="text-white select-none font-semibold uppercase">
                    {project.projectName?.slice(0, 1)}
                  </span>
                </Avatar>
                <Space direction="vertical" className="gap-0">
                  <span className="font-semibold">{project.projectName}</span>
                  <span className="font-light text-xs">
                    {project.description}
                  </span>
                </Space>
              </Col>
              {project.deleteAt ? (
                <Col span={2} className="flex justify-end">
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: project.projectId,
                          label: "Restore",
                        },
                      ],
                      onClick: ({ key }) =>
                        modal.confirm({
                          title: "Warning",
                          content: "Are you sure to restore this project?",
                          onOk: () => restoreProject(key),
                        }),
                    }}
                    placement="bottom"
                    arrow
                    trigger={["click"]}
                  >
                    <MoreOutlined className="cursor-pointer" />
                  </Dropdown>
                </Col>
              ) : null}
            </Row>
          ))}
      </div>
      {contextHolder}
    </div>
  );
}
