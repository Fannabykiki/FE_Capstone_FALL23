import React from "react";
import { Button, Form, Input, Typography } from "antd";

import { changePassword } from "../domains/ChangePasswordDomain";
import { ChangePasswordStyled, FormStyled } from "./styles";

const ChangePassword = () => {
  const [form] = Form.useForm();

  const handleChangePassword = async (values) => {
    try {
      const result = await changePassword(
        values.currentPassword,
        values.newPassword,
        values.confirmPassword
      );
      // Xử lý kết quả thành công ở đây, có thể hiển thị thông báo thành công
      console.log("Mật khẩu đã được thay đổi thành công!", result);
    } catch (error) {
      // Xử lý lỗi ở đây, có thể hiển thị thông báo lỗi
      console.error("Lỗi khi thay đổi mật khẩu: ", error.message);
    }
  };

  return (
    <ChangePasswordStyled>
      <Typography.Title level={2}>Change your password</Typography.Title>
      <Typography style={{ margin: "20px 0" }}>
        A strong password helps prevent unauthorized access to your email
        account.
      </Typography>
      <FormStyled form={form} onFinish={handleChangePassword} layout="vertical">
        <Form.Item
          name="currentPassword"
          label="Current password"
          rules={[
            {
              required: true,
              message: "Current password is required",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
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
                if (value === form.getFieldValue("currentPassword")) {
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
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={<b>Reenter password</b>}
          rules={[
            {
              required: true,
              message: "Reenter password is required",
            },
            {
              validator: (rule, value) => {
                if (value === form.getFieldValue("newPassword")) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Confim new password do not match");
                }
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="btnModal">
          <Button htmlType="submit" type="primary" className="btn-save">
            Save
          </Button>
        </div>
      </FormStyled>
    </ChangePasswordStyled>
  );
};

export default ChangePassword;
