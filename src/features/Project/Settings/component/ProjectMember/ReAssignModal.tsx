import { useMemo, useState } from "react";
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

import useProjectDetail from "@/hooks/useProjectDetail";
import { projectApi } from "@/utils/api/project";
import { IAdminRoles } from "@/interfaces/role";
import { roleApi } from "@/utils/api/role";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const ReAssignModal = ({ isOpen, handleClose }: Props) => {
  const [memberId, setMemberId] = useState<string>("");

  const queryClient = useQueryClient();

  const { projectId } = useParams();

  const { detail, actions } = useProjectDetail(projectId);

  const { data: roles, isLoading: isLoadingRoles } = useQuery<IAdminRoles[]>({
    queryKey: [roleApi.getAdminRolesKey],
    queryFn: ({ signal }) => roleApi.getAdminRoles(signal, ""),
  });

  const projectOwner = useMemo(
    () => detail?.projectMembers?.find((member) => member.roleName === "PO"),
    [detail?.projectMembers]
  );

  const { mutate: updateMemberRole, isLoading } = useMutation({
    mutationKey: [projectApi.updateMemberRoleKey],
    mutationFn: projectApi.updateMemberRole,
    onSuccess: async () => {
      await Promise.all([
        queryClient.refetchQueries([
          projectApi.getListUserInProjectByProjectIdKey,
          projectId,
        ]),
        actions.refetchDetail(),
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
    if (!memberId || !rolePOId || !roleMemberId || !projectOwner?.memberId)
      return;
    updateMemberRole({
      roleId: rolePOId,
      memberId,
    });
  };

  const onChange = (e: RadioChangeEvent) => {
    setMemberId(e.target.value);
  };

  const onCancel = () => {
    setMemberId("");
    handleClose();
  };

  return (
    <Modal
      maskClosable={false}
      title="ReAssign PO Role"
      open={isOpen}
      onCancel={onCancel}
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
              options={detail?.projectMembers
                ?.filter((member) => member.roleName !== "PO")
                ?.map((member) => ({
                  label: member.userName || member.email,
                  value: member.memberId,
                }))}
              value={memberId}
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
