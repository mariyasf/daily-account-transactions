import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const eID = localStorage.getItem('eID');
    const [user, setUser] = useState([]);


    useEffect(() => {
        const fetchUserData = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${eID}`);
            // console.log(response);
            setUser(res.data);
        };

        fetchUserData();
    }, [eID])



    // console.log(user.fullName); //object

    const {
        fullName,
        gender,
        dob,
        email,
        position,
        password
    }
        = user || {}

    return (
        <div>
            <div className=" text-xl font-bold">
                <h3 className="text-[#494949]">Profile Information</h3>
            </div>
            <div className="max-w-xl mx-auto space-y-2 h-screen justify-center">

                <div className="avatar flex mx-auto">
                    <div className="w-24 mx-auto rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>

                <div >
                    <p className="text-xl text-[#3E3E3E80]">Full Name</p>
                    <h3 className="font-bold text-[#06050580]">{user.fullName}</h3>
                </div>

                <div >
                    <p className="text-xl text-[#3E3E3E80]">Position</p>
                    <h3 className="font-bold text-[#06050580]">{user.position}</h3>
                </div>

                <div >
                    <p className="text-xl text-[#3E3E3E80]">Gender</p>
                    <h3 className="font-bold text-[#06050580]">{user.gender}</h3>
                </div>

                <div >
                    <p className="text-xl text-[#3E3E3E80]">Date Of Birth</p>
                    <h3 className="font-bold text-[#06050580]">{user.dob}</h3>
                </div>

                <div >
                    <p className="text-xl text-[#3E3E3E80]">Email</p>
                    <h3 className="font-bold text-[#06050580]">{user.email}</h3>
                </div>

                <div >
                    <p className="text-xl text-[#3E3E3E80]">Employee ID</p>
                    <h3 className="font-bold text-[#06050580]">{user.eID}</h3>
                </div>


            </div>
        </div>
    );
};

export default Profile;