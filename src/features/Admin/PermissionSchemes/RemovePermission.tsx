import { Checkbox, Col, Divider, Modal, Row, Space, Typography } from "antd";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const RemovePermission = ({ isOpen, handleClose }: Props) => {
  const handleSubmit = () => {
    console.log("removed");
  };

  return (
    <Modal
      title="Remove permission"
      open={isOpen}
      onCancel={handleClose}
      onOk={handleSubmit}
      okText="Remove"
    >
      <Divider className="!m-0" />
      <Space direction="vertical" className="w-full my-5">
        <Row gutter={8}>
          <Col span={8} className="flex items-end justify-end">
            <Typography.Title level={5} className="!m-0 !text-[#5f5f5f]">
              Permission
            </Typography.Title>
          </Col>
          <Col span={16}>
            <Typography.Title level={5} className="!m-0">
              Administer Projects
            </Typography.Title>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8} className="flex justify-end">
            <Typography.Title level={5} className="!m-0 !text-[#5f5f5f]">
              Removed from
            </Typography.Title>
          </Col>
          <Col span={16}>
            <Space direction="vertical" className="w-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <Checkbox key={index}>{index}</Checkbox>
              ))}
            </Space>
          </Col>
        </Row>
      </Space>
      <Divider className="!m-0" />
    </Modal>
  );
};

export default RemovePermission;
