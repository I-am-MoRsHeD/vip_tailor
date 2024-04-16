import "./ProductDetails.css";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Pagination from "../pagination/pagination";
import { useForm } from "react-hook-form";
import useUser from "../../hooks/useUser";
import useCarts from "../../hooks/useCarts";
import "./swal.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import { GiCancel } from "react-icons/gi";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { MdLocalMall } from "react-icons/md";
import useAllProduct from "../../hooks/useAllProduct";
// import rImg from "../../assets/Character.png";
const ProductDetails = () => {
  const queryClient = useQueryClient();
  const [allSellProducts] = useAllProduct();
  const [searchValue, setSearchValue] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [openModal, setOpenModal] = useState(false);
  const [openSell, setSellModal] = useState(false);
  const [sell, setSell] = useState(null);
  const [id, setId] = useState(null);

  const [productLength, setProductLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const { user } = useAuth();
  const email = user?.email;
  // const { register, handleSubmit, reset } = useForm();

  const [loggedUser, setLoggedUser] = useState();
  const [users] = useUser();
  const [carts, remaining] = useCarts();

  const { data: categories = [] } = useQuery({
    queryKey: ["categoryData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  useEffect(() => {
    if (user && users) {
      const filteredUser = users.find((us) => us.email === user.email);
      setLoggedUser(filteredUser);
    }
  }, [users, user]);

  const handleEdit = async (id) => {
    setId(id);
    try {
      const response = await axiosPublic.get(`/sellProduct/1/${id}`);
      setSell(response?.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const editSaller = async (id) => {
    setId(id);
    try {
      const response = await axiosPublic.get(`/sellProduct/1/${id}`);
      setSell(response?.data);
      setSellModal(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleSell = async (event) => {
    event.preventDefault();

    const form = event.target;
    // console.log(form);
    const categoryName = form.category.value;
    const sellData = {
      productName: form.name.value,
      price: parseInt(form.price.value) * parseInt(form.quantity.value),
      quantity: parseInt(form.quantity.value),
      category: categoryName.toLowerCase(),
      productCode: parseInt(form.code.value),
      sellingDate: new Date(),
      title: "cart",
      email,
    };
    const quantity1 = parseInt(form.quantity.value);
    if (quantity1 > sell?.quantity) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Quantity is less",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    else if (quantity1 < 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Quantity cannot be a negative value",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    else {
      await axiosPublic.post("/carts", sellData).then((res) => {
        // console.log(res);
        if (res.data.message === "success") {
          remaining();
          Swal.fire({
            title: "Congratulations!",
            text: "Sell Added in Admin Dashboard Successfully!",
            confirmButtonText: "Return",
            showConfirmButton: true,
            // confirmButtonClass: "my-custom-button",
            confirmButtonColor: "#403030",
            imageUrl: "https://i.ibb.co/G0DfFjk/Character.png",
            imageWidth: 220,
            imageHeight: 200,
            imageAlt: "Custom image",
          });
        }
      });
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const form = event.target;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const name = form.name.value;
    const sellingDate = form.date.value;
    const category = form.category.value;
    const productCode = form.code.value;

    const updatedToy = {
      price,
      quantity,
      name,
      sellingDate,
      category,
      productCode,
    };

    fetch(`http://localhost:5000/sellProduct/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedToy),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        queryClient.invalidateQueries("filterBySearch");
        setSellModal(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Update Product details",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", email],
    staleTime: Infinity,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${email}`);
      return res.data;
    },
  });
  const role = userInfo?.role;

  const {
    data: filterBySearch = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["filterBySearch", searchValue, itemsPerPage, currentPage],
    cacheTime: 0,
    staleTime: Infinity,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/sellProduct/search?searchValue=${searchValue}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (filterBySearch && filterBySearch.totalCount) {
      setProductLength(filterBySearch.totalCount);
      refetch();
    } else {
      setProductLength(0);
      refetch();
    }
  }, [filterBySearch]);

  console.log(filterBySearch?.items);

  const totalStock = allSellProducts?.reduce(
    (total, product) => total + product?.price * product?.quantity,
    0
  );
  const totalQuantity = allSellProducts?.reduce(
    (total, product) => total + product?.quantity,
    0
  );

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
        axiosPublic.delete(`/sellProduct/${product?._id}`).then((res) => {
          console.log(res);
          if (res.status === 200) {
            // remaining product
            // const remaining = filterBySearch?.filter(products => products?._id !== product?._id)
            // setFilterBySearch(remaining)
            refetch();
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

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSellModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="overflow-scroll 2xl:h-[80vh] lg:h-[84.5vh] mx-3 lg:mx-0">
      <div className="lg:ml-3 xl:ml-9 rounded-md">
        {role === "admin" ? (
          <div className="grid lg:grid-cols-2 grid-cols-1 justify-between items-center my-2 rounded-md gap-2">
            <div className="bg-white p-2 md:p-5 rounded-md flex flex-col lg:justify-start lg:items-start  items-center justify-center gap-2">
              <h1 className="text-xs md:text-sm font-semibold flex items-center justify-start gap-1">
                <span>
                  <FaSortAmountUpAlt />
                </span>
                Total Product Amount
              </h1>
              <h1 className="font-semibold text-xl md:text-2xl">
                {totalStock} BDT
              </h1>
            </div>
            <div className="bg-white p-2 md:p-5 rounded-md flex flex-col lg:justify-start lg:items-start  items-center justify-center gap-2 ">
              <h1 className="text-xs md:text-sm font-semibold flex items-center justify-start">
                <span>
                  <MdLocalMall />
                </span>
                Total Quantity
              </h1>
              <h1 className="font-semibold text-xl md:text-2xl">
                {totalQuantity}
              </h1>
            </div>
          </div>
        ) : (
          " "
        )}
        {/* <div className="flex justify-between items-center my-5 bg-white p-3"></div> */}
        {/* search bar */}
        <div className="bg-white lg:p-2 pt-3 rounded-md">
          <div className="form-control lg:w-1/2 w-[96%] lg:mb-5 mb-2 mx-auto  placeholder:bg-gray-300 rounded-md">
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search by Product Code"
              className="input  focus:outline-none bg-gray-100"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div key={loggedUser?._id}>
              {loggedUser?.role === "employee" ? (
                <div className="overflow-x-auto p-3">
                  <table className="table">
                    <thead>
                      <tr className=" text-black  border-b-[1.2px] border-black">
                        <th>#</th>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterBySearch?.items?.map((product, ind) => (
                        <tr
                          key={product?._id}
                          className=" border-b-[1.2px] border-black"
                        >
                          <td>{ind + 1}</td>
                          <td>{product?.productCode}</td>
                          <td>{product?.name}</td>
                          <td>BDT {product?.price}</td>
                          <td>{product?.quantity}</td>
                          <td>
                            {new Date(
                              product?.sellingDate
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            <img
                              className="w-10 h-10"
                              src={product?.image}
                              alt=""
                            />
                          </td>
                          <td className="flex gap-2 mt-2">
                            <button onClick={() => handleEdit(product?._id)}>
                              <spam className="lg:px-6 px-3 lg:py-3 py-1 md:mr-4 rounded-md bg-gray-100 hover:bg-gray-200 font-semibold">
                                Add
                              </spam>
                            </button>
                            {/* <button
                          onClick={() => handleDelete(product)}
                          className="btn btn-ghost btn-sm bg-gray-300"
                        >
                          <MdOutlineDeleteOutline className="text-xl" />
                        </button> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : loggedUser?.role === "admin" ? (
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr className=" text-black border-b-[1.2px] border-black">
                        <th className="p-1">#</th>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterBySearch?.items?.map((product, ind) => (
                        <tr
                          className="border-b-[1.2px] border-black"
                          key={product?._id}
                        >
                          <td className="p-1">{ind + 1}</td>
                          <td>{product?.productCode}</td>
                          <td>{product?.name}</td>
                          <td>BDT {product?.price}</td>
                          <td>{product?.quantity}</td>
                          <td>
                            {new Date(
                              product?.sellingDate
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            <img
                              className="w-10 h-10"
                              src={product?.image}
                              alt=""
                            />
                          </td>
                          <td className="flex gap-2">
                            <button
                              onClick={() => editSaller(product?._id)}
                              className="btn btn-ghost btn-sm bg-gray-300"
                            >
                              <MdOutlineEdit className="text-xl" />
                            </button>
                            <button
                              onClick={() => handleDelete(product)}
                              className="btn btn-ghost btn-sm bg-gray-300"
                            >
                              <MdOutlineDeleteOutline className="text-xl" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(productLength / itemsPerPage)}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      {openSell && (
        <div
          className="fixed inset-0 z-10 flex items-center lg:ml-32 ml-1 justify-center bg-black bg-opacity-70"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal content goes here */}
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl lg:w-3/5 w-[95%] lg:p-5"
          >
            <div className="flex justify-between p-2 items-center mt-20 md:mt-0">
              <div>
                <SectionTitle title={"Edit Product Details"} />
              </div>
              <div>
                <button
                  onClick={() => setSellModal(false)}
                  className="text-[#1D2A3B] text-xl"
                >
                  <GiCancel />
                </button>
              </div>
            </div>
            <div className="p-2 lg:p-6">
              <form className="" onSubmit={handleUpdate}>
                <div className="md:flex md:gap-6">
                  {/* Product Name */}
                  <div className="form-control w-full my-1">
                    {/* <label className="label">
                      <span className="label-text">Product Name*</span>
                    </label> */}
                    <input
                      name="name"
                      defaultValue={sell?.name}
                      type="text"
                      placeholder="Product Name"
                      className="input input-bordered w-full focus:outline-none"
                    />
                  </div>
                  {/* Quantity */}
                  <div className="form-control w-full my-1">
                    {/* <label className="label">
                      <span className="label-text">Quantity*</span>
                    </label> */}
                    <input
                      name="quantity"
                      defaultValue={sell?.quantity}
                      type="number"
                      placeholder="Quantity"
                      className="input input-bordered w-full focus:outline-none"
                    />
                  </div>
                </div>
                <div className="md:flex md:gap-6">
                  {/* price */}
                  <div className="form-control w-full my-1">
                    {/* <label className="label">
                      <span className="label-text">Price*</span>
                    </label> */}
                    <input
                      name="price"
                      defaultValue={sell?.price}
                      type="number"
                      placeholder="Price"
                      className="input input-bordered focus:outline-none w-full"
                    />
                  </div>
                  {/* Date */}
                  <div className="form-control w-full my-1">
                    {/* <label className="label">
                      <span className="label-text">Date(mm/dd/yyyy)*</span>
                    </label> */}
                    <input
                      name="date"
                      defaultValue={sell?.sellingDate}
                      placeholder="Date"
                      className="input input-bordered focus:outline-none w-full"
                    />
                  </div>
                </div>
                <div className="md:flex md:gap-6">
                  {/* category */}
                  <div className="form-control w-full my-1">
                    {/* <label className="label">
                      <span className="label-text">Category*</span>
                    </label> */}
                    {/* <select
                      name="category"
                      defaultValue={sell?.category}
                      className="select select-bordered focus:outline-none w-full"
                    >
                      <option disabled value="default">
                        Select a category
                      </option>
                      <option value="punjabi">Punjabi</option>
                      <option value="suit">Suit</option>
                      <option value="cosmetics">Cosmetics</option>
                      <option value="shelai">Shelai</option>
                      <option value="ready-Made">Ready-Made</option>
                    </select> */}
                    <select
                      name="category"
                      // className="bg-white p-2 rounded-sm"
                      className="select select-bordered focus:outline-none w-full"
                      onChange={(e) => handleCategory(e.target.value)}
                    //   value={filter}
                    >
                      {categories?.map((category, index) => (
                        <option value={category?.category} key={category._id}>
                          {category?.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* product Code */}
                  <div className="form-control w-full my-1">
                    {/* <label className="label">
                      <span className="label-text">Product Code*</span>
                    </label> */}
                    <input
                      name="code"
                      defaultValue={sell?.productCode}
                      type="number"
                      placeholder="Product Code"
                      className="input input-bordered focus:outline-none w-full"
                    />
                  </div>
                </div>
                <button className="focus:outline-none focus:ring-2 w-full mt-5 focus:ring-blue-800 focus:border-transparent bg-[#403030] hover:bg-[#2e2222] text-white font-semibold py-2.5 rounded-md">
                  Edit Product
                </button>
              </form>
              {/* <button onClick={() => setOpenModal(false)} className="absolute top-0 right-0 p-2 mt-1 mr-1 btn btn-ghost btn-sm bg-gray-300">
                                <MdClose className="text-xl" />
                            </button> */}
            </div>
          </div>
        </div>
      )}

      {openModal && (
        <div
          className="fixed inset-0 z-10 flex items-center pt-32 pb-14 lg:pt-0 lg:pb-0 lg:ml-32 justify-center bg-black bg-opacity-70"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal content goes here */}
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl lg:w-2/5 w-4/5 lg:p-5 p-2"
          >
            <div className="lg:p-12 p-6">
              <form className="" onSubmit={handleSell}>
                <div className="">
                  <div className="form-control w-full my-3">
                    <label className="label">
                      <span className="label-text">Product Name*</span>
                    </label>
                    <input
                      name="name"
                      defaultValue={sell?.name}
                      type="text"
                      placeholder="Product Name"
                      className="input input-bordered w-full focus:outline-none"
                      disabled
                    />
                  </div>
                  <div className="form-control w-full my-3">
                    <label className="label">
                      <span className="label-text">Quantity*</span>
                    </label>
                    <input
                      name="quantity"
                      type="number"
                      placeholder={sell?.quantity}
                      //   placeholder="Put Quantity"
                      className="input input-bordered border-2 border-slate-500 w-full focus:outline-none"
                    />
                  </div>
                  <div className="form-control w-full my-3">
                    <label className="label">
                      <span className="label-text">Price*</span>
                    </label>
                    <input
                      name="price"
                      defaultValue={sell?.price}
                      type="number"
                      placeholder="Price"
                      className="input input-bordered focus:outline-none w-full"
                    //   disabled
                    />
                  </div>
                </div>
                <div className=" gap-6 hidden">
                  <div className="form-control w-full my-1">
                    <label className="label">
                      <span className="label-text">Date(mm/dd/yyyy)*</span>
                    </label>
                    <input
                      name="date"
                      defaultValue={sell?.sellingDate}
                      placeholder="Date"
                      className="input input-bordered focus:outline-none w-full"
                      disabled
                    />
                  </div>
                </div>
                <div className="hidden gap-6">
                  <div className="form-control w-full my-1">
                    <label className="label">
                      <span className="label-text">Category*</span>
                    </label>
                    <input
                      name="category"
                      defaultValue={sell?.category}
                      placeholder="Category"
                      className="input input-bordered focus:outline-none w-full"
                      disabled
                    />
                  </div>
                  <div className="form-control w-full my-1">
                    <label className="label">
                      <span className="label-text">Product Code*</span>
                    </label>
                    <input
                      name="code"
                      defaultValue={sell?.productCode}
                      type="number"
                      placeholder="Product Code"
                      className="input input-bordered focus:outline-none w-full"
                      disabled
                    />
                  </div>
                </div>
                <button className="bg-[#403030] hover:bg-[#332626] w-full mt-5  text-white font-semibold py-2.5 rounded-md">
                  Add to Sell List
                </button>
              </form>
              {/* <button onClick={() => setOpenModal(false)} className="absolute top-0 right-0 p-2 mt-1 mr-1 btn btn-ghost btn-sm bg-gray-300">
                                <MdClose className="text-xl" />
                            </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
