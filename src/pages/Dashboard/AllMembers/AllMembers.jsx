import React, { useEffect, useState } from "react";
// import useUser from '../../../hooks/useUser';
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaRegTrashAlt } from "react-icons/fa";
import Pagination from "../../../components/pagination/pagination";
import useAuth from "../../../hooks/useAuth";
import DashBoardTitle from "../../../components/dashboardTitle/DashBoardTitle";

const AllMembers = () => {
  const [axiosSecure] = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  // Pagination
  const [productLength, setProductLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(productLength / itemsPerPage);
  const { user } = useAuth();
  const email = user?.email;

  const { data: users } = useQuery({
    queryKey: ["userInfo", email],
    staleTime: Infinity,
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", email],
    staleTime: Infinity,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${email}`);
      return res.data;
    },
  });
  const role = userInfo?.role;

  const { data: userPagination, refetch: refetchByPagination } = useQuery({
    queryKey: ["userPagination", role, itemsPerPage, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/user/1/state?role=${role}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (userPagination && userPagination?.totalCount) {
      setProductLength(userPagination?.totalCount);
      refetchByPagination();
    } else {
      setProductLength(0);
      refetchByPagination();
    }
  }, [userPagination]);
  console.log(userPagination?.totalCount);

  // make admin
  const handleMakeAdmin = (user) => {
    axiosPublic.patch(`/user/admin/${user?._id}`).then((res) => {
      if (res?.data?.message === "success") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:` ${user?.name} is now an Admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetchByPagination();
    });
  };

  // make employee
  const handleMakeEmployee = (user) => {
    axiosPublic.patch(`/user/employee/${user?._id}`).then((res) => {
      refetchByPagination();
      if (res?.data?.message === "success") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user?.name} is now an employee`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // make user
  const handleMakeUser = (user) => {
    axiosPublic.patch(`/user/${user?._id}`).then((res) => {
      if (res?.data?.message === "success") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user?.name} is now an user`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetchByPagination();
    });
  };

  // make delete
  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/user/${user?._id}`).then((res) => {
          console.log(res);
          if (res.status === 200) {
            refetchByPagination();
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted..!",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="md:ml-3 lg:ml-10 overflow-scroll xl:h-[85vh] lg:h-[84.5vh] h-screen mx-3 md:mx-0">
      <div className="mb-2">
        <DashBoardTitle
          title={"Admin"}
          subTitle={"Add, Edit your category section in one click. "}
        />
      </div>
      <div className=" bg-white rounded-md">
        <div className="md:mx-3 h-auto md:py-5">
          <div className="md:bg-gray-100 w-[100%] p-3 rounded-md">
            <h3 className="text-base font-semibold">User List</h3>
            {/* user container */}
            {userPagination?.items?.map((user) => (
              <div
                key={user?._id}
                className="flex md:flex-row flex-col md:justify-between md:items-center justify-center md:my-3 my-4 gap-2"
              >
                {/* name and email */}
                <div className="flex justify-between w-full md:w-1/3">
                  <div className="w-28 md:w-full">
                    <h2 className="text-base md:text-lg whitespace-nowrap font-semibold">
                      {user?.name || ""}
                    </h2>
                    <h4 className="text-xs md:text-xs text-gray-600">
                      {user?.email}
                    </h4>
                  </div>
                  <div className=" flex justify-center items-center md:hidden">
                    <button onClick={() => handleDelete(user)} className="">
                      <FaRegTrashAlt className="text-xl" />
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <div className="flex gap-2 w-full">
                    <div className="grid grid-cols-3 gap-4 w-full md:w-11/12 text-center">
                      {/* make admin */}
                      {user?.role === "admin" ? (
                        <h1 className="bg-yellow-950 md:text-sm text-xs text-white font-bold md:px-2 px-2 lg:px-6 lg:py-4 py-2 rounded-lg">
                          Admin
                        </h1>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="md:bg-white bg-gray-100 font-bold md:text-sm text-xs md:px-2 px-2 lg:px-6 lg:py-4 md:py-2 py-2 rounded-lg hover:shadow-md hover:scale-105 duration-300 hover:duration-300 whitespace-nowrap "
                        >
                          Make Admin
                        </button>
                      )}
                      {/* make employee */}
                      {user?.role === "employee" ? (
                        <h1 className="bg-yellow-950 md:text-sm text-xs text-white font-bold md:px-2 px-2 lg:px-6 lg:py-4 md:py-2 py-2 rounded-lg">
                          Employee
                        </h1>
                      ) : (
                        <button
                          onClick={() => handleMakeEmployee(user)}
                          className="md:bg-white bg-gray-100  font-bold md:text-sm text-[10px] md:px-1 px-2 lg:px-6 lg:py-4 md:py-2 py-2 rounded-lg hover:shadow-md hover:scale-105 duration-300 hover:duration-300 whitespace-nowrap"
                        >
                          Make Employee
                        </button>
                      )}
                      {/* make user */}
                      {user?.role === "user" ? (
                        <h1 className="bg-yellow-950 md:text-sm text-xs text-white font-bold md:px-2 px-2 lg:px-6 lg:py-4 md:py-3 py-2 rounded-lg">
                          User
                        </h1>
                      ) : (
                        <button
                          onClick={() => handleMakeUser(user)}
                          className="md:bg-white bg-gray-100 font-bold md:text-sm text-xs md:px-2 lg:px-6 lg:py-4 px-2 md:py-2 py-2 rounded-lg hover:shadow-md hover:scale-105 duration-300 hover:duration-300 whitespace-nowrap"
                        >
                          Make User
                        </button>
                      )}
                    </div>

                    <div className=" md:flex justify-center items-center hidden md:w-1/12">
                      <button onClick={() => handleDelete(user)} className="">
                        <FaRegTrashAlt className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AllMembers;