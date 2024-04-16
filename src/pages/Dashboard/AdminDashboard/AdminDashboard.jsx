import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar2 from "../../../shared/Navbar2/Navbar2";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineHome,
  AiOutlineSchedule,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { FaUserClock } from "react-icons/fa";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { IoBagAddOutline, IoPeople, IoPersonOutline } from "react-icons/io5";
import {
  MdAddTask,
  MdDashboard,
  MdOutlineAddChart,
  MdOutlineAddCircleOutline,
  MdProductionQuantityLimits,
} from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { CiViewList } from "react-icons/ci";
import { ImStatsDots } from "react-icons/im";

const AdminDashboard = ({ isSideMenuOpen, toggleSideMenu }) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logged Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully logged out",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      }
    });
  };

  const navlinks = (
    <>
      <li className="relative px-2 py-0">
        <NavLink
          defaultChecked
          className={({ isActive }) =>
            isActive
              ? "inline-flex items-center bg-[#DFF8FC] w-48 pl-2 py-0 pr-2 rounded font-bold text-[#3d48df] hover:text-blue-600 text-base"
              : "inline-flex items-center font-semibold pl-2 py-0 hover:text-blue-600 text-base"
          }
          to="adminHome"
        >
          <MdDashboard />
          <span className="ml-4">Home</span>
        </NavLink>
      </li>
      <li className="relative px-2 py-0">
        <NavLink
          defaultChecked
          className={({ isActive }) =>
            isActive
              ? "inline-flex items-center bg-[#DFF8FC] w-48 pl-2 pr-2 py-0 rounded font-bold text-[#3d48df] hover:text-blue-600 text-base"
              : "inline-flex items-center font-semibold pl-2 py-0 hover:text-blue-600 text-base"
          }
          to="addProduct"
        >
          <MdOutlineAddChart />
          <span className="ml-4">Add Product</span>
        </NavLink>
      </li>
      <li className="relative px-2 py-0">
        <NavLink
          defaultChecked
          className={({ isActive }) =>
            isActive
              ? "inline-flex items-center bg-[#DFF8FC] w-48 pl-2 pr-2 py-0 rounded font-bold text-[#3d48df] hover:text-blue-600 text-base"
              : "inline-flex items-center font-semibold pl-2 py-0 hover:text-blue-600 text-base"
          }
          to="addcategory"
        >
          <MdOutlineAddCircleOutline />
          <span className="ml-4">Add Category</span>
        </NavLink>
      </li>
      <li className="relative px-2 py-0 ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "inline-flex items-center bg-[#DFF8FC] w-48 pl-2 pr-2 py-0 rounded font-bold text-[#3d48df] hover:text-blue-600 text-base"
              : "inline-flex items-center font-semibold pl-2 py-0 hover:text-blue-600 text-base"
          }
          to="productList"
        >
          <CiViewList />
          <span className="ml-4">Product List</span>
        </NavLink>
      </li>
      <li className="relative px-2 py-0 ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "inline-flex items-center bg-[#DFF8FC] w-48 pl-2 pr-2 py-0 rounded font-bold text-[#3d48df] hover:text-blue-600 text-base"
              : "inline-flex items-center font-semibold pl-2 py-0 hover:text-blue-600 text-base"
          }
          to="orderedList"
        >
          <MdProductionQuantityLimits />
          <span className="ml-4">Ordered List</span>
        </NavLink>
      </li>
      <li className="relative px-2 py-0 ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "inline-flex items-center bg-[#DFF8FC] w-42 pl-2 pr-2 py-0 rounded font-bold text-[#3d48df] hover:text-blue-600 text-base"
              : "inline-flex items-center font-semibold pl-2 py-0 hover:text-blue-600 text-base"
          }
          to="productStatement"
        >
          <AiOutlineSchedule />
          <span className="ml-4">Product Statement</span>
        </NavLink>
      </li>
      <li className="relative px-2 py-0 ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "inline-flex items-center bg-[#DFF8FC] w-42 pl-2 pr-2 py-0 rounded font-bold text-[#3d48df] hover:text-blue-600 text-base"
              : "inline-flex items-center font-semibold pl-2 py-0 hover:text-blue-600 text-base"
          }
          to="orderStatement"
        >
          <ImStatsDots />
          <span className="ml-4">Order Statement</span>
        </NavLink>
      </li>
      <li className="relative px-2 py-0 ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "inline-flex items-center bg-[#DFF8FC] w-48 pl-2 pr-2 py-0 rounded font-bold text-[#3d48df] hover:text-blue-600 text-base"
              : "inline-flex items-center font-semibold pl-2 py-0 hover:text-blue-600 text-base"
          }
          to="addNotice"
        >
          <MdAddTask />
          <span className="ml-4">Add Notice</span>
        </NavLink>
      </li>
      <li className="relative px-2 py-0 ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "inline-flex items-center bg-[#DFF8FC] w-48 pl-2 pr-2 py-0 rounded font-bold text-[#3d48df] hover:text-blue-600 text-base"
              : "inline-flex items-center font-semibold pl-2 py-0 hover:text-blue-600 text-base"
          }
          to="allMembers"
        >
          <IoPeople />
          <span className="ml-4">All Members</span>
        </NavLink>
      </li>
    </>
  );
  return (
    <div
      className={`flex h-screen bg-white ${
        isSideMenuOpen ? "overflow-hidden" : ""
      }`}
    >
      {/* Dashboard */}
      <aside className="z-20 flex-shrink-0 fixed hidden w-[285px] overflow-y-auto bg-white lg:block lg:mt-20 4xl:ml-[12%] 3xl:ml-[11%] 2xl:ml-[13%] xl:ml-5 rounded-lg ">
        <div className="2xl:h-[80vh] lg:h-[84.5vh] py-3 pl-3 flex flex-col 2xl:justify-between gap-9 shadow-xl">
          {/* logo */}
          <div>
            <p className="font-bold text-lg">Admin Dashboard</p>
          </div>
          {/* items and routes */}
          <div className=" flex flex-col justify-between">
            <ul className="leading-10">{navlinks}</ul>
          </div>
          {/* footer */}
          <div className="flex -mt-3 justify-center items-center">
            <p>Copyright © 2024 - All right reserved by VIP Tailor's</p>
          </div>
        </div>
      </aside>
      <div className="fixed inset-0 -z-10 flex items-end bg-slate-300 bg-opacity-50 sm:items-center sm:justify-center"></div>
      {/* responsive dashboard */}
      <aside
        className={`z-20 fixed duration-300 w-64 inset-y-0 ease-in-out overflow-y-auto bg-white ${
          isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="h-screen md:py-3 pl-3 flex flex-col justify-between shadow-xl">
          {/* logo */}
          <div>
            <h1 className="text-2xl">VIP Tailor</h1>
          </div>
          {/* items and routes */}
          <div className=" flex flex-col pt-5 justify-between">
            <ul className="leading-8">{navlinks}</ul>
          </div>
          {/* footer */}
          <div className="flex justify-center items-center">
            <p className="text-xs lg:text-base">
              Copyright © 2024 - All right reserved by VIP Tailor's
            </p>
          </div>
        </div>
      </aside>
      {/* components */}
      <div className="flex flex-col flex-1 w-full overflow-y-auto bg-[#f6f5f5]">
        <header className="z-40 py-5 bg-slate-50 fixed w-full top-0 lg:hidden">
          <div className="flex items-center justify-between h-8 px-6 mx-auto">
            <button
              className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
              onClick={toggleSideMenu}
              aria-label="Menu"
            >
              {isSideMenuOpen ? (
                <FaXmark className="w-6 h-6" />
              ) : (
                <FaBarsStaggered className="w-6 h-6" />
              )}
            </button>
            <div className="flex lg:hidden justify-end mr-4 w-full">
              <button onClick={handleLogout} className="btn btn-sm">
                <IoPersonOutline className="text-xl" /> Logout
              </button>
            </div>
          </div>
        </header>
        <main className="scroll-smooth">
          <div className="">
            <Navbar2></Navbar2>
          </div>
          <div className="4xl:ml-[25.5%] 4xl:mr-[200px] 3xl:ml-[26%] 3xl:mr-[10%] lg:h-[83vh] 2xl:ml-[29%] 2xl:mr-[12%] xl:ml-[22%] xl:mr-0 lg:ml-[285px] mt-4">
            <Outlet></Outlet>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
