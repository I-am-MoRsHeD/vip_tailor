import { IoPersonOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import "./Navbar2.css";
import { clearToken } from "../../components/authApi/AuthApi";

const Navbar2 = () => {
  const { logOut, setValue, value } = useAuth();
  const [filteredProducts, setFilteredProducts] = useState();
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleLogout = async () => {
    console.log("attack");
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log Out!",
      });

      if (result.isConfirmed) {
        await logOut();
        clearToken();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully logged out",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while logging out.",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar-container");
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add("navbar-fixed");
        } else {
          navbar.classList.remove("navbar-fixed");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full bg-[#403030] border-b-2 border-gray-400">
      <div className="flex flex-row justify-between py-3 3xl:w-[76%] 2xl:w-[74%] 2xl:mx-auto mx-3">
        <div className="w-44 md:w-[600px] lg:w-[700px]">
          <h2 className="text-white font-bold text-lg">VIP TAILORS</h2>
        </div>
        <div className="">
          <button
            onClick={handleLogout}
            className="lg:bg-white whitespace-nowrap mb-2 lg:mb-0 bg-yellow-950 lg:text-black text-white text-base lg:text-lg font-semibold px-2 py-1 rounded flex items-center justify-center gap-1"
          >
            <IoPersonOutline className="text-xl" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
