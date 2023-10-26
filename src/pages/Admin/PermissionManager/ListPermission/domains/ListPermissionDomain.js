import axios from "axios";

const getPermissionList = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/schema-management/schemas`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    return [];
  }
};

export { getPermissionList };
