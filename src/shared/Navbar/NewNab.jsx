import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { IoIosCloseCircle } from "react-icons/io";
const NewNav = () => {
  const { logOut, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logged Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully logged out",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      }
    });
  };

  //   const navlinks = (
  //     <>
  //       <li>
  //         <button
  //           onClick={() => setIsMenuOpen(false)}
  //           className=" text-white md:text-black  text-2xl float-end font-semibold md:hidden"
  //         >
  //           <IoIosCloseCircle />
  //         </button>
  //       </li>
  //       <li className="">
  //         <NavLink
  //           to="/"
  //           className={({ isActive }) =>
  //             `${
  //               isActive
  //                 ? "active md:text-[#000] text-white"
  //                 : "lg:text-[#fff] text-white md:text-black "
  //             } duration-300 text-base lg:text-lg font-semibold  transition navs`
  //           }
  //         >
  //           Home
  //         </NavLink>
  //       </li>

  //       <li className="">
  //         <a
  //           onClick={(e) =>
  //             handleAnchorClick(e, "featured", setIsMenuOpen(false))
  //           }
  //           className="lg:text-[#fff] md:text-black text-white duration-300 text-base lg:text-lg font-semibold transition navs cursor-pointer"
  //         >
  //           Featured Products
  //         </a>
  //       </li>
  //       <li className="">
  //         <a
  //           onClick={(e) => handleAnchorClick(e, "notice", setIsMenuOpen(false))}
  //           className="lg:text-[#fff] text-white md:text-black duration-300 text-base lg:text-lg font-semibold  transition navs cursor-pointer"
  //         >
  //           Notice Board
  //         </a>
  //       </li>

  //       <li>
  //         <NavLink
  //           to="/contact"
  //           className={({ isActive }) =>
  //             `${
  //               isActive
  //                 ? "active text-[#fff]"
  //                 : "lg:text-[#fff] text-white md:text-black "
  //             } duration-300 text-base lg:text-lg font-semibold mr-0 md:mr-10 transition navs mb-2 lg:mb-2`
  //           }
  //         >
  //           Contact Us
  //         </NavLink>
  //       </li>
  //       <li>
  //         {user ? (
  //           <button
  //             onClick={handleLogout}
  //             className="lg:bg-white mb-2 lg:mb-0 bg-yellow-950  text-white text-base lg:text-lg font-semibold px-2 py-1 rounded "
  //           >
  //             Logout
  //           </button>
  //         ) : (
  //           <Link
  //             to="/login"
  //             className="lg:bg-white mb-2 lg:mb-0 bg-yellow-950  text-white text-base lg:text-lg font-semibold px-2 py-1 rounded"
  //           >
  //             Log in
  //           </Link>
  //         )}
  //       </li>
  //       <li>
  //         {!user ? (
  //           <Link
  //             to="/register"
  //             className="lg:bg-white bg-yellow-950  text-white text-base lg:text-lg font-semibold px-2 py-1 rounded "
  //           >
  //             Registration
  //           </Link>
  //         ) : (
  //           ""
  //         )}
  //       </li>
  //     </>
  //   );
  const navlinks = (
    <>
      <li>
        <button
          onClick={() => setIsMenuOpen(false)}
          className=" text-white text-2xl float-end font-semibold lg:hidden"
        >
          <IoIosCloseCircle />
        </button>
      </li>
      <li className="">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "active text-[#fff]" : "text-[#fff]"
            }  transition navs duration-300 text-base lg:text-lg font-semibold `
          }
        >
          Home
        </NavLink>
      </li>

      <li className="">
        <a
          onClick={(e) => handleAnchorClick(e, "featured")}
          className="text-[#fff] duration-300 text-base lg:text-lg font-semibold transition navs cursor-pointer"
        >
          Featured Products
        </a>
      </li>
      <li className="">
        <a
          onClick={(e) => handleAnchorClick(e, "notice")}
          className="text-[#fff] duration-300 text-base lg:text-lg font-semibold  transition navs cursor-pointer"
        >
          Notice Board
        </a>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${
              isActive ? "active text-[#fff]" : "text-[#fff]"
            } duration-300 text-base lg:text-lg font-semibold lg:mr-10 mr-0 transition navs mb-2 lg:mb-2`
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
  return (
    <div
      className={`max-w-screen z-10 fixed top-0 left-0 md:py-4 py-0 right-0 ${
        isScrolled ? "bg-[#403030] shadow-sm" : "bg-[#403030]"
      }`}
    >
      <div className="max-w-[1280px] w-full mx-auto">
        <div className="flex flex-row justify-between w-full">
          <div className="flex items-center justify-center lg:hidden">
            <div className="lg:hidden relative">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost text-white lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                className={`text-white absolute md:-top-4 top-0 left-0 right-0 w-[100vw]  transition-all duration-500 flex flex-col items-center text-center gap-5 hero-overlay ${
                  isMenuOpen
                    ? "opacity-100 visible h-screen"
                    : "opacity-0 invisible h-0"
                } bg-opacity-90 bg-black py-4 shadow`}
              >
                {navlinks}
              </ul>
            </div>
            <a className="text-white lg:text-[1.3rem] font-semibold md:ml-0 mr-4">
              VIP TAIRLORS
            </a>
          </div>
          <div className="my-auto">
            <a className="text-white lg:text-[1.3rem] font-semibold hidden lg:block text-center">
              VIP TAIRLORS
            </a>
          </div>
          <div className="hidden lg:block">
            <ul className="hidden md:flex items-center gap-8">{navlinks}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNav;
