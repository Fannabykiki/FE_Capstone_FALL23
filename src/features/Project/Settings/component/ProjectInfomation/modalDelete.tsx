import { useState } from "react";
import { Button, Input, Modal, Space, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import useProjectDetail from "@/hooks/useProjectDetail";
import { projectApi } from "@/utils/api/project";
import { useAuthContext } from "@/context/Auth";
import { paths } from "@/routers/paths";

interface Props {
  isOpen: boolean;
  handleClose: VoidFunction;
}

export default function DeleteProject({ isOpen, handleClose }: Props) {
  const { userInfo } = useAuthContext();

  const { projectId } = useParams();

  const { detail } = useProjectDetail(projectId);

  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();

  const { mutate: deleteProject, isLoading: isRemoving } = useMutation({
    mutationFn: projectApi.updateProject,
    mutationKey: [projectApi.updateProjectKey],
    onSuccess: async () => {
      await queryClient.refetchQueries([
        projectApi.getListByUserKey,
        userInfo?.id,
      ]);
      toast.success("Delete project successfully!");
      navigate(paths.user);
    },
    onError: () => {
      toast.error("Has an error, please try again");
    },
  });

  const onCancel = () => {
    setIsInputValid(false);
    setInputValue("");
    handleClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsInputValid(value === detail?.projectName);
  };

  const handleSubmit = () => {
    if (!projectId) return;
    deleteProject({
      id: projectId,
      data: {
        projectName: detail!.projectName,
        description: detail!.description,
        isDeleted: true,
      },
    });
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
          loading={isRemoving}
          disabled={!isInputValid}
          onClick={handleSubmit}
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
