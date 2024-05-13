import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { clearToken } from "../../components/authApi/AuthApi";

const Navbar = () => {
  const { logOut, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAnchorClick = (e, target) => {
    e.preventDefault();
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
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

  const navlinks = (
    <>
      <li className="">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "active text-[#fff]" : "lg:text-[#fff] text-black"
            } duration-300 text-base lg:text-lg font-semibold  transition navs`
          }
        >
          Home
        </NavLink>
      </li>

      <li className="">
        <a
          onClick={(e) => handleAnchorClick(e, "featured")}
          className="lg:text-[#fff] text-black duration-300 text-base lg:text-lg font-semibold transition navs cursor-pointer"
        >
          Featured Products
        </a>
      </li>
      <li className="">
        <a
          onClick={(e) => handleAnchorClick(e, "notice")}
          className="lg:text-[#fff] text-black duration-300 text-base lg:text-lg font-semibold  transition navs cursor-pointer"
        >
          Notice Board
        </a>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${
              isActive ? "active text-[#fff]" : "lg:text-[#fff] text-black"
            } duration-300 text-base lg:text-lg font-semibold mr-10 transition navs mb-2 lg:mb-2`
          }
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        {user ? (
          <button
            onClick={handleLogout}
            className="lg:bg-white mb-2 lg:mb-0 bg-yellow-950 lg:text-black text-white text-base lg:text-lg font-semibold px-2 py-1 rounded "
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="lg:bg-white mb-2 lg:mb-0 bg-yellow-950 lg:text-black text-white text-base lg:text-lg font-semibold px-2 py-1 rounded"
          >
            Log in
          </Link>
        )}
      </li>
      <li>
        {!user ? (
          <Link
            to="/register"
            className="lg:bg-white bg-yellow-950 lg:text-black text-white text-base lg:text-lg font-semibold px-2 py-1 rounded "
          >
            Registration
          </Link>
        ) : (
          ""
        )}
      </li>
    </>
  );
  // const handleLogout = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Logged Out!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       logOut().then(() => {
  //         Swal.fire({
  //           position: "top-end",
  //           icon: "success",
  //           title: "Successfully logged out",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //         navigate("/");
  //       });
  //     }
  //   });
  // };

  return (
    <div
      className={`max-w-screen z-10 fixed top-0 mx-auto left-0 right-0  ${
        isScrolled ? "bg-[#403030] shadow-sm shadow-black" : "bg-[#403030]"
      }`}
    >
      <div className="max-w-[1280px] w-full mx-auto">
        <div className="navbar flex flex-row justify-between">
          <div className="">
            <div className="dropdown md:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost text-white lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm text-black dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navlinks}
              </ul>
            </div>
            <a className="text-white lg:text-[1.3rem] ml-16 font-semibold md:ml-0">
              VIP TAIRLORS
            </a>
          </div>
          <div className="">
            <ul className="hidden md:flex items-center gap-8">{navlinks}</ul>
            {/* <div>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-white text-black font-semibold px-2 py-1 rounded "
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-white text-black font-semibold px-2 py-1 rounded"
                >
                  Log in
                </Link>
              )}
            </div> */}

            {/* <Link
              to="/register"
              className="bg-white text-black font-semibold px-2 py-1 rounded ml-3"
            >
              Create an account
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
