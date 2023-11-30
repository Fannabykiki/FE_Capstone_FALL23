import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Col, Divider, Modal, Row, Select, Space, Typography } from "antd";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { IProjectMember } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { roleApi } from "@/utils/api/role";

interface Props {
  currentMember: IProjectMember | undefined;
  handleClose: () => void;
}

const ChangeMemberRoleModal = ({ currentMember, handleClose }: Props) => {
  const [roleId, setRoleId] = useState("");

  const queryClient = useQueryClient();

  const { projectId } = useParams();

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
      handleClose();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data || "Change member role failed");
    },
  });

  return (
    <Modal
      title="Change member role"
      open={!!currentMember}
      onCancel={handleClose}
      onOk={() =>
        updateMemberRole({
          memberId: currentMember?.memberId!,
          roleId,
        })
      }
      okText="OK"
      okButtonProps={{
        loading: isLoading || isLoadingRoles,
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
              onChange={setRoleId}
            />
          </Col>
        </Row>
      </Space>
      <Divider className="!m-0" />
    </Modal>
  );
};

export default ChangeMemberRoleModal;
