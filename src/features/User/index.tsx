import useListProjectOfUser from "@/hooks/useListProjectOfUser";
import React from "react";
import { faker } from "@faker-js/faker";
import { classNames } from "@/utils/common";
import { Avatar } from "antd";

export default function UserMainPage() {
  const { projects } = useListProjectOfUser();
  return (
    <div className="flex flex-col gap-4 flex-wrap">
      {projects?.map((project) => (
        <div
          key={project.projectId}
          className="bg-white rounded p-4 flex gap-2 items-center gap-4 shadow hover:shadow-lg"
        >
          <Avatar style={{ backgroundColor: faker.color.rgb() }}>
            <span className="text-white select-none font-semibold uppercase">
              {project.projectName.slice(0, 1)}
            </span>
          </Avatar>
          <div>
            <div>
              <span className="font-semibold">{project.projectName}</span>
            </div>
            <div>
              <span className="font-light text-xs">{project.description}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
