import axios from "axios";
import { signOut } from "firebase/auth";
const instance = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:5000",
  // baseURL: "https://super-shop-server-3.vercel.app",
=======
  //   baseURL: "",
  baseURL: "https://super-shop-server-3.vercel.app",
>>>>>>> 56f16f85d1ae1e7625b62aef9ac618c4c3336385
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
