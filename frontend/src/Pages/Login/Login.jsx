import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from 'react-toastify';
import axios from 'axios';


const Login = () => {
    const [showPass, setShowPass] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const eID = form.get('eID');
        const password = form.get('password');

        const dataInfo = {
            eID,
            password
        }
        console.log(dataInfo);

        toast.dismiss();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, dataInfo)
            console.log(res);

            if (res.status === 201) {
                toast.success('Login successful! You can now log in.');
                navigate('/')
                e.target.reset();
            }
        }
        catch (err) {
            console.log(err);
            toast.error('Login failed. Please try again later.');
        }



    }


    return (
        <div className="hero mt-[67px]">
            <div className="hero-content">

                <div className="card rounded-none bg-[#F4FAFC] border-t-4 border-t-[#2397C8] w-[414px] shrink-0">

                    <form
                        className="card-body"
                        onSubmit={handleLogin}>

                        <div className=' text-xl'>
                            <h2 className='text-[#2397C8] font-semibold'>Welcome to PureLedger</h2>
                            <p className='text-[#9E9E9E] font-medium'>Please Login to continue</p>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Employee ID</span>
                            </label>
                            <input type="text"
                                name='eID'
                                placeholder="Enter Employee ID here" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>

                            </label>
                            <span className='flex gap-2 items-center input input-bordered justify-between'>
                                <input
                                    name='password'
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

                            <button className="btn bg-[#2397C8] hover:bg-[#2397C8] w-full text-white text-xl">Login</button>

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