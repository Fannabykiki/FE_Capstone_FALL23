import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Row, Select, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";

import useAdminUserManagement from "@/hooks/useAdminUserManagement";
import { convertToODataParams } from "@/utils/convertToODataParams";
import { IAdminUsers } from "@/interfaces/user";
import { paths } from "@/routers/paths";

const PermissionSchemes = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { users, isLoading } = useAdminUserManagement({
    $filter: convertToODataParams(
      {},
      {
        name: searchParams.get("search"),
      }
    ),
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

  const columns: ColumnsType<IAdminUsers> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "45%",
      className: "align-top",
      render: (name, record) => (
        <Space direction="vertical" className="gap-y-0">
          <Button
            type="link"
            className="font-medium text-xl p-0 min-h-[28px]"
            onClick={() => {
              navigate(
                generatePath(paths.adminProjectPermission, {
                  projectId: "roomIdJoined",
                })
              );
            }}
          >
            {name}
          </Button>
          <Typography.Text>{name}</Typography.Text>
        </Space>
      ),
    },
    {
      title: "Projects",
      dataIndex: "isAdmin",
      width: "45%",
      render: (isAdmin) => (
        <ul>
          <li>
            <Button type="link" className="text-sm p-0">
              Project
            </Button>
          </li>
          <li>
            <Button type="link" className="text-sm p-0">
              Project
            </Button>
          </li>
          <li>
            <Button type="link" className="text-sm p-0">
              Project
            </Button>
          </li>
          <li>
            <Button type="link" className="text-sm p-0">
              Project
            </Button>
          </li>
          <li>
            <Button type="link" className="text-sm p-0">
              Project
            </Button>
          </li>
          <li>
            <Button type="link" className="text-sm p-0">
              Project
            </Button>
          </li>
          <li>
            <Button type="link" className="text-sm p-0">
              Project
            </Button>
          </li>
          <li>
            <Button type="link" className="text-sm p-0">
              Project
            </Button>
          </li>
          <li>
            <Button type="link" className="text-sm p-0">
              Project
            </Button>
          </li>
          <li>
            <Button type="link" className="text-sm p-0">
              Project
            </Button>
          </li>
          <li>
            <Button type="link" className="text-sm p-0">
              Project
            </Button>
          </li>
        </ul>
      ),
    },
    {
      width: "10%",
      className: "align-top",
      align: "center",
      render: () => (
        <Row justify="space-evenly">
          <DeleteOutlined className="text-red-500 text-xl cursor-pointer" />
          <EditOutlined className="text-xl cursor-pointer" />
        </Row>
      ),
    },
  ];

  return (
    <Space direction="vertical" className="w-full">
      <Typography.Title level={1} className="!m-0">
        Permission Schemes
      </Typography.Title>
      <Typography.Text>
        Permission Schemes allow you to create a set of permissions and apply
        this set of permissions to any project.
        <br />
        <br />
        All permissions within a scheme will apply to all projects that are
        associated with that scheme.
        <br />
        The table below shows the permission schemes currently configured for
        this server. For permissions that apply to all projects see global
        permissions.
      </Typography.Text>
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
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
        </Row>
        <Table
          rowKey="id"
          columns={columns}
          loading={isLoading}
          dataSource={users}
          pagination={false}
        />
      </Space>
    </Space>
  );
};

export default PermissionSchemes;
