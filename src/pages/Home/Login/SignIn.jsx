import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';
import useUserRoll from '../../../hooks/useUserRoll';


const SignIn = () => {
    const { signInUser, googleSignIn } = useAuth();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setError('');

        try {
            const user1 = await signInUser(email, password);
            console.log(user1.user.email);

            const loggedUser = await useUserRoll(user1.user.email);
            console.log(loggedUser);

            if (loggedUser === 'employee') {
                navigate('/employeeHome');
            } else if (loggedUser === 'admin') {
                navigate('/adminHome');
            } else {
                navigate('/');
            }

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully logged in",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error)
            })
    }



    return (
        <div className='font-Montserrat w-full'>
            {/* <Helmet>
                <title>JobsWorld | Login </title>
            </Helmet> */}
            <div className='bg-[#e5e4e4] w-full text-center py-12 text-[#403030] flex justify-center items-center'>
                <h1 className="text-4xl font-bold mt-10">Log In</h1>
            </div>
            <div className='flex md:bg-white bg-[#F3F3F3] items-center justify-center h-full py-8 rounded-lg'>
                <div className=' flex flex-col w-full md:w-[768px] '>
                    <div className='bg-[#F3F3F3]  py-[10%] px-[5%]  md:px-[15%]'>
                        <form onSubmit={handleLogin} className="">
                            <div className="form-control mb-4 flex justify-center">
                                <div className='absolute pl-2'></div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email" className="w-full bg-[#E7E6E6] placeholder-[#444444] py-4 rounded-lg border outline-none pl-8 pr-2"
                                    required />
                            </div>
                            <div className="form-control  relative flex justify-center">
                                <div className='absolute pl-2'></div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="w-full bg-[#E7E6E6] placeholder-[#444444] py-4 rounded-lg border outline-none pl-8 pr-2 " required />
                                <span className='absolute right-0 cursor-pointer mr-2' onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                    }
                                </span>
                            </div>
                            <div>
                                {
                                    error ? <p className='text-red-600'>{error}</p> : ''
                                }
                            </div>
                            {/* <div className='flex items-center justify-between mt-5'>
                                <div className=' flex items-center'>
                                    <input type="checkbox" name="checkbox" id="checkbox" className='cursor-pointer' />
                                    <label htmlFor="checkbox" className='font-semibold text-[#444444] ml-1 cursor-pointer'>Remember Me</label>
                                </div>
                                <div>
                                    <h4 className='text-right my-2 text-blue-600 cursor-pointer'>Forgot Password</h4>
                                </div>
                            </div> */}
                            <div className="form-control  mt-8">
                                <button className="text-xl rounded-md font-semibold  py-4 bg-[#444444] text-white hover:bg-[#292929] ">Sign In</button>
                            </div>

                            <div className='mt-7 text-center '>
                                <p>Do not have an account? <Link className='font-semibold text-[#6486FD]' to='/register'>Register Now</Link></p>
                            </div>
                        </form>
                    </div>
                    {/* PopUp componenets */}
                    {/* <div className='mb-3'>
                        <p className='text-center font-semibold mb-5 text-2xl'>Or Login with</p>
                        <div className='mt-2 rounded-full py-1 px-2 text-white flex justify-center items-center gap-4'>
                            <button onClick={handleGoogle} className='font-semibold p-2 flex items-center justify-center bg-slate-200 hover:bg-slate-300 rounded-full transition duration-300'>
                                <span className='lg:text-2xl text-base flex gap-3 justify-center items-center text-black w-full'><FaGoogle className='text-red-400'></FaGoogle ></span>
                            </button>
                            <button className='font-semibold p-2 flex items-center justify-center hover:bg-slate-300 transition duration-300 rounded-full bg-slate-200'>
                                <span className='lg:text-2xl text-base flex gap-3 justify-center items-center text-black w-full'><FaFacebook className='text-blue-500' /></span>
                            </button>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default SignIn;