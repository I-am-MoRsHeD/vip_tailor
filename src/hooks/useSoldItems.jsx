import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";

const useSoldItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  // Pagination
  const [productLength, setProductLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(productLength / itemsPerPage);
  const { user } = useAuth();
  const email = user?.email;

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", email],
    staleTime: Infinity,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${email}`);
      return res.data;
    },
  });
  const role = userInfo?.role;

  const { data: soldItems, refetch } = useQuery({
    queryKey: ["soldItems", email, role, itemsPerPage, currentPage],
    queryFn: async () => {
      // const res = await axiosPublic.get('/sellProduct')
      const res = await axiosPublic.get(
        `/soldItems/1/state?email=${email}&role=${role}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
      );
      return res.data;
    },
  });
  // console.log(soldItems);
  useEffect(() => {
    if (soldItems && soldItems?.totalCount) {
      setProductLength(soldItems?.totalCount);
    } else {
      setProductLength(0);
    }
  }, [soldItems]);
  console.log(soldItems?.totalCount);

  return [soldItems, refetch, currentPage, totalPages, setCurrentPage];
};

export default useSoldItems;
