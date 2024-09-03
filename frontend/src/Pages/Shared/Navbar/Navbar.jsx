import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-[#2397C8] px-[46px] ">
            <div className="flex-1">
                <a className="text-white text-2xl">Pure <br /> <span className='font-bold'>Ledger.</span></a>
            </div>
            <div className="flex-none">
                <NavLink to={'/login'}>
                    <button className="btn font-medium text-white bg-transparent hover:bg-transparent border-2">
                        Login
                    </button>
                </NavLink>

            </div>
        </div>
    );
};

export default Navbar;