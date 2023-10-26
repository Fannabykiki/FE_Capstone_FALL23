import axios from "axios";

const getUserInfo = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/profile/${id}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch user data");
    }
  } catch (error) {
    throw error;
  }
};

export { getUserInfo };
