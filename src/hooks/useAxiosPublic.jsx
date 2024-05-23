import axios from "axios";

const axiosPublic = axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:5000'
=======
  baseURL: "http://localhost:5000",
>>>>>>> origin/main
  // baseURL: "https://super-shop-server-3.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
