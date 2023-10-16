import axios from "axios";

// Hàm xử lý đăng ký
const registerHandler = async (email, password, confirmPassword) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user-management/users`,
      { email, password, confirmPassword }
    );

    if (response.status === 200) {
      // Đăng ký thành công, lấy giá trị verify token từ phản hồi
      const verifyToken = response.data.verifyToken;

      // Gửi email xác nhận đăng ký bằng verify token và email
      const sendMailResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/authentication/send-email`,
        { to: email, verifyToken: verifyToken }
      );

      if (sendMailResponse.status === 200) {
        // Gửi email thành công
        localStorage.setItem("verifyToken", JSON.stringify(verifyToken));
        return true;
      } else {
        // Gửi email thất bại
        return false;
      }
    } else {
      // Đăng ký thất bại
      return false;
    }
  } catch (error) {
    // Xử lý lỗi
    console.error("Lỗi trong quá trình đăng ký:", error);
    throw error;
  }
};

export { registerHandler };
