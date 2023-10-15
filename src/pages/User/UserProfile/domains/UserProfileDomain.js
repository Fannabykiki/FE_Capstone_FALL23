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

export { getUser };
