import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Row, Select, Space, Table, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";

import { convertToODataParams } from "@/utils/convertToODataParams";
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

  const [searchParams, setSearchParams] = useSearchParams();

  const { userInfo } = useAuthContext();

  const { data: schemas, isLoading } = useQuery<IPermissionSchemes[]>({
    queryKey: [
      schemaApi.getAdminSchemasKey,
      userInfo?.id,
      searchParams.get("search"),
    ],
    queryFn: ({ signal }) =>
      schemaApi.getAdminSchemas(signal, {
        $filter: convertToODataParams(
          {},
          {
            schemaName: searchParams.get("search"),
          }
        ),
      }),
    enabled: Boolean(userInfo),
  });

  const navigate = useNavigate();

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
            <li key={index}>
              <Button type="link" className="text-sm p-0">
                {project.projectName}
              </Button>
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
          <DeleteOutlined className="text-red-500 text-xl cursor-pointer" />
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
