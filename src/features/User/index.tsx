import useListProjectOfUser from "@/hooks/useListProjectOfUser";
import { useMemo, useState } from "react";
import { Col, Dropdown, Input, Modal, Row, Space, Typography } from "antd";
import { useAuthContext } from "@/context/Auth";
import { IProject } from "@/interfaces/project";
import { generatePath, useNavigate } from "react-router-dom";
import { paths } from "@/routers/paths";
import { classNames } from "@/utils/common";
import { LoadingOutlined, MoreOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { projectApi } from "@/utils/api/project";
import { toast } from "react-toastify";
import useDebounceValue from "@/hooks/useDebounceValue";
import { AvatarWithColor } from "@/components";
import { ADMIN_ROLES } from "@/utils/constants";
import { orderBy } from "lodash";

export default function UserDashboard() {
  const { projects, refetchProjects, isLoading } = useListProjectOfUser();
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
    const savedProjects = localStorage.getItem(
      `${userInfo?.id}-projects-recent`
    );
    if (savedProjects && projects) {
      const parsedSavedProjects = JSON.parse(savedProjects) as string[];
      return projects.filter((project) =>
        parsedSavedProjects.includes(project.projectId)
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
      {isLoading ? (
        <LoadingOutlined className="text-3xl" />
      ) : (
        <div className="flex flex-col gap-4 flex-wrap">
          {mostRecentProjects.length > 0 && (
            <div>
              <Typography.Title level={4}>Recent projects</Typography.Title>
              <div className="flex gap-x-4">
                {mostRecentProjects?.slice(0, 4).map((project) => (
                  <div
                    key={`recent-${project.projectId}`}
                    onClick={() =>
                      !project.deleteAt && navigateToProject(project.projectId)
                    }
                    className={classNames(
                      "basis-1/4 bg-white rounded p-4 pb-12 shadow flex-grow-0 flex-shrink-0",
                      project.deleteAt
                        ? "cursor-not-allowed opacity-40"
                        : "cursor-pointer hover:shadow-lg",
                      project.projectStatus === "Done" &&
                        "border-2 border-solid border-green-500"
                    )}
                  >
                    <div className="flex gap-4 items-center">
                      <AvatarWithColor
                        shape="square"
                        className="flex-shrink-0"
                        stringContent={project.projectName || "Unknown"}
                      >
                        {project.projectName?.[0].toUpperCase()}
                      </AvatarWithColor>
                      <div>
                        <div
                          className="font-semibold line-clamp-1"
                          title={project.projectName}
                        >
                          {project.projectName}
                        </div>
                        <div
                          className="font-light text-xs line-clamp-3"
                          title={project.description}
                        >
                          {project.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {projects && projects?.length > 0 ? (
            <div className="flex flex-col gap-y-4">
              <Typography.Title level={4}>All projects</Typography.Title>
              {orderBy(
                projects?.filter(
                  (project) =>
                    !debounceProjectName ||
                    project.projectName
                      .toLowerCase()
                      .includes(debounceProjectName.toLowerCase())
                ),
                "createAt",
                "desc"
              ).map((project) => (
                <Row
                  key={project.projectId}
                  onClick={() =>
                    !project.deleteAt && navigateToProject(project.projectId)
                  }
                  className={classNames(
                    "bg-white rounded p-4 flex items-center shadow",
                    project.deleteAt
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer hover:shadow-lg",
                    project.projectStatus === "Done" &&
                      "border-2 border-solid border-green-500"
                  )}
                >
                  <Col span={22} className="flex gap-4">
                    <AvatarWithColor
                      shape="square"
                      stringContent={project.projectName || "Unknown"}
                      className="flex-shrink-0"
                    >
                      {project.projectName?.[0].toUpperCase()}
                    </AvatarWithColor>
                    <Space direction="vertical" className="gap-0">
                      <span
                        className="font-semibold line-clamp-1 truncate"
                        title={project.projectName}
                      >
                        {project.projectName}
                      </span>
                      <span
                        className="font-light text-xs line-clamp-3"
                        title={project.description}
                      >
                        {project.description}
                      </span>
                    </Space>
                  </Col>
                  {project.deleteAt &&
                  ADMIN_ROLES.includes(project.memberRole?.roleName || "") ? (
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
                              onOk: () =>
                                restoreProject({
                                  projectId: key,
                                }),
                            }),
                        }}
                        placement="bottom"
                        arrow
                        trigger={["click"]}
                      >
                        <MoreOutlined className="cursor-pointer p-2 hover:bg-gray-200" />
                      </Dropdown>
                    </Col>
                  ) : null}
                </Row>
              ))}
            </div>
          ) : (
            <Typography.Title>You haven't joined any project.</Typography.Title>
          )}
        </div>
      )}
      {contextHolder}
    </div>
  );
}
