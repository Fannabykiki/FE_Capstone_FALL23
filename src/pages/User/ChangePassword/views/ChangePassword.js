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
        <Form.Item
          name="oldpass"
          label={<b>Old Password</b>}
          rules={[
            {
              required: true,
              message: "Old password is required",
            },
          ]}
        >
          <Input.Password
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="newpass"
          label={<b>New Password</b>}
          rules={[
            {
              required: true,
              message: "New password is required",
            },
            {
              validator: (rule, value) => {
                if (!value) {
                  return Promise.resolve(); // Không kiểm tra nếu trường rỗng
                }
                if (value === currentPassword) {
                  return Promise.reject(
                    "New password must be different from the old password"
                  );
                }
                if (value.length < 6) {
                  return Promise.reject(
                    "Password must be at least 6 characters"
                  );
                }
                if (!/[A-Z]/.test(value)) {
                  return Promise.reject(
                    "Password must contain at least one uppercase letter"
                  );
                }
                if (!/[a-z]/.test(value)) {
                  return Promise.reject(
                    "Password must contain at least one lowercase letter"
                  );
                }
                if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) {
                  return Promise.reject(
                    "Password must contain at least one special character"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password onChange={(e) => setNewPassword(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="confirmpass"
          label={<b>Confirm New Password</b>}
          rules={[
            {
              required: true,
              message: "Confirm new password is required",
            },
            {
              validator: (rule, value) => {
                if (value === newPassword) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Confim new password do not match");
                }
              },
            },
          ]}
        >
          <Input.Password
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
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
