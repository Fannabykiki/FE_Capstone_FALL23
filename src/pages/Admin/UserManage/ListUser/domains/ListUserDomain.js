import axios from "axios";

const getUserList = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user-management/users`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    return [];
  }
};


export { getUserList };
