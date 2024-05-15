import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: 'https://super-shop-server-3.vercel.app'
  baseURL: "https://super-shop-server-3.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
