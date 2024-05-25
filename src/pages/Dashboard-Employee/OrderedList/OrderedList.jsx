import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import OrderedProductDetails from "../../../components/OrderedProductDetails/OrderedProductDetails";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { MdLocalMall } from "react-icons/md";
import useOrderedProduct from "../../../hooks/useOrderedProduct";

const OrderedList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("pending");
  const [allData, setAllData] = useState();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [orderProducts, dataFetch = refetch] = useOrderedProduct();
  const handleStatus = (set) => {
    setStatus(set);
  };

  const [productLength, setProductLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
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

  const { data: orderBySearch = [], refetch, isLoading, } = useQuery({
    queryKey: [
      "orderBySearch",
      email,
      role,
      searchValue,
      itemsPerPage,
      currentPage,
      status,
    ],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/orderProduct/1/search?email=${email}&searchValue=${searchValue}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&status=${status}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (orderBySearch && orderBySearch?.totalCount) {
      setProductLength(orderBySearch?.totalCount);
      refetch();
      dataFetch();
    } else {
      setProductLength(0);
      refetch();
      dataFetch();
    }
  }, [orderBySearch]);

  useEffect(() => {
    dataFetch();
    refetch();
  }, [orderBySearch, currentPage, searchValue, status]);

  useEffect(() => {
    if (orderProducts && status) {
      const filteredData = orderProducts?.items?.filter(
        (item) => item?.status === status
      );
      setAllData(filteredData);
    }
  }, [orderProducts, status]);

  let totalQuantity = 0;
  let totalAmount = 0;
  let totalDue = 0;
  let totalAdvanced = 0;

  if (allData && Array.isArray(allData)) {
    totalQuantity = allData?.reduce((total, item) => {
      return (
        total +
        item?.products.reduce((acc, product) => acc + product?.quantity, 0)
      );
    }, 0);

    totalAmount = allData?.reduce((total, item) => {
      return total + item?.totalAmount
    }, 0);

    totalDue = allData?.reduce((total, item) => {
      return total + item?.dueAmount
    }, 0);

    totalAdvanced = allData?.reduce((total, item) => {
      return total + item?.advancedAmount
    }, 0);
  }

  // if (allData && Array.isArray(allData)) {
  //   totalQuantity = allData?.reduce((total, item) => {
  //     if (item?.products && Array.isArray(item?.products)) {
  //       return (
  //         total +
  //         item?.products.reduce((acc, product) => acc + product?.quantity, 0)
  //       );
  //     } else {
  //       return total;
  //     }
  //   }, 0);

  //   totalAmount = allData?.reduce((total, item) => {
  //     if (item?.products && Array.isArray(item.products)) {
  //       return (
  //         total +
  //         item?.products.reduce((acc, product) => acc + product?.price, 0)
  //       );
  //     } else {
  //       return total;
  //     }
  //   }, 0);
  // }

  return (
    <div className="overflow-scroll 2xl:h-[80vh] xl:h-[82.6vh] lg:h-[84.5vh] mx-3 lg:mx-0">
      {/* tabs */}
      <div className="lg:ml-3 xl:ml-9 h-full">
        <div className="grid lg:grid-cols-4 grid-cols-1 justify-between items-center mb-2 rounded-md gap-2">
          <div className="bg-white p-2 md:p-5 rounded-md flex flex-col lg:justify-start lg:items-start  items-center justify-center gap-2">
            <h1 className="text-xs md:text-sm font-semibold flex items-center justify-start gap-1">
              <span>{/* <FaSortAmountUpAlt /> */}</span>
              Total Amount (BDT)
            </h1>
            <h1 className="font-semibold text-xl md:text-2xl">{totalAmount}</h1>
          </div>
          <div className="bg-white p-2 md:p-5 rounded-md flex flex-col lg:justify-start lg:items-start  items-center justify-center gap-2 ">
            <h1 className="text-xs md:text-sm font-semibold flex items-center justify-start">
              <span>{/* <MdLocalMall /> */}</span>
              Total Quantity
            </h1>
            <h1 className="font-semibold text-xl md:text-2xl">
              {totalQuantity}
            </h1>
          </div>
          <div className="bg-white p-2 md:p-5 rounded-md flex flex-col lg:justify-start lg:items-start  items-center justify-center gap-2 ">
            <h1 className="text-xs md:text-sm font-semibold flex items-center justify-start">
              <span>{/* <MdLocalMall /> */}</span>
              Total Due
            </h1>
            <h1 className="font-semibold text-xl md:text-2xl">
              {totalDue}
            </h1>
          </div>
          <div className="bg-white p-2 md:p-5 rounded-md flex flex-col lg:justify-start lg:items-start  items-center justify-center gap-2 ">
            <h1 className="text-xs md:text-sm font-semibold flex items-center justify-start">
              <span>{/* <MdLocalMall /> */}</span>
              Total Advanced
            </h1>
            <h1 className="font-semibold text-xl md:text-2xl">
              {totalAdvanced}
            </h1>
          </div>
        </div>
        <Tabs>
          {/* tab lists */}
          <TabList className="font-bold flex justify-center lg:gap-3 gap-2 mt-2 mb-4">
            <Tab
              className="border-none bg-white lg:py-5 lg:px-14 py-3 px-10 rounded-md cursor-pointer"
              selectedClassName="selected-tab bg-yellow-950 text-white lg:py-5 lg:px-14 py-3 px-10"
              onClick={() => handleStatus("pending")}
            >
              Pending
            </Tab>

            <Tab
              className="border-none bg-white lg:py-5 lg:px-14 py-3 px-10 rounded-md cursor-pointer"
              selectedClassName="selected-tab bg-yellow-950 text-white lg:py-5 lg:px-14 py-3 px-10"
              onClick={() => handleStatus("completed")}
            >
              Completed
            </Tab>
          </TabList>
          <div className="bg-white lg:py-5 py-2 rounded-md h-[100vh]">
            {/* search bar */}
            <div className="form-control lg:w-1/2 w-[95%] mx-auto lg:mb-5 mb-2">
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="Search by Invoice No"
                className="input bg-gray-100 focus:outline-none"
              />
            </div>
            {/* tab panel */}
            <div className="my-5 rounded-lg">
              <TabPanel>
                <div className="flex flex-col px-5 gap-4">
                  <OrderedProductDetails
                    products={orderBySearch}
                    filteredUser={userInfo}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    refetchByPending={refetch}
                    dataFetch={dataFetch}
                  />
                </div>
              </TabPanel>

              <TabPanel>
                <div className="flex flex-col px-5 gap-4">
                  <OrderedProductDetails
                    products={orderBySearch}
                    filteredUser={userInfo}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    refetchByComplete={refetch}
                    dataFetch={dataFetch}
                  />
                </div>
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default OrderedList;
