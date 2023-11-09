import useListProjectOfUser from "@/hooks/useListProjectOfUser";
import React, { useMemo } from "react";
import { faker } from "@faker-js/faker";
import { Avatar, Typography } from "antd";
import { useAuthContext } from "@/context/Auth";
import { IProject } from "@/interfaces/project";
import { generatePath, useNavigate } from "react-router-dom";
import { paths } from "@/routers/paths";

export default function UserDashboard() {
  const { projects } = useListProjectOfUser();
  const { userInfo } = useAuthContext();
  const navigate = useNavigate();

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
      return JSON.parse(savedProjects);
    }
    return [];
  }, [userInfo]);

  return (
    <div>
      <Typography.Title>Projects</Typography.Title>
      <div className="flex flex-col gap-4 flex-wrap">
        <div className="flex gap-x-4">
          {mostRecentProjects?.slice(0, 4).map((project) => (
            <div
              key={project.projectId}
              onClick={() => navigateToProject(project.projectId)}
              className="cursor-pointer basis-1/4 bg-white rounded p-4 pb-12 shadow hover:shadow-lg"
            >
              <div className="flex gap-4 items-center">
                <Avatar
                  shape="square"
                  style={{ backgroundColor: faker.color.rgb() }}
                >
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
        {projects?.map((project) => (
          <div
            key={project.projectId}
            onClick={() => navigateToProject(project.projectId)}
            className="cursor-pointer bg-white rounded p-4 flex items-center gap-4 shadow hover:shadow-lg"
          >
            <Avatar
              shape="square"
              style={{ backgroundColor: faker.color.rgb() }}
            >
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
        ))}
      </div>
    </div>
  );
}
