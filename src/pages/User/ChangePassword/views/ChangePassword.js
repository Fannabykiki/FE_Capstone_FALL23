import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { changePasswordHandler } from "../domains/ChangePasswordDomain";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = async () => {
    try {
      const result = await changePasswordHandler(
        currentPassword,
        newPassword,
        confirmPassword
      );
      // Xử lý kết quả thành công ở đây, có thể hiển thị thông báo thành công
      console.log("Mật khẩu đã được thay đổi thành công!", result);
    } catch (error) {
      // Xử lý lỗi ở đây, có thể hiển thị thông báo lỗi
      console.error("Lỗi khi thay đổi mật khẩu: ", error.message);
    }
  };

  return (
    <>
      <Form form={form} layout="vertical">
        <Form.Item name="oldpass" label={<b>Old Password</b>}>
          <Input onChange={(e) => setCurrentPassword(e.target.value)} />
        </Form.Item>
        <Form.Item name="newpass" label={<b>New Password</b>}>
          <Input onChange={(e) => setNewPassword(e.target.value)} />
        </Form.Item>
        <Form.Item name="confirmpass" label={<b>Confirm New Password</b>}>
          <Input onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Item>
        <div className="btnModal">
          <Button className="btn-close">Close</Button>
          <Button
            onClick={handlePasswordChange}
            type="primary"
            className="btn-save"
          >
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ChangePassword;
