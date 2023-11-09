import { Modal, Space, Table, Typography } from "antd";

import { IAdminRoles } from "@/interfaces/role";
import { ColumnsType } from "antd/es/table";

interface Props {
  isOpen: boolean;
  role: IAdminRoles | undefined;
  handleClose: () => void;
}

const RoleDetail = ({ isOpen, role, handleClose }: Props) => {
  const onCancel = () => {
    handleClose();
  };

  return (
    <Modal
      title="Role detail"
      open={isOpen}
      onCancel={onCancel}
      width="80vw"
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
    >
      <Space direction="vertical" className="w-full mt-5">
        <Space
          direction="vertical"
          className="flex justify-center w-full gap-0"
        >
          <Typography.Text>
            <b>Name:</b> {role?.role.roleName}
          </Typography.Text>
          <Typography.Text>
            <b>Description:</b> {role?.role.description}
          </Typography.Text>
        </Space>
        <Table
          rowKey="projectId"
          className="mt-5 [&_.ant-table-body]:h-[500px] [&_.ant-table-body]:!overflow-y-auto shadow-custom"
          scroll={{ y: "500px" }}
          columns={columns}
          dataSource={role?.projectsUsed}
          pagination={false}
        />
      </Space>
    </Modal>
  );
};

const columns: ColumnsType<IAdminRoles["projectsUsed"][number]> = [
  {
    dataIndex: "index",
    width: "7%",
    align: "center",
    render: (_name, _record, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "projectName",
    width: "30%",
  },
  {
    title: "Status",
    dataIndex: "projectStatus",
    width: "10%",
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "53%",
    render: (title) => title + title + title + title + title + title,
  },
];

export default RoleDetail;
