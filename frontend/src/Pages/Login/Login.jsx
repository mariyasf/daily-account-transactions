import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiEye, FiEyeOff } from "react-icons/fi";


const Login = () => {
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="hero mt-[67px]">
            <div className="hero-content">

                <div className="card rounded-none bg-[#F4FAFC] border-t-4 border-t-[#2397C8] w-[414px] shrink-0">

                    <form className="card-body">
                        <div className=' text-xl'>
                            <h2 className='text-[#2397C8] font-semibold'>Welcome to PureLedger</h2>
                            <p className='text-[#9E9E9E] font-medium'>Please Login to continue</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Employee ID</span>
                            </label>
                            <input type="email" placeholder="Enter Employee ID here" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>

                            </label>
                            <span className='flex gap-2 items-center input input-bordered justify-between'>
                                <input
                                    type={showPass ? "text" : "password"}
                                    placeholder="Enter Password here"
                                    required />
                                <span
                                    className=" text-black text-xl"
                                    onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <FiEyeOff /> : <FiEye />}</span>
                            </span>
                        </div>
                        <div className="form-control mt-6">
                            <NavLink to={'/login'}>
                                <button className="btn bg-[#2397C8] hover:bg-[#2397C8] w-full text-white text-xl">Login</button>

                            </NavLink>
                        </div>
                        <div>
                            <p className='text-[#9E9E9E]'>
                                Don’t have an account? <span className='text-[#2397C8]'><Link to={'/register'}>Register Now!</Link></span>
                            </p>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;