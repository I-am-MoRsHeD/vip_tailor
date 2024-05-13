import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const { user, setLoading, loading } = useAuth();
  const axios = useAxiosSecure();
  // const axios = useAxiosPublic();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`/user/admin/${user?.email}`);
      return res?.data?.isAdmin;
    },
  });
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
