import useAxiosSecure from "./useAxiosSecure";

const axios = useAxiosSecure();
const useUserRoll = async (email) => {
  try {
    const response = await axios.get(`/user/${email}`);
    if (!response.data) {
      throw new Error("Failed to fetch user role");
    }
    return response.data.role;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw new Error("Error fetching user role");
  }
};

export default useUserRoll;
