import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EyeOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import orderBy from "lodash/orderBy";
import buildQuery from "odata-query";
import {
  Button,
  Col,
  Modal,
  Row,
  Input,
  Skeleton,
  Space,
  Typography,
} from "antd";

import { useAuthContext } from "@/context/Auth";
import { IAdminRoles } from "@/interfaces/role";
import CreateEditRole from "./CreateEditRole";
import { roleApi } from "@/utils/api/role";
import RoleDetail from "./Detail";

const RoleManagement = () => {
  const [isOpenCreateEditModal, setIsOpenCreateEditModal] = useState(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [roleSelected, setRoleSelected] = useState<IAdminRoles>();

  const [modal, contextHolder] = Modal.useModal();

  const queryClient = useQueryClient();

  const { userInfo } = useAuthContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: roles, isLoading } = useQuery<IAdminRoles[]>({
    queryKey: [
      roleApi.getAdminRolesKey,
      userInfo?.id,
      searchParams.get("search"),
    ],
    queryFn: async ({ signal }) => {
      const data = await roleApi.getAdminRoles(
        signal,
        buildQuery({
          filter: {
            "tolower(roleName)": {
              contains: searchParams.get("search")?.toLowerCase(),
            },
          },
        })
      );

      return orderBy(data, ["role.roleName"], ["asc"]);
    },
    enabled: Boolean(userInfo),
  });

  const {
    mutate: deleteRole,
    isLoading: isDeleting,
    variables,
  } = useMutation({
    mutationFn: roleApi.deleteRole,
    mutationKey: [roleApi.deleteRoleKey],
    onSuccess: async () => {
      await queryClient.refetchQueries([roleApi.getAdminRolesKey]);
      toast.success("Delete role successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data || "Delete role failed");
    },
  });

  const handleOpenCreateEditModal = (role?: IAdminRoles) => {
    setIsOpenCreateEditModal(true);
    setRoleSelected(role);
  };

  const handleOpenRoleDetailModal = (role: IAdminRoles) => {
    setIsOpenDetailModal(true);
    setRoleSelected(role);
  };

  const handleCloseModal = () => {
    setRoleSelected(undefined);
    setIsOpenCreateEditModal(false);
    setIsOpenDetailModal(false);
  };

  const handleDelete = (roleId: string) => {
    modal.confirm({
      title: "Warning",
      content: "Are you sure to delete this role?",
      onOk: () => deleteRole(roleId),
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

  return (
    <Space direction="vertical" className="w-full gap-5">
      {contextHolder}
      <Row gutter={12}>
        <Col span={18}>
          <Typography.Title level={1}>Project Role</Typography.Title>
          <Typography.Text>
            You can use project roles to associate users and/or groups with
            specific projects. The table below shows all the project roles that
            are available in DevTasker. Use this screen to add, edit and delete
            project roles.
          </Typography.Text>
        </Col>
        <Col span={6} className="flex items-end justify-end">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenCreateEditModal()}
          >
            Add new role
          </Button>
        </Col>
      </Row>
      <Row>
        <Input
          className="w-full"
          placeholder="Search"
          defaultValue={searchParams.get("search") || ""}
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          allowClear
        />
      </Row>
      <Row gutter={[24, 24]} className="w-full">
        {(roles || Array.from({ length: 5 }))?.map((role, index) => (
          <Col
            key={index}
            span={8}
            className="cursor-pointer hover:scale-105 transition ease-in-out duration-300"
          >
            <Space
              direction="vertical"
              className="w-full bg-white p-5 rounded-lg shadow-custom"
              onClick={() => !isLoading && handleOpenRoleDetailModal(role)}
            >
              <Skeleton loading={isLoading}>
                <Typography.Title level={3} className="!m-0">
                  {role?.roleName}
                </Typography.Title>
                <Row>
                  <Button
                    type="link"
                    className="!p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCreateEditModal(role);
                    }}
                  >
                    Edit role
                  </Button>
                  <Button
                    type="link"
                    className="!p-0 ml-5"
                    loading={isDeleting && role?.roleId === variables}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(role?.roleId);
                    }}
                  >
                    Delete role
                  </Button>
                  <EyeOutlined className="text-xl ml-auto" />
                </Row>
              </Skeleton>
            </Space>
          </Col>
        ))}
      </Row>
      <CreateEditRole
        isOpen={isOpenCreateEditModal}
        roleEdit={roleSelected}
        handleClose={handleCloseModal}
      />
      <RoleDetail
        isOpen={isOpenDetailModal}
        role={roleSelected}
        handleClose={handleCloseModal}
      />
    </Space>
  );
};

export default RoleManagement;
