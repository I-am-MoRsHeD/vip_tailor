import React from "react";
import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import DashBoardTitle from "../../components/dashboardTitle/DashBoardTitle";
import { useQuery } from "@tanstack/react-query";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSITNG_KEY;
const image_hosing_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: categories = [], refetch } = useQuery({
    queryKey: ["categoryData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  const onSubmit = (data) => {
    // sending image to the imageBB if provided
    if (data.image && data.image.length > 0) {
      const imageFile = { image: data.image[0] };
      axiosPublic
        .post(image_hosing_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);

          // product data send to database
          const productDetails = {
            name: data?.name,
            quantity: data?.quantity,
            category: data?.category,
            productCode: data?.code,
            image: res?.data?.data?.display_url,
            sellingDate: data?.date,
            price: data?.price,
            status: "pending",
            email: user?.email,
          };

          // product added to the server
          axiosPublic.post("/sellProduct", productDetails).then((res) => {
            console.log(res);
            if (res.data.message === "success") {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product added successfully",
                showConfirmButton: false,
                timer: 1500,
                imageUrl: "https://unsplash.it/400/200",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
              });
            } else {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Product Code has already been taken",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        });
    } else {
      // If no image provided, proceed to submit the product details without image
      const productDetails = {
        name: data?.name,
        quantity: data?.quantity,
        category: data?.category,
        productCode: data?.code,
        image: "https://i.ibb.co/ZBbb1JH/blank-profile-picture.png",
        sellingDate: data?.date,
        price: data?.price,
        status: "pending",
        email: user?.email,
      };

      // product added to the server
      axiosPublic.post("/sellProduct", productDetails).then((res) => {
        console.log(res);
        if (res.data.message === "success") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Product Code has already been taken",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <>
      <div className="lg:ml-3 xl:ml-9 overflow-scroll 2xl:h-[80vh] xl:h-[85vh] mx-3 lg:mx-0 rounded-lg">
        <div className="mb-2">
          <DashBoardTitle
            title={"Admin"}
            subTitle={"Add, Edit your category section in one click. "}
          />
        </div>
        {/* form container */}
        <div className="mt-2 p-2 bg-white rounded-md 2xl:h-[66vh]">
          <SectionTitle
            title="Add Products"
            // descrition="Welcome to our showcase selections, where uniqueness meets quality."
          />
          <div className="md:w-5/6 mx-auto w-full md:p-5 ">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
                {/* Product Name */}
                <div className="form-control w-full my-1">
                  {/* <label className="label">
                    <span className="label-text">Product Name*</span>
                  </label> */}
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Product Name"
                    className="input input-bordered w-full focus:outline-none bg-[#F0F2F5]"
                  />
                  {errors.name && (
                    <span className="text-red-500">
                      Product Name is required
                    </span>
                  )}
                </div>
                {/* Quantity */}
                <div className="form-control w-full my-1">
                  {/* <label className="label">
                    <span className="label-text">Quantity*</span>
                  </label> */}
                  <input
                    {...register("quantity", { required: true })}
                    type="number"
                    placeholder="Quantity"
                    className="input input-bordered w-full focus:outline-none bg-[#F0F2F5]"
                  />
                  {errors.quantity && (
                    <span className="text-red-500">Quantity is required</span>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
                {/* price */}
                <div className="form-control w-full my-1">
                  {/* <label className="label">
                    <span className="label-text">Price*</span>
                  </label> */}
                  <input
                    {...register("price", { required: true })}
                    type="number"
                    placeholder="Price"
                    className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                  />
                  {errors.price && (
                    <span className="text-red-500">Price is required</span>
                  )}
                </div>
                {/* Date */}
                <div className="form-control w-full my-1">
                  {/* <label className="label">
                    <span className="label-text">Date(mm/dd/yyyy)*</span>
                  </label> */}
                  <input
                    {...register("date", { required: true })}
                    type="date"
                    placeholder="Date"
                    className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                  />
                  {errors.date && (
                    <span className="text-red-500">Date is required</span>
                  )}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
                {/* category */}
                <div className="form-control w-full my-1">
                  {/* <label className="label">
                    <span className="label-text">Category*</span>
                  </label> */}
                  {/* <select
                    defaultValue="default"
                    {...register("category", { required: true })}
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
                  </select>
                  {errors.category && (
                    <span className="text-red-500">Category is required</span>
                  )} */}
                  <select
                    className="select select-bordered w-full focus:outline-none bg-[#F0F2F5]"
                    // onChange={(e) => handleCategory(e.target.value)}
                    {...register("category", { required: true })}
                    // value={filter}
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
                    {...register("code", { required: true })}
                    type="number"
                    placeholder="Product Code"
                    className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                  />
                  {errors.code && (
                    <span className="text-red-500">
                      Product Code is required
                    </span>
                  )}
                </div>
              </div>
              {/* Image */}
              {/* <div className="form-control w-full my-1">
            <label className="label">
              <span className="label-text">Image URL*</span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              placeholder="Select Image"
              className="input input-bordered focus:outline-none w-full"
            />
            {errors.image && (
              <span className="text-red-500">Image is required</span>
            )}
          </div> */}
              <div className="form-control w-full my-1 relative border-2 border-dotted border-gray-600 rounded-lg">
                <div className="input_field  text-center">
                  <label className="label flex flex-col justify-center items-center ">
                    <input
                      {...register("image", { required: false })}
                      type="file"
                      // placeholder="Select Image"
                      className="text-sm cursor-pointer w-52 hidden"
                    />
                    <div className=" cursor-pointer px-3">
                      <svg
                        className="text-[#403030] w-10 mx-auto mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div className="title"> Drag or Upload File</div>
                  </label>
                </div>
              </div>
              <button className="focus:outline-none focus:ring-2 w-full mt-5 focus:border-transparent bg-[#403030] hover:bg-[#221919] text-white font-semibold py-2.5 rounded-md">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
