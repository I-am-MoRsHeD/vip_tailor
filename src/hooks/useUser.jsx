import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const useUser = () => {
  const axios = useAxiosPublic();
  const users = useAuth();
  const email = users?.user?.email;
  const { data: user = [], refetch } = useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      const res = await axios.get(`/user/${email}`);
      return res.data;
    },
  });
  return [user, refetch];
};

export default useUser;
