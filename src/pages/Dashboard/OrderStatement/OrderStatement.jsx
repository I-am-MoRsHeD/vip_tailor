import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useOrderedProduct from "../../../hooks/useOrderedProduct";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Pagination from "../../../components/pagination/pagination";
import { useEffect, useState } from "react";
import DashBoardTitle from "../../../components/dashboardTitle/DashBoardTitle";

const OrderStatement = () => {
  const [orderProducts, refetch, currentPage, totalPages, setCurrentPage] =
    useOrderedProduct();
  const axiosPublic = useAxiosPublic();
  // console.log(orderProducts);

  const handleDelete = (product) => {
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
        axiosPublic.delete(`/orderProduct/${product?._id}`).then((res) => {
          // console.log(res);
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Order Statement has been deleted..!",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };

  // calculation of quantity
  const [totalQuantity, setTotalQuantity] = useState(
    orderProducts?.items?.reduce((total, product) => total + product?.products?.map(pp => pp?.quantity), 0)
  );

  // let totalQuantity = 0;
  // let totalAmount = 0;
  // // console.log(orderProducts);

  // if (orderProducts?.items && Array.isArray(orderProducts?.items)) {
  //   totalQuantity = orderProducts?.items?.reduce((total, item) => {
  //     if (item?.products && Array.isArray(item?.products)) {
  //       return (
  //         total +
  //         item?.products.reduce((acc, product) => acc + product?.quantity, 0)
  //       );
  //     } else {
  //       return total;
  //     }
  //   }, 0);

  //   totalAmount = orderProducts?.items?.reduce((total, item) => {
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
    <div className="overflow-scroll 2xl:h-[80vh] xl:h-[82.6vh] lg:h-[84.5vh] lg:ml-3 xl:ml-9 mx-3 lg:mx-0">
      <div className="mb-2">
        <DashBoardTitle
          title={"Admin"}
          subTitle={"Add, Edit your category section in one click. "}
        />
      </div>
      <div className="bg-white px-2 pt-2 rounded-md">
        <div className="px-3 lg:w-6/12 mx-auto text-center mb-7">
          <SectionTitle title="Statement Pieces" />
        </div>
        <div className="overflow-x-auto h-[54vh]">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="border-b-[1.2px] border-black text-black">
                <th className="p-auto md:p-0">#</th>
                <th>Code</th>
                <th>Delivery Date</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderProducts?.items?.map((product, ind) => (
                <tr
                  className="border-b-[1.2px] border-black"
                  key={product?._id}
                >
                  <td className="p-auto md:p-0">{ind + 1}</td>
                  <td>{product?.invoiceNo}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="">
                          {new Date(product?.deliveryDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {product?.products?.reduce((total, pp) => total + pp?.quantity, 0)}
                  </td>
                  <td>{product?.totalAmount}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(product)}
                      className="btn btn-sm"
                    >
                      <MdOutlineDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default OrderStatement;
