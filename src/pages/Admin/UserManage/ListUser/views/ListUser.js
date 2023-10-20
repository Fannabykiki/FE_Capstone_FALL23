import {
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Table, Typography } from "antd";
import React from "react";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
const ListUser = () => {
  return (
    <div>
      <h1>User Manage</h1>
      <Input placeholder="Email or Username" prefix={<SearchOutlined />} />
      <Button type="primary">Invite {<PlusOutlined />}</Button>
      <Button type="ghost">Filter {<FilterOutlined />}</Button>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ListUser;
