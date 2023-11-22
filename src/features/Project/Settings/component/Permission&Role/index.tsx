import { useState } from "react";
import { Button, Card, Row, Space, Table, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";

import PermissionDetailModal from "./PermissionDetailModal";
import { IPermissionSchemes } from "@/interfaces/schema";
import { useAuthContext } from "@/context/Auth";
import { schemaApi } from "@/utils/api/schema";

const PermissionRole = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isPermissionId, setPermissionId] = useState<string>();

  const { userInfo } = useAuthContext();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { data: schemas, isLoading } = useQuery<IPermissionSchemes[]>({
    queryKey: [schemaApi.getAdminSchemasKey, userInfo?.id],
    queryFn: ({ signal }) => schemaApi.getAdminSchemas(signal, ""),
    enabled: Boolean(userInfo),
  });

  const onSubmit = () => {
    console.log("selectedRowKeys: ", selectedRowKeys[0]);
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
    Table.SELECTION_COLUMN,
  ];

  return (
    <Card>
      <Typography className="text-3xl font-bold">Permission Role</Typography>
      <Table
        rowKey="schemaId"
        className="mt-5"
        columns={columns}
        loading={isLoading}
        dataSource={schemas}
        pagination={false}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
          type: "radio",
        }}
      />
      <Row className="mt-5" justify="end">
        <Button loading={isLoading} onClick={onSubmit} type="primary">
          Save
        </Button>
      </Row>
      <PermissionDetailModal
        isPermissionId={isPermissionId}
        handleClose={() => setPermissionId(undefined)}
      />
    </Card>
  );
};

export default PermissionRole;
