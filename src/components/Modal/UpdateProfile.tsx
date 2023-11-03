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

export default function UpdateProfile({ onCancel = () => {} }: Props) {
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
        title="Update User Profile"
        cancelButtonProps={{
          className: classNames(userInfo?.isFirstTime ? "hidden" : undefined),
          onClick: onCancel,
        }}
        closeIcon={false}
        onOk={onSubmit}
        okButtonProps={{
          loading: isLoading,
        }}
        okText="Update"
      >
        {userInfo?.isFirstTime && (
          <Typography.Paragraph>
            This is your first time login, you have to update your profile to
            continue using our application
          </Typography.Paragraph>
        )}
        <Form
          className="w-full"
          layout="vertical"
          form={form}
          initialValues={initialValues}
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Full name"
            name="fullname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group>
              <Radio value={Gender.Male}>Male</Radio>
              <Radio value={Gender.Female}>Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Date of birth"
            name="doB"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker format={DATE_FORMAT} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
