import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Pagination from "../pagination/pagination";
import { useEffect, useState } from "react";
import OrderCompleteModal from "./OrderCompleteModal";

const OrderedProductDetails = ({
  products,
  filteredUser,
  currentPage,
  setCurrentPage,
  totalPages,
  refetch,
  orderProducts,
  dataFetch,
}) => {
  const axiosPublic = useAxiosPublic();
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const handleCompleteModal = (product) => {
    setSelectedData(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const calculateDueAmount = (products, advancedAmount) => {
    const totalAmount = products?.reduce(
      (sum, product) => sum + product?.price * product?.quantity,
      0
    );
    return totalAmount - advancedAmount;
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-black border-b-[1.5px] border-black">
              <th className="p-1">Invoice No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              {products?.items?.some((dd) => dd.status === "pending") && (
                <>
                  <th>Advanced</th>
                  <th>Due</th>
                </>
              )}

              <th>Delivery Date</th>
              <th>Image</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products?.items?.map((product, ind) => (
              <tr key={product?._id} className="border-b-[1.5px] border-black">
                <td className="p-1">{product?.invoiceNo}</td>
                <td>
                  {product?.products?.map((dd, id) => (
                    <h1 key={dd?._id}>{dd?.name}</h1>
                  ))}
                </td>
                <td className="whitespace-nowrap">
                  {product?.products.map((dd, id) => (
                    <h1 key={dd?._id}> BDT {dd?.price}</h1>
                  ))}
                </td>
                <td>
                  {product?.products.map((dd, id) => (
                    <h1 key={dd?._id}>{dd?.quantity}</h1>
                  ))}
                </td>
                {product?.status === "pending" && (
                  <>
                    <td>{product?.advancedAmount}</td>
                    <td>
                      {calculateDueAmount(
                        product?.products,
                        product?.advancedAmount
                      )}
                    </td>
                  </>
                )}

                <td>{new Date(product?.deliveryDate).toLocaleDateString()}</td>
                <td>
                  <img className="w-10 h-10" src={product?.image} alt="" />
                </td>
                <th>
                  {product?.status === "pending" ? (
                    <div>
                      <h1 className="text-xs font-bold">Pending</h1>
                      <button
                        onClick={() => handleCompleteModal(product)}
                        // onClick={() => handleComplete(product)}
                        className="btn btn-xs btn-accent"
                      >
                        Complete
                      </button>
                    </div>
                  ) : (
                    <h1 className="text-xs font-bold">Paid</h1>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      {openModal && (
        <OrderCompleteModal
          data={selectedData}
          onClose={handleCloseModal}
          refetchData={refetch}
          complete={handleCompleteModal}
          dataFetch={dataFetch}
        />
      )}
    </div>
  );
};

export default OrderedProductDetails;
