import axios from "axios";

const getUser = async () => {
  const userId = JSON.parse(decodeURIComponent(sessionStorage.userId));

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/profile/${userId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userData) => {
  const userId = JSON.parse(decodeURIComponent(sessionStorage.userId));

  // Tạo một bản sao của userData để loại bỏ trường "email"
  const updatedUserData = { ...userData };
  delete updatedUserData.email; // Loại bỏ trường "email" khỏi đối tượng
  delete updatedUserData.isAdmin;

  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/user-management/users/${userId}`,
      updatedUserData // Sử dụng updatedUserData thay vì userData
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getUser, updateUser };
