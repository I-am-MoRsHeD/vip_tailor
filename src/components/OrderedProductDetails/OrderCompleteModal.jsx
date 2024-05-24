import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { GiCancel } from "react-icons/gi";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const OrderCompleteModal = ({ data, onClose, refetchData, complete, dataFetch, setOrderData, }) => {
  const axios = useAxiosPublic();
  const [input, setInput] = useState();
  const [orderId, setOrderId] = useState();
  const [totalAmount, setTotalAmount] = useState(
    data?.products?.reduce((total, product) => total + product?.price * product?.quantity, 0) || 0
  );
  const [productStatuses, setProductStatuses] = useState(
    data?.products?.map((product) => product?.productStatus) || []
  );

  useEffect(() => setOrderId(data?._id), [data]);

  const handleComplete = async (product) => {

    try {
      const url = `/orderProduct/orderId/${orderId}/productStatus/${product?._id}`;

      // updating status
      const updatedStatuses = productStatuses?.map((status, index) =>
        data?.products[index]?._id === product?._id ? "complete" : status
      );
      setProductStatuses(updatedStatuses);

      // update due amount
      const paidAmount = parseFloat(input);

      // requesting for patch
      const res = await axios.patch(url, { paidAmount });
      console.log(res.data);
      if (res.data.message === 'success') {
        console.log('attack')
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product marked as complete",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Please check your due amount first",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetchData();
      dataFetch();
    } catch (error) {
      console.error("Error completing order:", error);
    }
  }

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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="relative  px-8 pt-2">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-lg text-[#1D2A3B]"
          >
            <GiCancel />
          </button>
          <div className="flex justify-between pt-5 border-b-2 border-black">
            <h1 className="text-base font-semibold">Total Due: {data?.dueAmount}</h1>
            <h1 className="text-base font-semibold">Total Amount: {totalAmount} </h1>
          </div>
        </div>
        <div className="relative m-4 md:m-8">
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
                        {product?.productStatus === 'complete' ? <button
                          className="rounded-lg font-bold btn-disabled text-black px-3 py-2 bg-blue-500"
                        >
                          Completed
                        </button>
                          :
                          <button className="rounded-lg text-white px-4 py-2 bg-blue-500 hover:bg-blue-600" onClick={() => document.getElementById('my_modal_3').showModal()}>Complete</button>}

                        {/* new modal value access div */}
                        <dialog id="my_modal_3" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <div className="flex flex-col">
                              <input
                                value={input} placeholder="Put Your Amount Here" onInput={e => setInput(e.target.value)}
                                className="my-3 p-4 rounded-md outline-none text-black border border-black" type="text" name="amount" id="" />
                              <button
                                onClick={() => handleComplete(product)}
                                className="rounded-lg text-white px-4 py-2 bg-blue-500 hover:bg-blue-600"
                              >
                                Complete
                              </button>
                            </div>
                          </div>
                        </dialog>
                        {/* <button
                          onClick={() => handleComplete(product)}
                          className="rounded-lg text-white px-4 py-2 bg-blue-500 hover:bg-blue-600"
                        >
                          Complete
                        </button> */}

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
