import useAxiosSecure from "../../hooks/useAxiosSecure";

const axios = useAxiosSecure();

export const clearToken = async () => {
  // console.log("attack clear Token");
  const { data } = await axios.get("/auth/logout");
  // console.log(data);
  return data;
};

// get token from the server
export const getToken = async (email) => {
  const { data } = await axios.post("/auth/jwt", { email });
  console.log(data);
  // console.log("Token recived from the server ------> ", data);
  return data;
};
