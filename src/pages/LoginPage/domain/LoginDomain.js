// LoginDomain.js
import { message, notification } from "antd";
import axios from "axios";

const loginHandler = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/authentication/token`,
      {
        email,
        password,
      }
    );
    console.log("abc" + response);
    if (response.status === 200) {
      const userData = response.data;
      const userId = response.data.userId;
      const isAdmin = response.data.isAdmin;
      const email = response.data.email;
      const token = response.data.token;

      localStorage.setItem("userData", JSON.stringify(userData));

      sessionStorage.setItem("userData", JSON.stringify(userData));
      sessionStorage.setItem("userId", JSON.stringify(userId));
      sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
      sessionStorage.setItem("email", JSON.stringify(email));
      sessionStorage.setItem("token", JSON.stringify(token));

      getUserLogin();
      console.log("Đăng nhập thành công");
      message.success("Đăng nhập thành công");
      return userData;
    } else {
      console.error("Đăng nhập thất bại");
      // Hiển thị thông báo lỗi cụ thể từ API response
      notification.error({
        message: "Lỗi đăng nhập",
        description: { response },
      });

      return response;
    }
  } catch (error) {
    // Xử lý lỗi nếu có lỗi trong quá trình gọi API
    console.error("Lỗi trong quá trình đăng nhập:", error);

    // Hiển thị thông báo lỗi chung
    notification.error({
      message: "Login Fail!",
      description: "Email or Password wrong !",
    });

    return null;
  }
};

const getUserLogin = async () => {
  const userId = JSON.parse(decodeURIComponent(sessionStorage.userId));
  console.log(userId);

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/profile/${userId}`
    );
    console.log(response);
  } catch (error) {}
};

const loginGoogle = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/authentication/external-login`
    );

    if (response.status === 200) {
      const userData = response.data;

      // Lưu thông tin người dùng vào localStorage (lưu lâu dài)
      localStorage.setItem("userData", JSON.stringify(userData));

      // Lưu thông tin người dùng vào sessionStorage (lưu trong phiên làm việc)
      sessionStorage.setItem("userData", JSON.stringify(userData));

      // Đăng nhập thành công, bạn có thể chuyển người dùng đến trang chính hoặc thực hiện các tác vụ khác
      console.log("Đăng nhập thành công");
      // Trả về thông tin người dùng nếu cần
      message.success("Đăng nhập thành công");
      return userData;
    } else {
      // Đăng nhập không thành công, xử lý lỗi ở đây
      console.error("Đăng nhập thất bại");
      message.error(
        "Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản và mật khẩu"
      );
      return null;
    }
  } catch (error) {
    // Xử lý lỗi nếu có lỗi trong quá trình gọi API
    console.error("Lỗi trong quá trình đăng nhập:", error);
    message.error("Đã xảy ra lỗi trong quá trình đăng nhập");
    return null;
  }
};

export { loginHandler, loginGoogle, getUserLogin };
