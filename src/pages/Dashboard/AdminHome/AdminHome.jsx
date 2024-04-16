import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import AdminImg from "../../../assets/admin.png";
import useSellProduct from "../../../hooks/useSellProduct";
import useOrderedProduct from "../../../hooks/useOrderedProduct";
import { IoBagOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import AdminTabs from "../AdminTabs/AdminTabs";
import DashBoardTitle from "../../../components/dashboardTitle/DashBoardTitle";

const AdminHome = () => {
  const axiosPublic = useAxiosPublic();
  const [isLoading, setIsLoading] = useState(true);

  const { data: allSellProducts, refetch } = useQuery({
    queryKey: ["allSellProduct"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sellProduct");
      return res.data;
    },
  });
  const { data: allOrderProducts = [] } = useQuery({
    queryKey: ["allOrderProduct"],
    queryFn: async () => {
      const res = await axiosPublic.get("/orderProduct");
      setIsLoading(false);
      return res.data;
    },
  });

  const totalSells = allSellProducts?.reduce(
    (total, product) => total + parseFloat(product?.price),
    0
  );

  const completedOrders = allOrderProducts?.filter(
    (product) => product.status === "completed"
  );
  const completeOrderAmount = completedOrders?.reduce(
    (total, product) => total + parseFloat(product?.price),
    0
  );
  const totalAmount = totalSells + completeOrderAmount;

  return (
    <div className='lg:overflow-scroll 2xl:h-[80vh] xl:h-[84vh] lg:h-[84.5vh] xl:ml-9 mx-3'>
      <DashBoardTitle
        title={"Admin"}
        subTitle={"Insights, management tools and add product-all in one place"}
      />
      <div className='bg-white mt-2 p-2 md:p-6 rounded-md 4xl:h-[66vh] lg:h-[87vh] md:h-[110vh] h-auto'>
        <h1 className="text-lg md:text-2xl font-semibold mb-3 text-center md:text-start">Total Summary</h1>
        {/* category-wise tabs */}
        <div className="flex">
          <AdminTabs allOrderProducts={allOrderProducts} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
