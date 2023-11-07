import {
  Col,
  Divider,
  Modal,
  Row,
  Select,
  SelectProps,
  Space,
  Typography,
} from "antd";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const GrantPermission = ({ isOpen, handleClose }: Props) => {
  const handleSubmit = () => {
    console.log("granted");
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Modal
      title="Grant permission"
      open={isOpen}
      onCancel={handleClose}
      onOk={handleSubmit}
      okText="Grant"
    >
      <Divider className="!m-0" />
      <Space direction="vertical" className="w-full my-5">
        <Row gutter={8}>
          <Col span={6} className="flex items-end justify-end">
            <Typography.Title level={5} className="!m-0 !text-[#5f5f5f]">
              Permission
            </Typography.Title>
          </Col>
          <Col span={18}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select permission"
              defaultValue={["a10", "c12"]}
              onChange={handleChange}
              options={options}
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={6} className="flex justify-end items-center">
            <Typography.Title level={5} className="!m-0 !text-[#5f5f5f]">
              Granted to
            </Typography.Title>
          </Col>
          <Col span={18}>
            <Select
              showSearch
              className="w-full"
              placeholder="Select a grant"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
          </Col>
        </Row>
      </Space>
      <Divider className="!m-0" />
    </Modal>
  );
};

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

export default GrantPermission;
