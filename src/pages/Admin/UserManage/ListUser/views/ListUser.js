import React, { useEffect, useState } from "react";
import "./ListUser.css";
import { EyeOutlined, FilterOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { getUserList } from "../domains/ListUserDomain";
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
    dataIndex: "name",
    key: "name",
    // sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
    render: (status) => (
      <span>
        {status === 1 ? (
          <Tag color="green">Active</Tag>
        ) : status === 2 ? (
          <Tag color="red">Deactive</Tag>
        ) : null}
      </span>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 100,
    align: "center",
    render: (text, record) => (
      <Space size="middle">
        <Link to={`/admin/user/view/${record.id}`}>
          <EyeOutlined />
        </Link>
      </Space>
    ),
  },
];

const ListUser = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filterModalVisible, setFilterVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState("");

  const closeHandleVisible = () => {
    setFilterVisible(false);
  };
  const openHandleVisible = () => {
    setFilterVisible(true);
  };

  const fetchData = async () => {
    try {
      const data = await getUserList();
      console.log(data);
      setDataSource(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const optionStatus = [
    { label: "Active", value: 1 },
    { label: "Deactive", value: 2 },
  ];

  const filterData = (search) => {
    const filteredData = dataSource.filter(
      (entry) =>
        (entry.name && entry.name.includes(search)) ||
        (entry.email && entry.email.includes(search))
    );
    setDataSource(filteredData);
  };

  const handleSearch = (e) => {
    const currValue = e.target.value;
    setSearchValue(currValue);
    if (currValue) {
      filterData(currValue);
    } else {
      // Khôi phục danh sách ban đầu nếu ô input rỗng
      fetchData();
    }
  };

  return (
    <div className="ListUser">
      <div className="FormListUser">
        <Drawer
          title={<Typography>Filter</Typography>}
          placement="right"
          size="default"
          width={450}
          visible={filterModalVisible}
          onClose={closeHandleVisible}
          footer={
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <Button>Reset</Button>
              <Button type="primary">Search</Button>
            </Space>
          }
        >
          <Form layout="vertical" form={form}>
            <Form.Item label={<b>Username</b>}>
              <Input placeholder="Enter username" />
            </Form.Item>

            <Form.Item label={<b>Email</b>}>
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item label={<b>Status</b>}>
              <Select placeholder="Select status" options={optionStatus} />
            </Form.Item>
          </Form>
        </Drawer>

        <div className="listHeader">
          <Typography className="titleList">User Manager</Typography>
          <div>
            <Input
              style={{ width: "300px", marginRight: "10px" }}
              placeholder="Email or Username"
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={handleSearch}
            />
            <Button onClick={() => openHandleVisible()}>
              Filter {<FilterOutlined />}
            </Button>
          </div>
        </div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default ListUser;
