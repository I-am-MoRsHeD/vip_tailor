import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import OrderedProductDetails from "../../../components/OrderedProductDetails/OrderedProductDetails";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const OrderedList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("pending");
  const [axiosSecure] = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const handleStatus = (set) => {
    setStatus(set);
    console.log(set);
  };

  const [productLength, setProductLength] = useState(0);
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(productLength / itemsPerPage);
  const { user } = useAuth();
  const email = user?.email;
  // console.log(currentPage, totalPages, productLength);

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
    queryKey: ["orderBySearch", email, role, searchValue, itemsPerPage, currentPage, status],
    cacheTime: 0,
    staleTime: 60000,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/orderProduct/1/search?email=${email}&searchValue=${searchValue}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&status=${status}`
      );
      return res.data;
    },
  });

  // console.log(orderBySearch);
  useEffect(() => {
    if (orderBySearch && orderBySearch.totalCount) {
      setProductLength(orderBySearch.totalCount);
      refetch();
    } else {
      setProductLength(0);
      refetch();
    }
  }, [orderBySearch]);

  useEffect(() => {
    refetch();
  }, [orderBySearch, currentPage, searchValue, status]);

  // console.log(orderBySearch);

  return (
    <div className="overflow-scroll 2xl:h-[80vh] lg:h-[84.5vh] mx-3 lg:mx-0">
      {/* tabs */}
      <div className="lg:ml-3 xl:ml-9 h-full">
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
          <div className="bg-white lg:py-5 py-2 rounded-md">
            {/* search bar */}
            <div className="form-control lg:w-1/2 w-[95%] mx-auto lg:mb-5 mb-2">
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="Search by Product Code"
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
                    refetch={refetch}
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
                    refetch={refetch}
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
