import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import {
  Avatar,
  Col,
  Divider,
  Modal,
  Row,
  Space,
  Table,
  Typography,
} from "antd";

import { IAdminUserProjectList } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { IAdminUsers } from "@/interfaces/user";
import { useAuthContext } from "@/context/Auth";
import { pagination } from "@/utils/pagination";
import { randomBgColor } from "@/utils/random";

interface Props {
  userDetail: IAdminUsers | undefined;
  handleClose: () => void;
}

const UserDetailModal = ({ userDetail, handleClose }: Props) => {
  const [conditions, setConditions] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });
  const { userInfo } = useAuthContext();

  const { data, isLoading } = useQuery<IAdminUserProjectList[]>({
    queryKey: [projectApi.getAdminUsersAnalyzationByUserIdKey, userInfo?.id],
    queryFn: ({ signal }) =>
      projectApi.getAdminUsersAnalyzationByUserId(signal, userInfo?.id),
    enabled: Boolean(userInfo) && !!userDetail,
  });

  const onCancel = () => {
    handleClose();
  };

  const onChangePage = (page: number, limit: number) => {
    setConditions({ page, limit });
  };

  const columns: ColumnsType<IAdminUserProjectList> = [
    {
      dataIndex: "index",
      width: "5%",
      render: (_name, _record, index) => index + 1,
    },
    {
      title: "PROJECT",
      dataIndex: "projectName",
      width: "35%",
      render: (projectName, record) => (
        <Row>
          <Col span={4} className="flex justify-center items-center">
            <Avatar style={{ backgroundColor: randomBgColor() }}>
              {projectName?.charAt(0).toUpperCase()}
            </Avatar>
          </Col>
          <Col span={20}>
            <Typography.Title level={5} className="!m-0 min-h-[24px]">
              {projectName}
            </Typography.Title>
            <Typography.Text>{record.description}</Typography.Text>
          </Col>
        </Row>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "projectStatus",
      width: "15%",
      align: "center",
      render: (status: string) => {
        let color = "";
        let bg = "";

        switch (status) {
          case "Active":
            color = "#6ED99F";
            bg = "#E5F8ED";
            break;
          case "Close":
            color = "#4AD8EC";
            bg = "#E0F9FC";
            break;
          case "Inactive":
            color = "#968EF3";
            bg = "#EEEDFD";
            break;
          case "Deleted":
            color = "#EE8181";
            bg = "#FCEAEA";
            break;
          default:
            color = "";
            bg = "";
            break;
        }

        return (
          <Row justify="center">
            <Typography.Text
              style={{
                color,
                backgroundColor: bg,
              }}
              className="px-4 py-1 rounded-2xl font-medium"
            >
              {status}
            </Typography.Text>
          </Row>
        );
      },
    },
    {
      title: "MANAGER",
      dataIndex: "manager",
      width: "25%",
      render: (_, record) => (
        <Row align="middle">
          <Col span={6} className="flex items-center">
            <Avatar style={{ backgroundColor: randomBgColor() }}>
              {record.manager?.userName?.charAt(0).toUpperCase()}
            </Avatar>
          </Col>
          <Col span={18}>
            <Typography.Title level={5} className="!m-0">
              {record.manager?.userName}
            </Typography.Title>
          </Col>
        </Row>
      ),
    },
    {
      title: "START DATE",
      dataIndex: "startDate",
      width: "20%",
      render: (startDate) =>
        startDate ? dayjs(startDate).format("DD/MM/YYYY") : undefined,
    },
  ];

  return (
    <Modal
      title="User detail"
      open={!!userDetail}
      onCancel={onCancel}
      width="90vw"
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Space
            direction="vertical"
            className="w-full p-4 rounded-md shadow-custom"
          >
            <Space
              direction="vertical"
              className="flex justify-center items-center w-full"
            >
              <Avatar
                shape="square"
                className="w-[80px] h-[80px] flex justify-center items-center text-3xl"
                style={{ backgroundColor: randomBgColor() }}
              >
                {userDetail?.userName?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography.Text className="font-medium">
                {userDetail?.userName}
              </Typography.Text>
            </Space>
            <Typography.Title level={5} className="!m-0 text-bold">
              Details
            </Typography.Title>
            <Divider className="!m-0" />
            <Space direction="vertical" className="flex justify-center w-full">
              <Typography.Text>
                <b>Email: </b>
                {userDetail?.email}
              </Typography.Text>
              <Typography.Text>
                <b>Status: </b>
                {userDetail?.statusName}
              </Typography.Text>
              <Typography.Text>
                <b>Role: </b>
                {userDetail?.isAdmin ? "Admin" : "Member"}
              </Typography.Text>
              <Typography.Text>
                <b>DoB: </b>
                {userDetail?.dob
                  ? dayjs(userDetail.dob).format("DD/MM/YYYY")
                  : ""}
              </Typography.Text>
              <Typography.Text>
                <b>Address: </b>
                {userDetail?.address}
              </Typography.Text>
            </Space>
          </Space>
        </Col>
        <Col span={16}>
          <Space
            direction="vertical"
            className="w-full p-4 rounded-md shadow-custom"
          >
            <Typography.Title level={3} className="!m-0">
              User's Project's List
            </Typography.Title>
            <Table
              rowKey="projectId"
              columns={columns}
              loading={isLoading}
              dataSource={pagination(data, conditions.page, conditions.limit)}
              pagination={{
                showSizeChanger: true,
                current: conditions.page,
                pageSize: conditions.limit,
                pageSizeOptions: [10, 20, 50, 100],
                total: data?.length,
                onChange: onChangePage,
                className: "px-5 !mb-0",
              }}
            />
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default UserDetailModal;
