import useListProjectOfUser from "@/hooks/useListProjectOfUser";
import React from "react";
import { faker } from "@faker-js/faker";
import { classNames } from "@/utils/common";

export default function UserMainPage() {
  const { projects } = useListProjectOfUser();
  return (
    <div className="flex gap-4 flex-wrap">
      {projects?.map((project) => (
        <div
          key={project.projectId}
          className="bg-white w-60 px-2 py-8 rounded-lg flex flex-col justify-center items-center gap-4 shadow hover:shadow-lg"
        >
          <div
            style={{ backgroundColor: faker.color.rgb() }}
            className="rounded-full w-20 h-20 relative"
          >
            <span
              className={classNames(
                "text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none",
                "text-2xl font-semibold uppercase"
              )}
            >
              {project.projectName.slice(0, 1)}
            </span>
          </div>
          <div className="text-center">
            <p className="font-semibold text-xl">{project.projectName}</p>
            <span className="font-light">{project.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
