import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MoreOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Modal,
  Row,
  Space,
  Table,
  Typography,
} from "antd";

import ChangeMemberRoleModal from "./ChangeMemberRoleModal";
import { IProjectMember } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { pagination } from "@/utils/pagination";
import { useAuthContext } from "@/context/Auth";
import { ADMIN_ROLES } from "@/utils/constants";
import { AvatarWithColor } from "@/components";
import ReAssignModal from "./ReAssignModal";
import { paths } from "@/routers/paths";

interface IProp {
  isAdminOrPO: boolean;
}

export default function ProjectMember({ isAdminOrPO }: IProp) {
  const [isOpenChangeRoleModal, setOpenChangeRoleModal] =
    useState<IProjectMember>();
  const [isOpenReAssignModal, setOpenReAssignModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "10",
  });

  const { projectId } = useParams();

  const { userInfo } = useAuthContext();

  const [modal, contextHolder] = Modal.useModal();

  const navigate = useNavigate();

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
    onError: (err: any) => {
      toast.error(err?.response?.data || "Delete member failed");
    },
  });

  const { mutate: outProject } = useMutation({
    mutationKey: [projectApi.outProjectKey],
    mutationFn: projectApi.outProject,
    onSuccess: async () => {
      navigate(paths.user);
      toast.success("Out project successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data || "Out project failed");
    },
  });

  const managerProject = useMemo(
    () => memberList?.find((member) => member.isOwner),
    [memberList]
  );

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
      dataIndex: "userName",
      width: "40%",
      render: (_, record) => {
        const name = record.userName || record.email;
        return (
          <Row>
            <Col span={4} className="flex justify-center items-center">
              <AvatarWithColor stringContent={name || "Unknown"}>
                {name?.[0].toUpperCase()}
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
        );
      },
    },
    {
      title: "Role",
      dataIndex: "roleName",
      width: "25%",
    },
    {
      title: "Status",
      dataIndex: "statusName",
      width: "25%",
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
      width: "10%",
      align: "center",
      render: (_, record) => {
        const items = [];
        if (
          !["Unavailable", "Declined"].includes(record.statusName) &&
          (record.userId === userInfo?.id ||
            (record.roleName &&
              !ADMIN_ROLES.includes(record.roleName) &&
              isAdminOrPO))
        ) {
          if (record.userId === userInfo?.id && !isAdminOrPO) {
            items.push({
              key: "out",
              label: "Out project",
            });
          } else {
            if (
              record.roleName &&
              !ADMIN_ROLES.includes(record.roleName) &&
              isAdminOrPO
            ) {
              if (record.statusName !== "Pending") {
                items.push({
                  key: "role",
                  label: "Change role",
                });
              }
              items.push({
                key: "remove",
                label: "Remove",
              });
            }
          }
        }
        return items.length ? (
          <Dropdown
            menu={{
              items,
              onClick: ({ key }) =>
                key === "role"
                  ? setOpenChangeRoleModal(record)
                  : modal.confirm({
                      title: "Warning",
                      content:
                        key === "remove"
                          ? "Are you sure to remove this member?"
                          : "Are you sure to out this project?",
                      onOk: () =>
                        key === "remove"
                          ? removeMember({ memberId: record.memberId })
                          : outProject({ projectId: projectId! }),
                    }),
            }}
            placement="bottom"
            arrow
            trigger={["click"]}
          >
            <MoreOutlined className="cursor-pointer p-2 hover:bg-gray-200" />
          </Dropdown>
        ) : null;
      },
    },
  ];

  return (
    <Card className="min-h-screen">
      <Typography className="text-xl font-medium">Project Manager</Typography>
      <div className="mt-3">
        <Row>
          <Col span={20}>
            <Row className="flex items-center gap-3">
              {managerProject ? (
                <AvatarWithColor
                  stringContent={
                    managerProject.userName || managerProject.email
                  }
                >
                  {(managerProject.userName ||
                    managerProject.email)?.[0].toUpperCase()}
                </AvatarWithColor>
              ) : null}
              {managerProject ? (
                <Space direction="vertical">
                  <Typography.Title level={5} className="!m-0 min-h-[24px]">
                    {managerProject.userName}
                  </Typography.Title>
                  <Typography.Text className="min-h-[19px]">
                    {managerProject.email}
                  </Typography.Text>
                </Space>
              ) : null}
            </Row>
          </Col>
          <Col span={4} className="flex justify-center items-center">
            {isAdminOrPO ? (
              <Button
                icon={<UserSwitchOutlined />}
                onClick={() => setOpenReAssignModal(true)}
              >
                ReAssign
              </Button>
            ) : null}
          </Col>
        </Row>
      </div>
      <Divider />
      <Typography className="text-xl font-medium mb-5">
        Project Member
      </Typography>
      <Table
        rowKey="userId"
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
        isOpen={isOpenReAssignModal}
        handleClose={() => setOpenReAssignModal(false)}
      />
      <ChangeMemberRoleModal
        currentMember={isOpenChangeRoleModal}
        handleClose={() => setOpenChangeRoleModal(undefined)}
      />
      {contextHolder}
    </Card>
  );
}
