import { Layout, Spin } from "antd";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { RANDOM_COLOR, STATUS_COLOR } from "@/utils/constants";
import { taskApi } from "@/utils/api/task";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import ProjectSider from "./Sider";
import useProjectDetail from "@/hooks/useProjectDetail";
import { useAuthContext } from "@/context/Auth";
import { useEffect } from "react";
import { paths } from "@/routers/paths";
import { toast } from "react-toastify";

export default function ProjectLayout() {
  const { projectId } = useParams();

  const { isFetched } = useQuery({
    queryKey: [taskApi.getTaskStatusKey, projectId],
    queryFn: async ({ signal }) => {
      const data = await taskApi.getTaskStatus(signal, projectId!);

      return data
        .sort((a, b) => a.order - b.order)
        .map((status, index) => ({
          ...status,
          hexColor:
            STATUS_COLOR[status.title as keyof typeof STATUS_COLOR] ||
            RANDOM_COLOR[index],
        }));
    },
    initialData: [],
  });

  const { memberList } = useProjectDetail(projectId);
  const { userInfo } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (memberList) {
      if (
        memberList.length > 0 &&
        !memberList.find(
          (member) =>
            member.userId === userInfo?.id && member.statusName === "In Team"
        )
      ) {
        toast.warning("You are not a part of this project");
        navigate(paths.user);
      }
    }
  }, [memberList, userInfo, navigate]);

  if (
    memberList &&
    memberList.length > 0 &&
    memberList.find(
      (member) =>
        member.userId === userInfo?.id && member.statusName === "In Team"
    )
  )
    return (
      <Layout style={{ height: "100vh" }}>
        <Layout>
          <ProjectSider />
          <Layout.Content className="flex-1 flex flex-col">
            <Header />
            {projectId && isFetched ? (
              <div className="p-8 flex-1 overflow-y-auto">
                <Outlet />
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <Spin />
              </div>
            )}
            <Footer />
          </Layout.Content>
        </Layout>
      </Layout>
    );
  return null;
}
