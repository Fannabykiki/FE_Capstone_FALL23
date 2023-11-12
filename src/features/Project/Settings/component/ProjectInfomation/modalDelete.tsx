import useProjectDetail from "@/hooks/useProjectDetail";
import { Button, Form, Input, Modal, Space, Typography } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface Props {
  isOpen: boolean;
  handleClose: VoidFunction;
}

export default function DeleteProject({ isOpen, handleClose }: Props) {
  const { projectId } = useParams();
  const { detail, actions } = useProjectDetail(projectId);

  console.log(detail);

  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  const onCancel = () => {
    handleClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsInputValid(value === detail?.projectName);
  };

  return (
    <Modal
      title="Delete Project"
      onCancel={onCancel}
      open={isOpen}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          danger
          disabled={!isInputValid}
          onClick={() => {
            handleClose();
          }}
        >
          Delete
        </Button>,
      ]}
    >
      <Space direction="vertical">
        <Typography className="mt-3">
          Are you sure you want to delete the "{detail?.projectName}" project?
        </Typography>
        <Typography className="mt-2">
          To confirm this action, please type "{detail?.projectName}":
        </Typography>
        <Input
          className="mb-10"
          value={inputValue}
          onChange={handleInputChange}
        />
      </Space>
    </Modal>
  );
}
