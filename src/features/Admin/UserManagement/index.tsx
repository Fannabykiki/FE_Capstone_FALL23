import { useState } from "react";
import { EyeOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import buildQuery from "odata-query";
import {
  Avatar,
  Col,
  Input,
  Row,
  Space,
  Table,
  Typography,
  Select,
  Switch,
} from "antd";

import useAdminUserManagement from "@/hooks/useAdminUserManagement";
import deactiveUser from "@/assets/images/deactive-user.png";
import activeUser from "@/assets/images/active-user.png";
import { IAdminUsers } from "@/interfaces/user";
import UserDetailModal from "./UserDetailModal";
import { pagination } from "@/utils/pagination";
import { userApi } from "@/utils/api/user";

const UserManagement = () => {
  const [userDetail, setUserDetail] = useState<IAdminUsers>();
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "10",
  });

  const { users, analyzation, isLoading } = useAdminUserManagement({
    queryString: buildQuery({
      filter: {
        statusName: searchParams.get("status") || undefined,
        isAdmin: searchParams.get("role")
          ? searchParams.get("role") === "admin"
          : undefined,
        "tolower(userName)": {
          contains: searchParams.get("search")?.toLowerCase(),
        },
      },
    }),
  });

  const queryClient = useQueryClient();

  const {
    mutate: updateUserStatus,
    isLoading: isUpdating,
    variables,
  } = useMutation({
    mutationFn: userApi.changeUserStatus,
    mutationKey: [userApi.changeUserStatusKey],
    onSuccess: async () => {
      await Promise.all([
        queryClient.refetchQueries([userApi.getAdminUsersKey]),
        queryClient.refetchQueries([userApi.getAdminUsersAnalyzationKey]),
      ]);
      toast.success("Change status successfully");
    },
    onError: (err) => {
      toast.error("Change status failed");
    },
  });

  const onChangePage = (page: number, pageSize: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      prev.set("limit", pageSize.toString());
      return prev;
    });
  };

  const handleChange = (fieldName: string) => (value: string) => {
    setSearchParams((prev) => {
      if (!value) {
        prev.delete(fieldName);
      } else {
        prev.set(fieldName, value);
      }
      return prev;
    });
  };

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      if (!e.target.value) {
        prev.delete("search");
      } else {
        prev.set("search", e.target.value);
      }
      return prev;
    });
  }, 1000);

  const handleViewDetail = (record: IAdminUsers) => {
    setUserDetail(record);
  };

  const handleChangeStatus = (userId: string, value: boolean) => {
    updateUserStatus({
      id: userId,
      data: {
        statusIdChangeTo: value,
        reason: "",
      },
    });
  };

  const columns: ColumnsType<IAdminUsers> = [
    {
      title: "USER",
      dataIndex: "userName",
      width: "40%",
      render: (name, record) => (
        <Row>
          <Col span={4} className="flex justify-center items-center">
            <Avatar style={{ backgroundColor: record.avatarColor }}>
              {name?.charAt(0).toUpperCase()}
            </Avatar>
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
      title: "ROLE",
      dataIndex: "isAdmin",
      width: "15%",
      render: (isAdmin, record) => (
        <Row align="middle">
          <img
            src={record.statusName === "Active" ? activeUser : deactiveUser}
            className={`w-10 h-10 bg-[${
              record.statusName === "Active" ? "#43ff641a" : "#ef44441a"
            }] rounded-full`}
            alt={isAdmin ? "Admin" : "Member"}
          />
          <Typography.Text className="ml-5">
            {isAdmin ? "Admin" : "Member"}
          </Typography.Text>
        </Row>
      ),
    },
    {
      title: "CONTACT",
      dataIndex: "phoneNumber",
      width: "12%",
    },
    {
      title: "STATUS",
      dataIndex: "statusName",
      width: "18%",
      render: (statusName, record) => (
        <Row align="middle" className="gap-2">
          <Switch
            defaultChecked={statusName === "Active"}
            disabled={variables?.id === record.userId && isUpdating}
            onChange={(value) => handleChangeStatus(record.userId, value)}
          />
          <Typography.Text
            className={`px-2 py-1 rounded font-medium ${
              statusName === "Active"
                ? "text-green-500 bg-[#43ff641a]"
                : "text-red-500 bg-[#ef44441a]"
            }`}
          >
            {statusName}
          </Typography.Text>
        </Row>
      ),
    },
    {
      title: "ACTIONS",
      width: "10%",
      align: "center",
      render: (_, record) => (
        <Space size="large">
          <EyeOutlined
            className="text-xl cursor-pointer"
            onClick={() => handleViewDetail(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" className="w-full">
      <Space className="!gap-0">
        <Typography.Title level={1}>User List</Typography.Title>
      </Space>
      <Row gutter={48}>
        <Col span={8}>
          <Row className="p-4 rounded-md shadow-custom">
            <Col span={20}>
              <Typography.Title level={4}>Total Users</Typography.Title>
              <Typography.Title level={4} className="!mt-4">
                {analyzation?.totalUser}
                <small className="text-green-500 ml-2">(100%)</small>
              </Typography.Title>
            </Col>
            <Col span={4} className="flex justify-center items-center">
              <TeamOutlined className="text-3xl" />
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row className="p-4 rounded-md shadow-custom">
            <Col span={20}>
              <Typography.Title level={4}>Active Users</Typography.Title>
              <Typography.Title level={4} className="!mt-4">
                {analyzation?.activeUsers}
                <small className="text-green-500 ml-2">
                  ({analyzation?.percentActive}%)
                </small>
              </Typography.Title>
            </Col>
            <Col span={4} className="flex justify-center items-center">
              <img
                src={activeUser}
                className="w-10 h-10 bg-[#43ff641a] rounded"
                alt="active-user"
              />
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row className="p-4 rounded-md shadow-custom">
            <Col span={20}>
              <Typography.Title level={4}>Inactive Users</Typography.Title>
              <Typography.Title level={4} className="!mt-4">
                {analyzation?.inactiveUser}
                <small className="text-red-500 ml-2">
                  ({analyzation?.percentInactive}%)
                </small>
              </Typography.Title>
            </Col>
            <Col span={4} className="flex justify-center items-center">
              <img
                src={deactiveUser}
                className="w-10 h-10 bg-[#ef44441a] rounded"
                alt="deactive-user"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Space direction="vertical" className="w-full shadow-custom mt-5 py-5">
        <Row className="px-3" gutter={16}>
          <Col span={10}>
            <Input
              className="w-full"
              placeholder="Search"
              defaultValue={searchParams.get("search") || ""}
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              allowClear
            />
          </Col>
          <Col span={7}>
            <Select
              className="w-full"
              placeholder="Select Role"
              defaultValue={searchParams.get("role")}
              onChange={handleChange("role")}
              allowClear
              options={[
                { value: "admin", label: "Admin" },
                { value: "member", label: "Member" },
              ]}
            />
          </Col>
          <Col span={7}>
            <Select
              className="w-full"
              placeholder="Select Status"
              defaultValue={searchParams.get("status")}
              onChange={handleChange("status")}
              allowClear
              options={[
                { value: "Active", label: "Active" },
                { value: "InActive", label: "Inactive" },
              ]}
            />
          </Col>
        </Row>
        <Table
          rowKey="userId"
          className="mt-5"
          columns={columns}
          loading={isLoading}
          dataSource={pagination(
            users,
            parseInt(searchParams.get("page") || "1"),
            parseInt(searchParams.get("limit") || "10")
          )}
          pagination={{
            showSizeChanger: true,
            current: parseInt(searchParams.get("page") || "1"),
            pageSize: parseInt(searchParams.get("limit") || "10"),
            pageSizeOptions: [10, 20, 50, 100],
            total: users?.length,
            onChange: onChangePage,
            className: "px-5 !mb-0",
          }}
        />
      </Space>
      <UserDetailModal
        userDetail={userDetail}
        handleClose={() => setUserDetail(undefined)}
      />
    </Space>
  );
};

export default UserManagement;
