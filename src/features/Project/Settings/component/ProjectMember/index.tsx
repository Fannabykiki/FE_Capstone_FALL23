import { useMemo, useState } from "react";
import { UserDeleteOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Col,
  Divider,
  Modal,
  Row,
  Space,
  Table,
  Typography,
} from "antd";

import { IProjectMember } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { pagination } from "@/utils/pagination";
import { AvatarWithColor } from "@/components";
import ReAssignModal from "./ReAssignModal";

export default function ProjectMember() {
  const [isOpenModalReAssign, setOpenModalReAssign] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "10",
  });

  const { projectId } = useParams();

  const [modal, contextHolder] = Modal.useModal();

  const { data: memberList, refetch: refetchMemberList } = useQuery({
    queryKey: [projectApi.getListUserInProjectByProjectIdKey, projectId],
    queryFn: async ({ signal }) =>
      projectApi.getListUserInProjectByProjectId(signal, projectId),
    enabled: Boolean(projectId),
  });

  const { mutate: removeMember } = useMutation({
    mutationKey: [projectApi.removeMemberKey],
    mutationFn: projectApi.removeMember,
    onSuccess: async () => {
      await refetchMemberList();
      toast.success("Delete member successfully");
    },
    onError: (err) => {
      toast.error("Delete member failed");
    },
  });
  const managerProject = useMemo(
    () => memberList?.find((member) => member.isOwner),
    [memberList]
  );

  const handleDelete = (memberId: string) => {
    modal.confirm({
      title: "Warning",
      content: "Are you sure to delete this member?",
      onOk: () => removeMember({ memberId }),
    });
  };

  const onChangePage = (page: number, pageSize: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      prev.set("limit", pageSize.toString());
      return prev;
    });
  };

  const columns: ColumnsType<IProjectMember> = [
    {
      title: "Name",
      dataIndex: "fullname",
      width: "40%",
      render: (name, record) => (
        <Row>
          <Col span={4} className="flex justify-center items-center">
            <AvatarWithColor stringContent={name || "Unknown"}>
              {name?.charAt(0).toUpperCase()}
            </AvatarWithColor>
          </Col>
          <Col span={20}>
            <Typography.Title level={5} className="!m-0 min-h-[24px]">
              {name}
            </Typography.Title>
            <Typography.Text className="min-h-[19px]">
              {record.email}
            </Typography.Text>
          </Col>
        </Row>
      ),
    },
    {
      title: "Role",
      dataIndex: "roleName",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "statusName",
      width: "20%",
      render: (status) => (
        <Row align="middle" className="gap-2">
          <Typography.Text
            className={`px-2 py-1 rounded font-medium ${
              status === "In Team"
                ? "text-green-500 bg-[#43ff641a]"
                : "text-red-500 bg-[#ef44441a]"
            }`}
          >
            {status}
          </Typography.Text>
        </Row>
      ),
    },
    {
      dataIndex: "action",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<UserDeleteOutlined />}
            onClick={() => handleDelete(record.memberId)}
          >
            Remove
          </Button>
          {record.roleName === "PO" ? (
            <Button
              icon={<UserSwitchOutlined />}
              onClick={() => setOpenModalReAssign(true)}
            >
              ReAssign
            </Button>
          ) : null}
        </Space>
      ),
    },
  ];

  return (
    <Card className="min-h-screen">
      <Typography className="text-xl font-medium">Project Manager</Typography>
      <div className="mt-3">
        <Row>
          <Col span={1} className="flex justify-center items-center">
            {managerProject ? (
              <AvatarWithColor stringContent={managerProject.fullname}>
                {managerProject.fullname.charAt(0).toUpperCase()}
              </AvatarWithColor>
            ) : null}
          </Col>
          <Col className="ml-3" span={19}>
            {managerProject ? (
              <>
                <Typography.Title level={5} className="!m-0 min-h-[24px]">
                  {managerProject.fullname}
                </Typography.Title>
                <Typography.Text className="min-h-[19px]">
                  {managerProject.email}
                </Typography.Text>
              </>
            ) : null}
          </Col>
        </Row>
      </div>
      <Divider />
      <Typography className="text-xl font-medium mb-5">
        Project Member
      </Typography>
      <Table
        columns={columns}
        dataSource={pagination(
          memberList,
          parseInt(searchParams.get("page") || "1"),
          parseInt(searchParams.get("limit") || "10")
        )}
        pagination={{
          showSizeChanger: true,
          current: parseInt(searchParams.get("page") || "1"),
          pageSize: parseInt(searchParams.get("limit") || "10"),
          pageSizeOptions: [10, 20, 50, 100],
          total: memberList?.length,
          onChange: onChangePage,
          className: "px-5 !mb-0",
        }}
      />
      <ReAssignModal
        isOpen={isOpenModalReAssign}
        handleClose={() => setOpenModalReAssign(false)}
      />
      {contextHolder}
    </Card>
  );
}
