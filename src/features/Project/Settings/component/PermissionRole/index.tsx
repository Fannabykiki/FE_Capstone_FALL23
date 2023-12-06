import { useState } from "react";
import { Button, Card, Row, Space, Table, Typography } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";

import PermissionDetailModal from "./PermissionDetailModal";
import { IPermissionSchemes } from "@/interfaces/schema";
import { projectApi } from "@/utils/api/project";
import { schemaApi } from "@/utils/api/schema";

interface IProp {
  isAdminOrPO: boolean;
}

const PermissionRole = ({ isAdminOrPO }: IProp) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isPermissionId, setPermissionId] = useState<string>();

  const { projectId } = useParams();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const {
    data: schemas,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [schemaApi.getProjectSchemaByProjectIdKey],
    queryFn: ({ signal }) =>
      schemaApi.getProjectSchemaByProjectId(signal, projectId!),
    enabled: Boolean(projectId),
  });

  const { mutate: changeProjectSchema, isLoading: isChangingProjectSchema } =
    useMutation({
      mutationKey: [projectApi.changeProjectSchemaKey],
      mutationFn: projectApi.changeProjectSchema,
      onSuccess: async () => {
        await refetch();
        toast.success("Change schema successfully");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data || "Change schema failed!");
      },
    });

  const onSubmit = () => {
    if (!projectId) return;
    changeProjectSchema({
      projectId,
      data: { schemaId: selectedRowKeys[0] as string },
    });
  };

  const columns: ColumnsType<IPermissionSchemes> = [
    {
      title: "Name",
      dataIndex: "schemaName",
      className: "align-top",
      render: (schemaName, record) => (
        <Space direction="vertical" className="gap-y-0">
          <Button
            type="link"
            className="font-medium text-xl p-0 min-h-[28px]"
            onClick={() => setPermissionId(record.schemaId)}
          >
            {schemaName}
          </Button>
          <Typography.Text>{record.description}</Typography.Text>
        </Space>
      ),
    },
    isAdminOrPO ? Table.SELECTION_COLUMN : {},
  ];

  return (
    <Card>
      <Typography className="text-3xl font-bold">Permission & Role</Typography>
      <Typography className="text-md font-bold mt-5">
        Permission Schema for Project
      </Typography>
      <Table
        rowKey="schemaId"
        columns={columns}
        loading={isLoading}
        dataSource={schemas?.filter((schema) => schema.isCurrentProjectSchema)}
        pagination={false}
      />
      <Typography className="text-md font-bold mt-5">
        Other Permission role
      </Typography>
      <Table
        rowKey="schemaId"
        columns={columns}
        loading={isLoading}
        dataSource={schemas?.filter((schema) => !schema.isCurrentProjectSchema)}
        pagination={false}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
          type: "radio",
        }}
      />
      <Row className="mt-5" justify="end">
        <Button
          disabled={!selectedRowKeys[0] || !isAdminOrPO}
          loading={isChangingProjectSchema}
          onClick={onSubmit}
          type="primary"
        >
          Clone
        </Button>
      </Row>
      <PermissionDetailModal
        isPermissionId={isPermissionId}
        isAdminOrPO={isAdminOrPO}
        handleClose={() => setPermissionId(undefined)}
      />
    </Card>
  );
};

export default PermissionRole;
