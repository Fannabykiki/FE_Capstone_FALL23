import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Col, Divider, Modal, Row, Select, Space, Typography } from "antd";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import buildQuery from "odata-query";

import { IProjectMember } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { roleApi } from "@/utils/api/role";

interface Props {
  currentMember: IProjectMember | undefined;
  handleClose: () => void;
}

const ChangeMemberRoleModal = ({ currentMember, handleClose }: Props) => {
  const [loadingCheckExistTask, setLoadingCheckExistTask] =
    useState<boolean>(false);
  const [roleId, setRoleId] = useState<string>();

  const queryClient = useQueryClient();

  const { projectId } = useParams();

  const [modal, contextHolder] = Modal.useModal();

  const { data: roles, isLoading: isLoadingRoles } = useQuery({
    queryKey: [roleApi.getRolesByProjectIdKey, currentMember?.memberId],
    queryFn: async ({ signal }) => {
      const data = await roleApi.getRolesByProjectId(signal, projectId!);
      return data.filter((role) => role.roleId !== currentMember?.roleId);
    },
    initialData: [],
    enabled: Boolean(currentMember) && Boolean(projectId),
  });

  const { mutate: updateMemberRole, isLoading } = useMutation({
    mutationKey: [projectApi.updateMemberRoleKey],
    mutationFn: projectApi.updateMemberRole,
    onSuccess: async () => {
      await queryClient.refetchQueries([
        projectApi.getListUserInProjectByProjectIdKey,
        projectId,
      ]);
      toast.success("Change member role successfully");
      onClose();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data || "Change member role failed");
    },
  });

  const onClose = () => {
    setRoleId(undefined);
    handleClose();
  };

  const handleSubmit = async () => {
    if (!roleId) return;
    setLoadingCheckExistTask(true);
    const checkExistTasks = await projectApi.getWorkItemListByProjectId(
      undefined,
      projectId,
      buildQuery({
        filter: {
          "assignTo/userId": {
            eq: { type: "guid", value: currentMember?.userId },
          },
          or: [{ taskStatus: "To do" }, { taskStatus: "In Progress" }],
        },
      })
    );
    setLoadingCheckExistTask(false);
    if (checkExistTasks.length) {
      modal.confirm({
        title: "Warning",
        content:
          "There are still tasks assigned to this member. Are you sure you want to change its role? All remaining tasks will be assigned to you.",
        onOk: () => {
          updateMemberRole({
            memberId: currentMember?.memberId!,
            roleId,
          });
        },
      });
    } else {
      updateMemberRole({
        memberId: currentMember?.memberId!,
        roleId,
      });
    }
  };

  return (
    <Modal
      maskClosable={false}
      title="Change member role"
      open={!!currentMember}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="OK"
      okButtonProps={{
        loading: isLoading || isLoadingRoles || loadingCheckExistTask,
      }}
    >
      <Divider className="!m-0" />
      <Space direction="vertical" className="w-full my-5">
        <Row gutter={8}>
          <Col span={8} className="flex items-end justify-end">
            <Typography.Title level={5} className="!m-0 !text-[#5f5f5f]">
              From
            </Typography.Title>
          </Col>
          <Col span={16}>
            <Typography.Title level={5} className="!m-0">
              {currentMember?.roleName}
            </Typography.Title>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8} className="flex justify-end">
            <Typography.Title level={5} className="!m-0 !text-[#5f5f5f]">
              To
            </Typography.Title>
          </Col>
          <Col span={16}>
            <Select
              options={roles.map((role) => ({
                label: role.roleName,
                value: role.roleId,
              }))}
              placeholder="Select new role"
              className="min-w-[200px]"
              value={roleId}
              onChange={setRoleId}
            />
          </Col>
        </Row>
      </Space>
      <Divider className="!m-0" />
      {contextHolder}
    </Modal>
  );
};

export default ChangeMemberRoleModal;
