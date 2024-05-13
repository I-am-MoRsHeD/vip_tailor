import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";

const useSellProduct = () => {
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

  const { data: sellProducts, refetch } = useQuery({
    queryKey: ["sellProduct", email, role, itemsPerPage, currentPage],
    queryFn: async () => {
      // const res = await axiosPublic.get('/sellProduct')
      const res = await axiosPublic.get(
        `/sellProduct/state?email=${email}&role=${role}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
      );
      return res.data;
    },
  });
  useEffect(() => {
    if (sellProducts && sellProducts?.totalCount) {
      setProductLength(sellProducts?.totalCount);
    } else {
      setProductLength(0);
    }
  }, [sellProducts]);
  console.log(sellProducts?.totalCount);

  return [sellProducts, refetch, currentPage, totalPages, setCurrentPage];
};

export default useSellProduct;
