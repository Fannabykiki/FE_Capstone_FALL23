import axios from "axios";

const changePasswordHandler = async (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  // Lấy email và token từ sessionStorage
  const email = JSON.parse(sessionStorage.email);
  const token = JSON.parse(sessionStorage.token);

  if (!email || !token) {
    // Xử lý lỗi khi không tìm thấy email hoặc token trong sessionStorage
    throw new Error("Email và token không tồn tại trong sessionStorage");
  }

  // Tạo một đối tượng chứa dữ liệu cần gửi lên server
  const data = {
    email: email,
    token: token,
    currentPassword: currentPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };

  try {
    // Gọi API để thay đổi mật khẩu
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/authentication/change-password`,
      data
    );

    // Xử lý dữ liệu từ phản hồi (response) ở đây nếu cần thiết

    // Trả về kết quả hoặc thông báo thành công
    return response.data;
  } catch (error) {
    // Xử lý lỗi khi gọi API thất bại
    throw new Error("Lỗi khi thay đổi mật khẩu: " + error.message);
  }
};

export { changePasswordHandler };
