const useUserRoll = async (email) => {
  try {
    const response = await fetch(`http://localhost:5000/user/${email}`); // Adjust the endpoint according to your backend
    const data = await response.json();
    return data.role;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw new Error("Error fetching user role");
  }
};

export default useUserRoll;
