import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Provider/AuthProvider';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const eID = localStorage.getItem('eID');
    // console.log(eID);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="navbar bg-[#2397C8] px-[46px] ">
            <div className="flex-1">
                <a className="text-white text-2xl">Pure <br /> <span className='font-bold'>Ledger.</span></a>
            </div>
            <div className="flex-none">


                {isAuthenticated ? (

                    <>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul tabIndex={0}
                                className="dropdown-content text-[#2397C8] py-4 space-y-4
                                              shadow bg-[#E4F2F8]
                                              rounded-xl w-52">

                                <NavLink to={'/profile'}>
                                    <li className='w-full px-4'>
                                        Profile
                                    </li>
                                </NavLink>


                                <li className='w-full px-4'>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </>

                ) : (
                    <NavLink to={'/login'}>
                        <button className="btn font-medium text-white bg-transparent hover:bg-transparent border-2">
                            Login
                        </button>
                    </NavLink>
                )}

            </div>
        </div>
    );
};

export default Navbar;