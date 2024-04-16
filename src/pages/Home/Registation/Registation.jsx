
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { updateProfile } from "@firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSITNG_KEY;
const image_hosing_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Registation = () => {
    const { createUser, googleSignIn } = useAuth();
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const hanldeRegister = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // const image = form.image.value;

        const userInfo = {
            name: form.name.value,
            email: form.email.value,
            role: "user"
        }
        console.log(userInfo)

        setError('');

        createUser(email, password)
            .then(result => {
                console.log(result.user)

                // updated user profile
                updateProfile(result?.user, {
                    displayName: form.name.value,
                    photoURL: "https://i.ibb.co/wzY7xRG/bronze.png"
                });

                // insert user data to the database
                axiosPublic.post('/user', userInfo)
                    .then(res => {
                        if (res.data.message === "Success") {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Successfully registered",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/message')
                        }
                    })
            })
            .catch(error => {
                setError(error.message)
            })
    }

    // google sign in
    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName,
                    role: "user"
                }
                axiosPublic.post('/user', userInfo)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.message === "Success") {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Successfully registered",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
                        }
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div className=' font-Montserrat w-full'>
            <div className='bg-[#e5e4e4] w-full text-center py-12 text-[#403030] flex justify-center items-center'>
                <h1 className="text-4xl font-bold mt-10">Register Now</h1>
            </div>
            <div className="flex md:bg-white bg-[#F3F3F3] items-center justify-center h-full py-8 rounded-lg">
                <div className='flex flex-col w-full md:w-[768px] '>
                    <div className='bg-[#F3F3F3]  py-[10%] px-[5%] md:px-[15%]'>
                        <form onSubmit={hanldeRegister} className='flex flex-col gap-4 mt-2'>
                            <div className='flex justify-center  flex-row gap-4 items-center relative'>
                                <input type="text" placeholder='Full Name'
                                    name='name'
                                    className='w-full py-4 bg-[#E7E6E6] placeholder-[#444444] rounded-lg border outline-none pl-8 pr-2'
                                />
                            </div>
                            <div className='flex justify-center flex-col items-center relative'>
                                <input type="text" placeholder='Email' name='email'
                                    className='w-full bg-[#E7E6E6] placeholder-[#444444] py-4 rounded-lg border outline-none pl-8 pr-2'
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center relative'>
                                <input
                                    type={showPassword ? "text" : "password"} placeholder='Password' name='password'
                                    className='w-full py-4 bg-[#E7E6E6] placeholder-[#444444] rounded-lg border outline-none pl-8 pr-2'
                                />
                                <span className='absolute right-0 cursor-pointer mr-2' onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                    }
                                </span>
                            </div>
                            {/* <div className='flex flex-col items-center justify-center relative'>
                            <input type="file" placeholder='' name='image'
                                className='input input-bordered focus:outline-none w-full py-2'
                            />
                        </div> */}

                            {/* <div className='px-1 mt-3 flex flex-row justify-between items-center'>
                                <div className="flex text-sm md:text-base gap-2">
                                    <input type="checkbox" name="checkbox" id="checkbox" className='cursor-pointer' />
                                    <label htmlFor="checkbox" className='flex gap-2 cursor-pointer text-black'>Remember me</label>
                                </div>
                                <div>
                                    <h4 className='text-right text-sm md:text-base my-2 text-[#6486FD] cursor-pointer'>Forgot Password</h4>
                                </div>
                            </div> */}
                            <div className="px-[16%] flex gap-2">
                                {
                                    error ? <p className='text-red-600'>{error}</p> : ''
                                }
                            </div>
                            <div className='flex justify-center text-xl font-semibold text-white font-Montserrat'>
                                <button className='w-full py-4 bg-[#444444] text-white hover:bg-[#303030] rounded-lg'>Sign Up</button>
                            </div>
                        </form>
                        <div className=' mt-10 flex items-center justify-center '>
                            <h4 className='flex gap-2  '>Already have an account? <Link to={"/login"} className='text-[#6486FD] font-semibold cursor-pointer'>Log In</Link></h4>
                        </div>
                        {/* <div className=''>
                        <h3 className='text-center mt-8 orContinueWith'>Or Continue With</h3>
                    </div> */}
                        {/* <div className='flex justify-center gap-6 mt-6'>
                        <button onClick={handleGoogle} className='border flex items-center gap-2 text-xl px-7 hover:border-[#000] transition-all duration-300 border-[#c3c3c3] rounded-lg py-3 font-mono'><FcGoogle className='text-2xl' /> Google</button>
                        <button className='border flex items-center gap-2 text-xl border-[#c3c3c3] hover:border-[#000] transition-all duration-300 rounded-lg px-4 py-3 font-mono'><FaSquareFacebook className='text-2xl text-blue-700' /> Facebook</button>
                    </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registation
