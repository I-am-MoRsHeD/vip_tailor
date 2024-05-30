import axios from "axios";
import { signOut } from "firebase/auth";
const instance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://super-shop-server-3.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        await signOut(auth);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosSecure;
