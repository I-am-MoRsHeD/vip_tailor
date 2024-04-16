import React, { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useAllProduct = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allSellProducts = [], refetch } = useQuery({
    queryKey: ['allSellProduct'],
    queryFn: async () => {
      const res = await axiosPublic.get('/sellProduct')
      return res.data;
    }
  })

  return [allSellProducts, refetch];
};

export default useAllProduct;
