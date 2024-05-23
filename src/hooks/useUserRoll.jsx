import useAxiosSecure from "./useAxiosSecure";

const axios = useAxiosSecure();
const useUserRoll = async (email) => {
  try {
<<<<<<< HEAD
    const response = await fetch(`http://localhost:5000/user/${email}`); // Adjust the endpoint according to your backend
    const data = await response.json();
    return data.role;
=======
    const response = await axios.get(`/user/${email}`);
    if (!response.data) {
      throw new Error("Failed to fetch user role");
    }
    return response.data.role;
>>>>>>> origin/main
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw new Error("Error fetching user role");
  }
};

export default useUserRoll;
