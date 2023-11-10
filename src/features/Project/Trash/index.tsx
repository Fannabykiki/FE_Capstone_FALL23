import { useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import {
  Dropdown,
  MenuProps,
  Modal,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import {
  BugFilled,
  CheckSquareOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import { pagination } from "@/utils/pagination";

const TrashBin = () => {
  const [modal, contextHolder] = Modal.useModal();

  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "10",
  });

  const onChangePage = (page: number, pageSize: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      prev.set("limit", pageSize.toString());
      return prev;
    });
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    modal.confirm({
      title: "Warning",
      content: "Are you sure to restore this record?",
      onOk: () => {
        console.log("ok");
      },
    });
  };

  const columns: ColumnsType<any> = [
    {
      dataIndex: "index",
      width: "5%",
      render: (_row, _record, index) => index + 1,
    },
    {
      title: "Work Item Type",
      dataIndex: "itemType",
      width: "15%",
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "40%",
      render: (title, record) => {
        let Component = null;

        switch (record.itemType) {
          case "Bug":
            Component = <BugFilled className="text-red-500" />;
            break;
          case "Task":
            Component = <CheckSquareOutlined className="text-red-500" />;
            break;

          default:
            break;
        }

        return (
          <Row align="middle">
            {Component}
            <Typography.Text className="ml-2 font-medium text-[#3394D6]">
              {title}
            </Typography.Text>
          </Row>
        );
      },
    },
    {
      title: "Area Path",
      dataIndex: "areaPath",
      width: "20%",
    },
    {
      title: "Deleted At",
      dataIndex: "deletedAt",
      width: "15%",
      render: (deletedAt) =>
        deletedAt ? dayjs(deletedAt).format("DD/MM/YYYY HH:mm") : deletedAt,
    },
    {
      dataIndex: "action",
      width: "5%",
      render: () => (
        <Dropdown
          menu={{
            items: [
              {
                key: 1,
                label: "Restore",
              },
            ],
            onClick,
          }}
          placement="bottom"
          arrow
        >
          <MoreOutlined className="cursor-pointer" />
        </Dropdown>
      ),
    },
  ];

  return (
    <Space direction="vertical" className="w-full shadow-custom pb-5">
      <Table
        rowKey="projectId"
        columns={columns}
        dataSource={pagination(
          data,
          parseInt(searchParams.get("page") || "1"),
          parseInt(searchParams.get("limit") || "10")
        )}
        pagination={{
          showSizeChanger: true,
          current: parseInt(searchParams.get("page") || "1"),
          pageSize: parseInt(searchParams.get("limit") || "10"),
          pageSizeOptions: [10, 20, 50, 100],
          total: 1,
          onChange: onChangePage,
          className: "px-5 !mb-0",
        }}
      />
      {contextHolder}
    </Space>
  );
};

const data = [
  {
    itemType: "Bug",
    title: "Bug",
    areaPath: "MyMemo",
    deletedAt: new Date(),
  },
];

export default TrashBin;
