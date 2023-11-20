import { useAuthContext } from "@/context/Auth";
import useProjectDetail from "@/hooks/useProjectDetail";
import { EProjectPrivacyStatusLabel, IProject } from "@/interfaces/project";
import { paths } from "@/routers/paths";
import { Avatar, Button, Tooltip, Typography } from "antd";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";
import {
  FileAddOutlined,
  FileDoneOutlined,
  LockOutlined,
  PlusOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import InviteMemberModal from "./InviteMemberModal";

export default function ProjectDetail() {
  const [isOpenInviteMemberModal, setOpenInviteMemberModal] =
    useState<boolean>(false);

  const { projectId } = useParams();
  const { userInfo } = useAuthContext();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!projectId) {
      navigate(paths.user);
    }
  }, [projectId, navigate]);

  const { detail, actions } = useProjectDetail(projectId);

  useEffect(() => {
    if (detail && userInfo) {
      let projects: Partial<IProject>[] = [];
      const savedProjectsString = localStorage.getItem(
        `${userInfo?.id}-projects`
      );
      if (savedProjectsString) {
        projects = JSON.parse(savedProjectsString) as Partial<IProject>[];
      }
      projects = projects.filter(
        (project) => project.projectId !== detail?.projectId
      );
      projects.unshift({
        projectId: detail?.projectId,
        projectName: detail?.projectName,
        description: detail?.description,
      });
      localStorage.setItem(
        `${userInfo?.id}-projects`,
        JSON.stringify(projects.slice(0, 4))
      );
    }
  }, [detail, userInfo]);

  const handleOpenInviteMemberModal = () => {
    setOpenInviteMemberModal(true);
  };

  const onUpdatePrivacyStatus = (_detail: IProject | undefined) => {
    if (!_detail) return;
    actions.updatePrivacyStatus(
      {
        id: _detail?.projectId,
        privacyStatus: !_detail?.privacyStatus,
      },
      {
        onSuccess: (_, variables) => {
          toast.success(
            `Updated privacy status of the project to '${
              variables.privacyStatus
                ? EProjectPrivacyStatusLabel.Public
                : EProjectPrivacyStatusLabel.Private
            }'`
          );
          actions.refetchDetail();
        },
      }
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Typography.Title>{detail?.projectName}</Typography.Title>
        <div className="flex gap-x-4">
          <Button
            icon={detail?.privacyStatus ? <UnlockOutlined /> : <LockOutlined />}
            type={detail?.privacyStatus ? "primary" : "default"}
            loading={actions.isUpdatingPrivacyStatus}
            onClick={() => onUpdatePrivacyStatus(detail)}
          >
            {detail?.privacyStatus
              ? EProjectPrivacyStatusLabel.Public
              : EProjectPrivacyStatusLabel.Private}
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenInviteMemberModal}
          >
            Invite
          </Button>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="bg-white shadow p-4 flex-grow h-fit rounded-md">
          <p className="font-semibold text-xl">About this project</p>
          <Typography.Paragraph>{detail?.description}</Typography.Paragraph>
        </div>
        <div className="basis-1/3 flex-shrink-0 flex flex-col gap-4">
          <div className="bg-white shadow p-4 rounded-md">
            <p className="font-semibold text-xl">Project Stats</p>
            <p className="font-semibold text-lg">Boards</p>
            <div className="flex gap-x-4">
              <div className="basis-1/2 flex gap-x-2 items-center">
                <div>
                  <FileAddOutlined className="text-2xl" />
                </div>
                <div>
                  <div>{detail?.totalTaskCreated}</div>
                  <div>Task created</div>
                </div>
              </div>
              <div className="basis-1/2 flex gap-x-2 items-center">
                <div>
                  <FileDoneOutlined className="text-2xl" />
                </div>
                <div>
                  <div>{detail?.totalTaskCompleted}</div>
                  <div>Task completed</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow p-4 rounded-md">
            <p className="font-semibold text-xl">Members</p>
            <Avatar.Group maxCount={4}>
              {detail?.projectMembers.map((member) => (
                <Tooltip
                  key={member.memberId}
                  title={member.fullname}
                  placement="top"
                >
                  <Avatar
                    key={member.userId}
                    src={faker.image.avatarGitHub()}
                  />
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
        </div>
        <InviteMemberModal
          isOpen={isOpenInviteMemberModal}
          handleClose={() => setOpenInviteMemberModal(false)}
        />
      </div>
    </>
  );
}
