import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const fullName = form.get('fullName');
        const gender = form.get('gender');
        const dob = form.get('dob');
        const email = form.get('email');
        const eID = form.get('eID');
        const position = form.get('position');
        const password = form.get('password');

        const dataInfo = {
            fullName,
            gender,
            dob,
            email,
            eID,
            position,
            password
        }
        // console.log(dataInfo);

        toast.dismiss();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, dataInfo)
            console.log(res);

            toast.success('Registration successful! You can now log in.');

            if (res.status === 201) {
                navigate('/profile');
            }
        }
        catch (err) {
            console.log(err);
            toast.error('Registration failed. Please try again later.');
        }





    }
    return (
        <div className="hero">
            <ToastContainer />
            <div className="hero-content">

                <div className="card rounded-none bg-[#F4FAFC] border-t-4 border-t-[#2397C8] w-[414px] shrink-0">

                    <form
                        onSubmit={handleRegister}
                        className="card-body space-y-2"
                    >
                        <div className=' text-xl'>
                            <h2 className='text-[#2397C8] font-semibold'>Welcome to PureLedger</h2>
                            <p className='text-[#9E9E9E] font-medium'>Fill up this form to Register</p>
                        </div>
                       
                        <div className="form-control">

                            <input type="text"
                                name='fullName'
                                placeholder="Full Name"
                                className="input input-bordered" required />
                        </div>
                        
                        <div className="form-control flex flex-col md:flex-row gap-2 justify-between">

                            <select id="gender"
                                name='gender'
                                className="flex-1 h-[48px]  w-full rounded-xl"
                            >
                                <option value="Gender" id="">Gender</option>
                                <option value="Male" id="">Male</option>
                                <option value="Female" id="">Female</option>
                                <option value="Other" id="">Other</option>
                            </select>

                            <DatePicker
                                name='dob'
                                className="flex-1 flex items-center justify-center w-full h-[48px]  py-5 rounded-xl"
                                placeholderText='Date Of Birth'
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}

                            />

                        </div>

                        <div className="form-control">

                            <input type="email"
                                name='email'
                                placeholder="Email"
                                className="input input-bordered" required />
                        </div>
                        <div className="form-control">

                            <input
                                type="text"
                                name='eID'
                                placeholder="Employee ID"
                                className="input input-bordered" required />
                        </div>
                        <div className="form-control">

                            <input type="text"
                                name='position'
                                placeholder="Position In Organization"
                                className="input input-bordered" required />
                        </div>
                        <div className="form-control">

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
                            <button className="btn bg-[#2397C8]
                             hover:bg-[#2397C8] w-full text-white
                             text-xl">Register</button>
                        </div>
                        <div>
                            <p className='text-[#9E9E9E]'>
                                Already have an account? <span className='text-[#2397C8]'><Link to={'/login'}>Login Now!</Link></span>
                            </p>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Register;