import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar bg-[#2397C8] px-[46px] ">
            <div className="flex-1">
                <a className="text-white text-2xl">Pure <br /> <span className='font-bold'>Ledger.</span></a>
            </div>
            <div className="flex-none">
                <button className="btn font-medium text-white bg-transparent hover:bg-transparent border-2">
                    Login
                </button>
            </div>
        </div>
    );
};

export default Navbar;