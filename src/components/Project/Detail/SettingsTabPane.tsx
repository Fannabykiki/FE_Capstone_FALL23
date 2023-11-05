import { EProjectPrivacyStatusLabel } from "@/interfaces/project";
import { projectApi } from "@/utils/api/project";
import { useMutation } from "@tanstack/react-query";
import { Switch } from "antd";
import { toast } from "react-toastify";

export default function SettingsTabPane() {
  const { mutate: updatePrivacy, isLoading: isUpdatingPrivacy } = useMutation({
    mutationFn: projectApi.updatePrivacy,
    mutationKey: [projectApi.updatePrivacyKey],
    onSuccess: (_, variables) => {
      const newStatusText = variables.privacyStatus
        ? EProjectPrivacyStatusLabel.Public
        : EProjectPrivacyStatusLabel.Private;
      toast.success(
        `Privacy status of this project has been changed to ${newStatusText}`
      );
    },
    onError: (error) => {
      console.error(error);
      toast.error("Update privacy status failed! Please try again later");
    },
  });

  const onChangePrivacy = (checked: boolean) => {
    updatePrivacy({ id: "mock", privacyStatus: checked });
  };
  return (
    <>
      <div>
        <label>Privacy status: </label>
        <Switch
          checkedChildren={EProjectPrivacyStatusLabel.Public}
          unCheckedChildren={EProjectPrivacyStatusLabel.Private}
          loading={isUpdatingPrivacy}
          onChange={onChangePrivacy}
        />
      </div>
    </>
  );
}
