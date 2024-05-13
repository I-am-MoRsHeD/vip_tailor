import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GiCancel } from "react-icons/gi";
import { FaRegEdit } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const OrderCompleteModal = ({ data, onClose, refetchData, complete }) => {
  const axios = useAxiosPublic();
  const [orderId, setOrderId] = useState();

  useEffect(() => setOrderId(data?._id), []);
  const handleComplete = async (productId) => {
    try {
      const url = `/orderProduct/orderId/${orderId}/productStatus/${productId}`;
      //   console.log(url);
      const res = await axios.patch(url);
      //   await refetchData();
      if (res.data.message === "success") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Order added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      await refetchData();
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };
  const handleCompleteAll = async (id) => {
    try {
      const url = `/orderProduct/${id}`;
      //   console.log(url);
      const res = await axios.patch(url);
      //   await refetchData();
      if (res.data.message === "success") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Order added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      await refetchData();
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  return (
    <div className="fixed z-[100] flex flex-col items-center justify-center inset-0 bg-black/10 duration-100 ">
      <div className="max-w-2xl rounded-sm bg-white p-10 scale-1 opacity-1 duration-200">
        <div className="rounded-lg">
          <button
            onClick={onClose}
            className="text-[#1D2A3B] float-end text-lg"
          >
            <GiCancel />
          </button>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-black border-b-[1.2px] border-black">
                    <th>Product Name</th>
                    <th>Product Quantity</th>
                    <th>Product Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
              </table>
              <tbody>
                {data?.products?.map((dd, id) => (
                  <tr
                    key={dd._id}
                    className="flex justify-between m-auto gap-14 py-2 mx-5"
                  >
                    <td className="whitespace-nowrap">{dd?.name}</td>
                    <td>{dd?.quantity}</td>
                    <td>{dd?.productStatus}</td>
                    <td className=" text-base gap-3">
                      <button
                        onClick={() => handleComplete(dd?._id)}
                        className="rounded-lg text-white  px-2 py-[2px] bg-blue-500"
                      >
                        Complete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center my-3">
          <button
            onClick={() => handleCompleteAll(orderId)}
            className="rounded-lg text-white  px-2 py-[2px] bg-blue-500 text-center"
          >
            Complete All
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCompleteModal;
