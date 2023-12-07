import { useState } from "react";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";
import buildQuery from "odata-query";
import {
  Button,
  Col,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";

import CreatePermissionScheme from "./CreateEditPermissionScheme";
import { IPermissionSchemes } from "@/interfaces/schema";
import { useAuthContext } from "@/context/Auth";
import { schemaApi } from "@/utils/api/schema";
import { paths } from "@/routers/paths";

const PermissionSchemes = () => {
  const [permissionSchemeSelected, setPermissionSchemeSelected] =
    useState<IPermissionSchemes>();
  const [isOpenCreatePermSchemeModal, setOpenCreatePermSchemeModal] =
    useState<boolean>(false);

  const [modal, contextHolder] = Modal.useModal();

  const [searchParams, setSearchParams] = useSearchParams();

  const { userInfo } = useAuthContext();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data: schemas, isLoading } = useQuery<IPermissionSchemes[]>({
    queryKey: [
      schemaApi.getAdminSchemasKey,
      userInfo?.id,
      searchParams.get("search"),
    ],
    queryFn: ({ signal }) =>
      schemaApi.getAdminSchemas(
        signal,
        buildQuery({
          filter: {
            "tolower(schemaName)": {
              contains: searchParams.get("search")?.toLowerCase(),
            },
          },
        })
      ),
    enabled: Boolean(userInfo),
  });

  const {
    mutate: deleteSchema,
    isLoading: isDeleting,
    variables,
  } = useMutation({
    mutationFn: schemaApi.deleteSchema,
    mutationKey: [schemaApi.deleteSchemaKey],
    onSuccess: async () => {
      await queryClient.refetchQueries([schemaApi.getAdminSchemasKey]);
      toast.success("Delete schema successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data || "Delete schema failed");
    },
  });

  const handleDelete = (schemaId: string) => {
    modal.confirm({
      title: "Warning",
      content: "Are you sure to delete this schema?",
      onOk: () => deleteSchema(schemaId),
    });
  };

  const onChange = (value: string) => {
    setSearchParams((prev) => {
      if (!value) {
        prev.delete("search");
      } else {
        prev.set("search", value);
      }
      return prev;
    });
  };

  const handleClose = () => {
    setOpenCreatePermSchemeModal(false);
    setPermissionSchemeSelected(undefined);
  };

  const columns: ColumnsType<IPermissionSchemes> = [
    {
      title: "Name",
      dataIndex: "schemaName",
      width: "45%",
      className: "align-top",
      render: (schemaName, record) => (
        <Space direction="vertical" className="gap-y-0">
          <Button
            type="link"
            className="font-medium text-xl p-0 min-h-[28px]"
            onClick={() => {
              navigate(
                generatePath(paths.admin.projectPermission, {
                  schemaId: record.schemaId,
                })
              );
            }}
          >
            {schemaName}
          </Button>
          <Typography.Text>{record.description}</Typography.Text>
        </Space>
      ),
    },
    {
      title: "Projects",
      dataIndex: "projectsUsed",
      width: "45%",
      render: (projectsUsed: IPermissionSchemes["projectsUsed"]) => (
        <ul>
          {projectsUsed.map((project, index) => (
            <li
              key={index}
              className="text-blue-600 text-sm cursor-pointer hover:underline"
              onClick={() =>
                navigate(
                  generatePath(paths.project.detail, {
                    projectId: project.projectId,
                  })
                )
              }
            >
              {project.projectName}
            </li>
          ))}
        </ul>
      ),
    },
    {
      width: "10%",
      className: "align-top",
      align: "center",
      render: (_, record) => (
        <Row justify="space-evenly">
          <Button
            ghost
            className="hover:!border-transparent hover:!bg-transparent focus:outline-none active:!bg-transparent"
            loading={isDeleting && record.schemaId === variables}
            onClick={() => handleDelete(record.schemaId)}
            icon={
              <DeleteOutlined
                style={{
                  color: "red",
                  fontSize: 22,
                }}
              />
            }
          />
          <EditOutlined
            className="text-xl cursor-pointer"
            onClick={() => {
              setPermissionSchemeSelected(record);
              setOpenCreatePermSchemeModal(true);
            }}
          />
        </Row>
      ),
    },
  ];

  return (
    <Space direction="vertical" className="w-full">
      {contextHolder}
      <Row>
        <Col span={18}>
          <Typography.Title level={1} className="!m-0">
            Permission Schemes
          </Typography.Title>
          <Typography.Text>
            Permission Schemes allow you to create a set of permissions and
            apply this set of permissions to any project.
            <br />
            <br />
            All permissions within a scheme will apply to all projects that are
            associated with that scheme.
            <br />
            The table below shows the permission schemes currently configured
            for this server. For permissions that apply to all projects see
            global permissions.
          </Typography.Text>
        </Col>
        <Col span={6} className="flex justify-end items-center">
          <Button
            type="primary"
            onClick={() => setOpenCreatePermSchemeModal(true)}
          >
            Add permission scheme
          </Button>
        </Col>
      </Row>
      <Space direction="vertical" className="w-full shadow-custom gap-2 mt-5">
        <Row className="p-3" justify="end">
          <Select
            showSearch
            className="w-[30%]"
            placeholder="Select a permission scheme name"
            optionFilterProp="children"
            onChange={onChange}
            defaultValue={searchParams.get("search")}
            allowClear
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={schemas?.map((record) => ({
              label: record.schemaName,
              value: record.schemaName,
            }))}
          />
        </Row>
        <Table
          rowKey="schemaId"
          columns={columns}
          loading={isLoading}
          dataSource={schemas}
          pagination={false}
        />
      </Space>
      <CreatePermissionScheme
        isOpen={isOpenCreatePermSchemeModal}
        permissionScheme={permissionSchemeSelected}
        handleClose={handleClose}
      />
    </Space>
  );
};

export default PermissionSchemes;
