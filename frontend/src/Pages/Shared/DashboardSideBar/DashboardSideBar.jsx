import { GoHome } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { IoVideocamOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const DashboardSideBar = () => {
    return (
        <div
            className=" h-full  w-[275px] bg-[#E4F2F8]"
        >
            <h3
                className="px-6 my-5 text-lg font-semibold text-[#2397C8]"

            >
                Accounting
            </h3>
            <ul className="pl-6">
                <li>

                    <Link to="/" className="w-full">
                        <div className="flex justify-between  items-center gap-2 p-3 cursor-pointer hover:bg-[#2397C81A]
                     hover:text-[#2397C8] hover:border-[#2397C8] hover:border-0 hover:border-s-8">
                            <div className="flex items-center gap-2">
                                <GoHome className="text-2xl" />

                                Dashboard

                            </div>
                            <IoIosArrowForward />
                        </div>
                    </Link>

                </li>
                <li>
                    <Link to="/accounting">
                        <div className="flex justify-between  items-center gap-2 p-3 cursor-pointer hover:bg-[#2397C81A]
                     hover:text-[#2397C8] hover:border-[#2397C8] hover:border-0 hover:border-s-8">
                            <div className="flex items-center gap-2">
                                <IoVideocamOutline className="text-2xl" />

                                Accounting
                            </div>
                            <IoIosArrowForward />
                        </div>
                    </Link>
                </li>
                <li>


                    <Link to="/report">
                        <div className="flex justify-between  items-center gap-2 p-3 cursor-pointer hover:bg-[#2397C81A]
                     hover:text-[#2397C8] hover:border-[#2397C8] hover:border-0 hover:border-s-8">
                            <div className="flex items-center gap-2">
                                <FaEdit className="text-xl" />

                                Reports

                            </div>
                            <IoIosArrowForward />
                        </div>
                    </Link>
                </li>


            </ul>
        </div>
    );
};

export default DashboardSideBar;