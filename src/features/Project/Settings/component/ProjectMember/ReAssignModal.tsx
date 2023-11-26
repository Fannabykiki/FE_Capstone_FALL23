import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Col,
  Divider,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Typography,
} from "antd";

import { IProjectMember } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { IAdminRoles } from "@/interfaces/role";
import { roleApi } from "@/utils/api/role";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const ReAssignModal = ({ isOpen, handleClose }: Props) => {
  const [memberId, setMemberId] = useState<string>();

  const queryClient = useQueryClient();

  const { projectId } = useParams();

  const memberList = queryClient.getQueryData<IProjectMember[]>([
    projectApi.getListUserInProjectByProjectIdKey,
    projectId,
  ]);

  const { data: roles, isLoading: isLoadingRoles } = useQuery<IAdminRoles[]>({
    queryKey: [roleApi.getAdminRolesKey],
    queryFn: ({ signal }) => roleApi.getAdminRoles(signal, ""),
  });

  const { mutate: updateMemberRole, isLoading } = useMutation({
    mutationKey: [projectApi.updateMemberRoleKey],
    mutationFn: projectApi.updateMemberRole,
    onSuccess: async () => {
      await queryClient.refetchQueries([
        projectApi.getListUserInProjectByProjectIdKey,
        projectId,
      ]);
      toast.success("Update PO successfully");
      handleClose();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data || "Update PO failed");
    },
  });

  const handleSubmit = () => {
    const rolePOId = roles?.find((role) => role.roleName === "PO")?.roleId;
    const roleMemberId = roles?.find(
      (role) => role.roleName === "Normal Member"
    )?.roleId;
    const oldPOMemberId = memberList?.find((member) => member.roleName === "PO")
      ?.memberId;
    if (!memberId || !rolePOId || !roleMemberId || !oldPOMemberId) return;
    Promise.all([
      updateMemberRole({
        roleId: rolePOId,
        memberId,
      }),
      // updateMemberRole({
      //   roleId: roleMemberId,
      //   memberId: oldPOMemberId,
      // }),
    ]);
  };

  const onChange = (e: RadioChangeEvent) => {
    setMemberId(e.target.value);
  };

  const projectOwner = memberList?.find((member) => member.roleName === "PO");

  return (
    <Modal
      title="ReAssign PO Role"
      open={isOpen}
      onCancel={handleClose}
      onOk={handleSubmit}
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
              {projectOwner?.userName || projectOwner?.email}
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
            <Radio.Group
              className="flex flex-col"
              options={memberList
                ?.filter((member) => member.roleName !== "PO")
                ?.map((member) => ({
                  label: member.userName || member.email,
                  value: member.memberId,
                }))}
              onChange={onChange}
            />
          </Col>
        </Row>
      </Space>
      <Divider className="!m-0" />
    </Modal>
  );
};

export default ReAssignModal;
