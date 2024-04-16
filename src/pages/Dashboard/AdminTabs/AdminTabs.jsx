import React, { useEffect, useRef, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ProductStats from "../../../components/ProductStats/ProductStats";
import {
    IoBagOutline,
    IoBarChartOutline,
    IoPrintOutline,
} from "react-icons/io5";
import { BsCart3, BsFilterLeft } from "react-icons/bs";
import { ReactToPrint } from "react-to-print";
import { FaSortAmountDown } from "react-icons/fa";
import DashBoardTitle from "../../../components/dashboardTitle/DashBoardTitle";

const AdminTabs = ({ allOrderProducts }) => {
    const axiosPublic = useAxiosPublic();
    const [selectedData, setSelectedData] = useState();
    const [defaultTab, setDefaultTab] = useState(0);
    const componentRef = useRef(null);
    const [filter, setFilter] = useState(null);
    const [orderProducts, setOrderProducts] = useState(allOrderProducts);
    const [commentRef, setCommentRef] = useState();

    const { data: categories = [] } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const res = await axiosPublic.get("/category");
            return res.data;
        },
    });

    useEffect(() => {
        if (categories.length > 0) {
            handleCategory(categories[defaultTab]?.category, defaultTab);
        }
    }, [categories]);

    const { data: soldItemsInfo = [] } = useQuery({
        queryKey: ["soldItemsInfo"],
        queryFn: async () => {
            const res = await axiosPublic.get("/soldItems");
            return res.data;
        },
    });

    const handleCategory = async (category, index) => {
        setDefaultTab(index);
        setFilter(category);
        const categoryName = category.toLowerCase();
        console.log(categoryName);

        await axiosPublic.get(`/soldItems/${categoryName}`)
            .then((res) => {
                setSelectedData(res.data);
            });
    };

    const handleFilter = async (category, filterName) => {
        const categoryName = category.toLowerCase();
        const res = await axiosPublic.get(`/soldItems/1/filter?categoryName=${categoryName}&filterName=${filterName}`)
        setSelectedData(res.data);
    }

    const handleOrderFilter = async (filterName) => {
        const res = await axiosPublic.get(`/orderProduct/1/filter?filterName=${filterName}`)
        setOrderProducts(res.data);
    }

    useEffect(() => {
        setOrderProducts(allOrderProducts);
    }, [allOrderProducts]);


    const pendingOrders = orderProducts?.filter(product => product.status === 'pending');
    const completedOrders = orderProducts?.filter(product => product.status === 'completed');
    const completeOrderAmount = completedOrders?.reduce((total, product) => total + (parseFloat(product?.price) * parseFloat(product?.quantity)), 0)

    const totalSoldItemsAmount = soldItemsInfo?.reduce((total, product) => total + parseInt(product?.price), 0)
    const totalSellsByCategory = selectedData?.reduce((total, product) => total + parseInt(product?.price), 0)
    const totalqunatity = selectedData?.reduce((total, product) => total + parseInt(product?.quantity), 0)

    const totalSells = completeOrderAmount + totalSoldItemsAmount;


    return (
        <div className='overflow-hidden w-full h-full'>
            <Tabs>
                {/* tab lists */}
                <div className='flex flex-col md:flex-row lg:flex-row w-full gap-5'>
                    <div className='w-full md:w-[40%] lg:w-1/3 bg-gray-100 h-24 flex flex-col px-16 text-center md:text-start py-4 md:px-7 md:py-4 lg:px-4 lg:py-4 space-y-3 rounded-md mx-auto md:mx-0'>
                        <h4 className="text-sm font-semibold"><IoBarChartOutline className='inline mr-1' /> Total Sales</h4>
                        <h1 className="text-xl md:text-2xl font-bold">{totalSells} BDT</h1>
                    </div>
                    {/* tab lists */}
                    <TabList className="font-bold w-full md:w-3/4 lg:w-5/6 mx-auto py-4 bg-gray-100 flex flex-row justify-center items-center gap-2 md:gap-4 lg:gap-10 rounded-md">
                        <Tab className="border-none bg-white lg:py-5 md:py-5 py-2 lg:px-14 md:px-10 px-4 rounded-md cursor-pointer" selectedClassName='selected-tab bg-yellow-950 text-white lg:py-5 md:py-5 py-2 lg:px-14 md:px-10 px-4'>Sell Product</Tab>

                        <Tab className="border-none bg-white lg:py-5 md:py-5 py-2 lg:px-14 md:px-10 px-4 rounded-md cursor-pointer" selectedClassName='selected-tab bg-yellow-950 text-white lg:py-5 md:py-5 py-2 lg:px-14 md:px-10 px-4'>Order Product</Tab>
                    </TabList>
                </div>
                {/* tab panel */}
                <div className='mt-2 bg-gray-100 rounded-lg 2xl:h-[44vh] xl:h-[55vh] lg:h-96 md:h-[70vh]'>
                    {/* sell product */}
                    <TabPanel>
                        <div className='flex flex-col p-1 md:p-3 gap-4'>
                            <div className="h-full">
                                {/* tab lists */}
                                <div className="font-bold pb-3 flex flex-row  justify-between items-center">
                                    <div>
                                        <select className='bg-white px-4 py-2 rounded-md' onChange={(e) => handleCategory(e.target.value)} value={filter}>
                                            {categories?.map((category, index) => (
                                                <option value={category?.category} key={category._id}>
                                                    {category?.category}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className='flex flex-row items-center'>
                                        <div className="dropdown dropdown-hover mr-5">
                                            <div tabIndex={0} role="button" className=" m-1">
                                                <FaSortAmountDown className='text-2xl' />
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28">
                                                <li>
                                                    <button onClick={() => handleFilter(filter, 'all')} className="">All</button>
                                                </li>
                                                <li>
                                                    <button onClick={() => handleFilter(filter, 'daily')} className="">Today</button>
                                                </li>
                                                <li>
                                                    <button onClick={() => handleFilter(filter, 'weekly')} className="">Weekly</button>
                                                </li>
                                                <li>
                                                    <button onClick={() => handleFilter(filter, 'monthly')} className="">Monthly</button>
                                                </li>
                                                <li>
                                                    <button onClick={() => handleFilter(filter, 'yearly')} className="">Yearly</button>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* print */}
                                        <div className="flex justify-end mr-4">
                                            <ReactToPrint
                                                trigger={() => (
                                                    <button className="font-bold">
                                                        <IoPrintOutline className='text-2xl' />
                                                    </button>
                                                )}
                                                content={() => commentRef.current}
                                                documentTitle='Product Summary'
                                                pageStyle="print"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* sub tab panel */}
                                <div className=''>
                                    <div className='my-5 flex flex-col justify-center 4xl:h-72 3xl:h-56 xl:h-56'>
                                        {selectedData ? (
                                            <div>
                                                <ProductStats totalSells={totalSellsByCategory} totalProduct={totalqunatity} setCommentRef={setCommentRef} categories={categories} />
                                            </div>
                                        ) : <div>
                                            <ProductStats totalSells={totalSellsByCategory} totalProduct={totalqunatity} setCommentRef={setCommentRef} categories={categories} />
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    {/* order product */}
                    <TabPanel>
                        {/* Print and filter button */}
                        <div className="flex items-center justify-between md:px-5 px-2">
                            <h1 className="text-xl font-semibold">Order Product</h1>
                            <div className='flex justify-end my-5'>
                                <div className="dropdown dropdown-hover mr-2 md:mr-5">
                                    <div tabIndex={0} role="button" className="">
                                        <FaSortAmountDown className='text-2xl' />
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28 font-bold">
                                        <li>
                                            <button onClick={() => handleOrderFilter('all')} className="">All</button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleOrderFilter('daily')} className="">Today</button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleOrderFilter('weekly')} className="">Weekly</button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleOrderFilter('monthly')} className="">Monthly</button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleOrderFilter('yearly')} className="">Yearly</button>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <ReactToPrint
                                        trigger={() => (
                                            <button className="font-bold rounded">
                                                <IoPrintOutline className='text-2xl' />
                                            </button>
                                        )}
                                        content={() => componentRef.current}
                                        documentTitle='Product Summary'
                                        pageStyle="print"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* card container */}
                        <div ref={componentRef}>
                            {/* card container */}
                            <div className='flex justify-center'>
                                <div className='flex flex-col gap-5 justify-center lg:w-4/6 w-5/6 4xl:my-10 3xl:my-5 md:my-0 my-5'>
                                    {/* cards */}
                                    <div className='grid grid-cols-1 md:grid-cols-2 px-1 md:px-0 gap-2 md:gap-5 w-full'>
                                        <div className='w-full shadow-md rounded-md flex flex-col gap-2 md:px-4 md:py-5 px-4 py-5 bg-white'>
                                            <div className='rounded-lg flex items-center gap-1'>
                                                <div className='rounded-lg text-black text-base '>
                                                    <IoBagOutline className='font-semibold' />
                                                </div>
                                                <h3 className='text-base font-semibold '>Total Sales</h3>
                                            </div>
                                            <div>
                                                <h2 className='text-xl md:text-2xl font-bold '>{completeOrderAmount === 0 ? 0 : completeOrderAmount} BDT</h2>
                                            </div>
                                        </div>
                                        <div className='w-full shadow-md rounded-md flex flex-col gap-2  md:p-5 px-4 py-5 bg-white'>
                                            <div className='rounded-lg flex items-center gap-1'>
                                                <div className='rounded-lg text-black text-base '>
                                                    <BsCart3 className='font-semibold' />
                                                </div>
                                                <h3 className='text-sm md:text-base font-semibold '>Total Orders</h3>
                                            </div>
                                            <div>
                                                <h2 className='text-xl md:text-2xl font-bold '>{orderProducts?.length}</h2>
                                            </div>
                                        </div>
                                        <div className='w-full shadow-md rounded-md flex flex-col gap-2  md:p-5 px-4 py-5 bg-white'>
                                            <div className='rounded-lg flex items-center gap-1'>
                                                <div className='rounded-lg text-black text-base '>
                                                    <IoBagOutline className='font-semibold' />
                                                </div>
                                                <h3 className='text-sm md:text-base font-semibold '>Total Delivered</h3>
                                            </div>
                                            <div>
                                                <h2 className='text-xl md:text-2xl font-bold '>{completedOrders?.length}</h2>
                                            </div>
                                        </div>
                                        <div className='w-full shadow-md rounded-md flex flex-col gap-2  md:p-5 px-4 py-5 bg-white'>
                                            <div className='rounded-lg flex items-center gap-1'>
                                                <div className='rounded-lg text-black text-base '>
                                                    <IoBagOutline className='font-semibold' />
                                                </div>
                                                <h3 className='text-sm md:text-base font-semibold '>Total Pending</h3>
                                            </div>
                                            <div>
                                                <h2 className='text-xl md:text-2xl font-bold '>{pendingOrders?.length}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};


export default AdminTabs;
