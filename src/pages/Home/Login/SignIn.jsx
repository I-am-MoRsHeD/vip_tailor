import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useUserRoll from "../../../hooks/useUserRoll";
import { getToken } from "../../../components/authApi/AuthApi";

const SignIn = () => {
  const { signInUser, googleSignIn } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const rememberCheck = useRef(null);
  const [email, setEmail] = useState(localStorage.getItem("myapp-email") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("myapp-password") || ""
  );

  useEffect(() => {
    if (email && password) {
      rememberCheck.current.checked = true;
    }
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const userCheck = await signInUser(email, password);
      // console.log(userCheck.user.email);
      await getToken(userCheck?.user?.email);
      const loggedUser = await useUserRoll(userCheck?.user?.email);
      navigate(loggedUser === "admin" ? "/adminHome" : "/");

      if (rememberCheck.current.checked) {
        localStorage.setItem("myapp-email", email);
        localStorage.setItem("myapp-password", password);
      } else {
        localStorage.removeItem("myapp-email");
        localStorage.removeItem("myapp-password");
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  // const handleGoogle = async () => {
  //   try {
  //     const result = await googleSignIn();
  //     console.log(result.user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="font-Montserrat w-full">
      <div className="bg-[#e5e4e4] text-center mt-12 md:mt-20 lg:mt-16 py-3 md:py-10 w-full text-[#403030] flex justify-center items-center">
        <h1 className="lg:text-4xl text-2xl font-bold">Log In</h1>
      </div>
      <div className="flex md:bg-white bg-[#F3F3F3] items-center justify-center h-full py-8 rounded-lg">
        <div className="flex flex-col w-full md:w-[768px]">
          <div className="bg-[#F3F3F3] py-[10%] px-[5%] md:px-[15%]">
            <form onSubmit={handleLogin}>
              <div className="form-control mb-4 flex justify-center">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-[#E7E6E6] placeholder-[#444444] py-4 rounded-lg border outline-none pl-8 pr-2"
                  required
                />
              </div>
              <div className="form-control relative flex justify-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[#E7E6E6] placeholder-[#444444] py-4 rounded-lg border outline-none pl-8 pr-2"
                  required
                />
                <span
                  className="absolute right-0 cursor-pointer mr-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    ref={rememberCheck}
                    id="rememberMe"
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="font-semibold text-[#444444] ml-1 cursor-pointer"
                  >
                    Remember Me
                  </label>
                </div>
                <Link className="text-blue-600" to="/forgetpassword">
                  Forgot Password
                </Link>
              </div>
              <div className="form-control mt-8">
                <button className="text-xl rounded-md font-semibold py-4 bg-[#444444] text-white hover:bg-[#292929]">
                  Sign In
                </button>
              </div>
              <div className="mt-7 text-center">
                <p>
                  Do not have an account?{" "}
                  <Link className="font-semibold text-[#6486FD]" to="/register">
                    Register Now
                  </Link>
                </p>
                <p>
                  Forgot your password?{" "}
                  <Link
                    className="font-semibold text-[#6486FD]"
                    to="/forgetpassword"
                  >
                    Reset Password
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="mb-3">
            <p className="text-center font-semibold mb-5 text-2xl">
              Or Login with
            </p>
            <div className="mt-2 py-1 px-2 flex justify-center items-center gap-4">
              <button className="flex items-center justify-center p-2 bg-slate-200 hover:bg-slate-300 rounded-full transition duration-300">
                <FaGoogle className="text-red-400 text-2xl" />
              </button>
              <button className="flex items-center justify-center p-2 bg-slate-200 hover:bg-slate-300 rounded-full transition duration-300">
                <FaFacebook className="text-blue-500 text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
