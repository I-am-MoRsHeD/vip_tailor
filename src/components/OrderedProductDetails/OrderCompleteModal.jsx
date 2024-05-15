import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GiCancel } from "react-icons/gi";
import { FaRegEdit } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const OrderCompleteModal = ({
  data,
  onClose,
  refetchData,
  complete,
  dataFetch,
  setOrderData,
}) => {
  const axios = useAxiosPublic();
  const [orderId, setOrderId] = useState();

  const [productStatuses, setProductStatuses] = useState(
    data?.products?.map((product) => product?.productStatus) || []
  );
  useEffect(() => setOrderId(data?._id), []);
  //   console.log(data);

  const handleComplete = async (productId) => {
    try {
      const url = `/orderProduct/orderId/${orderId}/productStatus/${productId}`;
      const updatedStatuses = productStatuses?.map((status, index) =>
        data?.products[index]?._id === productId ? "complete" : status
      );
      setProductStatuses(updatedStatuses);

      const res = await axios.patch(url);
      if (res.data.message === "success") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product marked as complete",
          showConfirmButton: false,
          timer: 1500,
        });
        // onClose();
      }
      refetchData();
      dataFetch();
      // setOrderData([]);
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };
  //   console.log(productStatuses);
  const handleCompleteAll = async (id) => {
    try {
      const url = `/orderProduct/${id}`;
      const res = await axios.patch(url);
      if (res.data.message === "success") {
        Swal.fire({
          position: "top-end",
          // icon: "success",
          title: "Order Completed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetchData();
      dataFetch();

      onClose();
    } catch (error) {
      console.error("Error completing order:", error);
      await refetchData();
    }
  };
  //   console.log(dataFetch());
  return (
    <div className="fixed z-[100] flex flex-col items-center justify-center inset-0 bg-black/10 duration-100 ">
      <div className="max-w-2xl bg-white rounded-lg shadow-xl lg:w-2/5 w-4/5 lg:p-10 p-4 scale-1 opacity-1 duration-200">
        <div className="rounded-lg">
          <button
            onClick={onClose}
            className="text-[#1D2A3B] float-end text-lg"
          >
            <GiCancel />
          </button>
          <div className="">
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
                    className="flex justify-between m-auto gap-14 py-2 lg:mx-5 mx-2"
                  >
                    <td className="whitespace-nowrap">{dd?.name}</td>
                    <td>{dd?.quantity}</td>
                    <td>{productStatuses[id]}</td>
                    <td className=" text-base gap-3">
                      {data?.products?.length < 2 ? (
                        <button
                          onClick={() => handleCompleteAll(orderId)}
                          className="rounded-lg text-white  px-2 py-[2px] bg-blue-500 text-center"
                        >
                          Complete
                        </button>
                      ) : (
                        <button
                          onClick={() => handleComplete(dd?._id)}
                          className="rounded-lg text-white  px-2 py-[2px] bg-blue-500"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </div>
          </div>
        </div>
        {data?.products?.length > 1 ? (
          <div className="flex justify-center items-center my-3">
            <button
              onClick={() => handleCompleteAll(orderId)}
              className="rounded-lg text-white  px-2 py-[2px] bg-blue-500 text-center"
            >
              Complete All
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default OrderCompleteModal;
