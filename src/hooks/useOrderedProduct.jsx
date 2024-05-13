import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useOrderedProduct = () => {
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

  const { data: orderProducts = [], refetch } = useQuery({
    queryKey: ["OrderProduct", email, role, itemsPerPage, currentPage],
    queryFn: async () => {
      // const res = await axiosPublic.get('/orderProduct')
      const res = await axiosPublic.get(
        `/orderProduct/state?email=${email}&role=${role}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (orderProducts && orderProducts.totalCount) {
      setProductLength(orderProducts.totalCount);
    } else {
      setProductLength(0);
    }
  }, [orderProducts]);
  console.log(orderProducts.totalCount);

  return [orderProducts, refetch, currentPage, totalPages, setCurrentPage];
};

export default useOrderedProduct;
