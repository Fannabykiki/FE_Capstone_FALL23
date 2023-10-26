import React, { useEffect, useState } from "react";
import "./ListPermission.css";
import { Button, Input, Modal, Space, Table, Typography } from "antd";
import {
  EyeOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getPermissionList } from "../domains/ListPermissionDomain";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "No.",
    dataIndex: "no.",
    key: "no.",
    width: 75,
    align: "center",
    render: (text, record, index) => <span>{index + 1}</span>,
  },
  {
    title: "Name",
    dataIndex: "schemaName",
    key: "schemaName",
    // sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 100,
    align: "center",
    render: (text, record) => (
      <Space size="middle">
        <Link to={`/admin/permission/view/${record.schemaId}`}>
          <EyeOutlined />
        </Link>
      </Space>
    ),
  },
];

const ListPermission = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getPermissionList();
      console.log(data);
      setDataSource(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(dataSource);
  }, []);

  const showAddPermissionModal = () => {
    setIsProfileModalVisible(true);
  };

  return (
    <div className="list-permission">
      <div className="form-list-permission">
        <div className="header-list">
          <Typography className="titleList">Permission Manager</Typography>
          <div>
            <Input
              style={{ width: "300px", marginRight: "10px" }}
              placeholder="Email or Username"
              prefix={<SearchOutlined />}
              // value={searchValue}
              // onChange={handleSearch}
            />
            <Button
              onClick={showAddPermissionModal}
              type="primary"
              style={{ marginRight: "10px" }}
            >
              Add {<PlusOutlined />}
            </Button>
            <Button>Filter {<FilterOutlined />}</Button>
          </div>
        </div>
        <Table dataSource={dataSource} columns={columns} />
      </div>

      {/* Modal Add Permission */}
      <Modal
        width={700}
        title="Add Permission"
        open={isProfileModalVisible}
        onCancel={() => setIsProfileModalVisible(false)}
        footer={null}
      >
        <br />
      </Modal>
    </div>
  );
};

export default ListPermission;
