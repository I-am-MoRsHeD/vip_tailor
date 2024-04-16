import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import useCarts from "../../../hooks/useCarts";
import { useRef, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import rectnglor from "../../../assets/Rectangle.jpg";
import { Link } from "react-router-dom";
import { ReactToPrint } from "react-to-print";
import { IoPrintOutline } from "react-icons/io5";

const AddToCart = () => {
  const axiosPublic = useAxiosPublic();
  const [carts, refetch] = useCarts();
  const [items, setItems] = useState(null);
  console.log(carts);
  const componentRef = useRef(null);

  const totalAmount = carts?.reduce(
    (total, product) => total + product?.price,
    0
  );

  const totalQuantity = carts?.reduce(
    (total, product) => total + product?.quantity,
    0
  );
  //   console.log(carts);

  const handlePay = async (product) => {
    setItems(product);
    const data = product?.map((data) => ({
      quantity: data?.quantity,
      code: data?.productCode,
    }));

    // let title = items?.map(product => product?.title);

    if (carts?.length === 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please add data first",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      // send data to the server
      await axiosPublic.post("/soldItems", { items: carts }).then((res) => {
        console.log(res.data, "stored data");
        if (res.data.message === "success") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment successfull",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });

      // delete all the product
      await axiosPublic.delete(`/carts/items?title=${"cart"}`).then((res) => {
        console.log(res.data, "data deleted");
        refetch();
      });

      // update the product quantity
      await axiosPublic
        .patch("/sellProduct/cartUpdate", { items: data })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

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
        axiosPublic.delete(`/carts/${product?._id}`).then((res) => {
          console.log(res);
          refetch();
          if (res.status === 200) {
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
    <>
      <div className="bg-white overflow-scroll 2xl:h-[80vh] lg:h-[85vh] md:h-[80vh] lg:ml-10 rounded-md mx-3 lg:mx-0">
        <div className="p-2">
          <div>
            {carts?.length > 0 ? <div>
              <div className="flex justify-between">
                <SectionTitle
                  title="Sold Products Info"
                // descrition="Welcome to our showcase selections, where uniqueness meets quality."
                />
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
              <div ref={componentRef}>
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts?.map((product, ind) => (
                        <tr key={product?._id}>
                          <th>{ind + 1}</th>
                          <th>{product?.productName}</th>
                          <td>{product?.category}</td>
                          <td>{product?.quantity}</td>
                          <td>{product?.price}</td>
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
                <div className="flex flex-col p-2 mb-5 gap-6">
                  <div className="flex justify-end">
                    <div className="flex justify-between lg:w-2/5 w-full p-3 border border-[#403030]">
                      <h2 className="font-bold lg:text-xl text-base">
                        Total <span>({totalQuantity})</span>
                      </h2>
                      <h2 className="font-bold lg:text-xl text-base">
                        BDT {totalAmount}{" "}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePay(carts)}
                    className={`btn bg-[#403030] text-white hover:bg-[#362929] ${carts?.length < 1 ? "disabled" : ""
                      }`}
                    disabled={carts?.length < 1}
                  >
                    Confirm Payment
                  </button>

                  {/* {carts.length && (
            <button
              onClick={() => handlePay(carts)}
              className="btn bg-[#403030] text-white hover:bg-[#362929]"
            >
              Confirm Payment
            </button>
          )} */}
                </div>
              </div>
            </div> : <div>
              <div className="bg-white md:h-auto overflow-scroll 2xl:h-[80vh] lg:h-[85vh] h-[77vh] lg:ml-10 rounded-md mx-3 lg:mx-0">
                <div className="flex flex-col justify-center h-full items-center">
                  <div className="flex justify-center items-center mt-4">
                    <img className="w-[50%]" src={rectnglor} alt="" />
                  </div>
                  <div className="text-center mt-6">
                    <p className="font-semibold">No Product Available to Show Here</p>
                    <Link to="/productList">
                      <button className="focus:outline-none focus:ring-2 w-[50%] mt-5 focus:border-transparent bg-[#403030] hover:bg-[#221919] text-white font-semibold py-2.5 rounded-md">
                        Add Product
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCart;
