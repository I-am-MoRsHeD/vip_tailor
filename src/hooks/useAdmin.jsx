import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const { user, setLoading, loading } = useAuth();
  const axios = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`/user/admin/${user?.email}`);
      const resData = res?.data?.isAdmin;
      setLoading();
      return resData;
    },
  });
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
