import axios from "axios";

const axiosPublic = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:5000",
  // baseURL: "https://super-shop-server-3.vercel.app",
=======
  // baseURL: 'https://super-shop-server-3.vercel.app'
  baseURL: "https://super-shop-server-3.vercel.app",
>>>>>>> 56f16f85d1ae1e7625b62aef9ac618c4c3336385
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
