import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GiCancel } from "react-icons/gi";
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

  useEffect(() => setOrderId(data?._id), [data]);

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
      }
      refetchData();
      dataFetch();
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  const handleCompleteAll = async (id) => {
    try {
      const url = `/orderProduct/${id}`;
      const res = await axios.patch(url);
      if (res.data.message === "success") {
        Swal.fire({
          position: "top-end",
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

  return (
    <div className="fixed z-50 flex items-center justify-center inset-0 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-4 md:p-8">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-lg text-[#1D2A3B]"
          >
            <GiCancel />
          </button>
          <div className="mt-8">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead>
                  <tr className="text-black border-b border-gray-300">
                    <th className="py-2 px-4">Product Name</th>
                    <th className="py-2 px-4">Product Quantity</th>
                    <th className="py-2 px-4">Product Status</th>
                    <th className="py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products?.map((product, index) => (
                    <tr key={product._id} className="border-b border-gray-200">
                      <td className="py-2 px-4">{product?.name}</td>
                      <td className="py-2 px-4">{product?.quantity}</td>
                      <td className="py-2 px-4">{productStatuses[index]}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleComplete(product?._id)}
                          className="rounded-lg text-white px-4 py-2 bg-blue-500"
                        >
                          Complete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {data?.products?.length > 1 && (
          <div className="flex justify-center items-center my-4">
            <button
              onClick={() => handleCompleteAll(orderId)}
              className="rounded-lg text-white px-4 py-2 bg-blue-500"
            >
              Complete All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCompleteModal;
