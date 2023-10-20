import { message } from "antd";
import axios from "axios";

const forgotpasswordHandler = async (email) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/authentication/forgot-password?email=${email}`
    );

    if (response.status === 200) {
      console.log("Đã gửi mã xác nhận");
      message.success("Đã gửi mã xác nhận tới email");
    } else {
      console.error("Gửi mã xác nhận thất bại");
      message.error("Gửi mã xác nhận thất bại, vui lòng kiểm tra lại email");
      return null;
    }
  } catch (error) {
    console.error("Lỗi trong quá trình gửi email:", error);
    message.error(error.response.data);
    return null;
  }
};

export { forgotpasswordHandler };
