import axios from "axios";

const getPermissionInfo = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/schema-management/schemas/${id}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Couldn't get schema");
    }
  } catch (error) {
    throw error;
  }
};

export { getPermissionInfo };
