import { useAuthContext } from "@/context/Auth";
import { Gender, IUpdateProfile } from "@/interfaces/user";
import { userApi } from "@/utils/api/user";
import { classNames } from "@/utils/common";
import { DATE_FORMAT } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { DatePicker, Form, Input, Modal, Radio, Typography } from "antd";
import { toast } from "react-toastify";

interface Props {
  onCancel: VoidFunction;
}

export default function ChangePassword({ onCancel = () => {} }: Props) {
  const [form] = Form.useForm<IUpdateProfile>();

  const { userInfo, refetchProfile } = useAuthContext();

  const initialValues = {
    address: "",
    doB: null,
    fullname: "",
    gender: Gender.Male,
    phoneNumber: "",
    userName: "",
  };

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: userApi.update,
    mutationKey: [userApi.updateKey],
  });

  const onSubmit = async () => {
    const formValues = await form.validateFields();
    updateProfile(
      {
        id: userInfo!.id,
        data: formValues,
      },
      {
        onSuccess: () => {
          toast.success("Update profile succeed");
          refetchProfile();
        },
      }
    );
  };
  return (
    <>
      <Modal
        open={true}
        title="Change Password"
        onCancel={onCancel}
        closeIcon={false}
        onOk={onSubmit}
        okButtonProps={{
          loading: isLoading,
        }}
        okText="Save"
      >
        <Form
          className="w-full"
          layout="vertical"
          form={form}
          initialValues={initialValues}
        >
          <Form.Item
            label="Old Password"
            name="oldpassword"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newpassword"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmnewpassword"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
