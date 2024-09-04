import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from 'react-toastify';


const CategoryForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const eID = localStorage.getItem('eID');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
                setCategories(res.data);
            }
            catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // console.log(categories, categories.length);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const dob = startDate.toISOString().split('T')[0];;
        const account = form.get('account');
        const head = form.get('head');
        const amount = form.get('amount');

        const dataInfo = {
            eID,
            dob,
            account,
            head,
            amount
        }

        console.log(dataInfo);

        toast.dismiss();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/add-accounting`, dataInfo);
            console.log('Success:', res.data);
            toast.success('Accounting entry added successfully!');

            // Optionally reset the form or give feedback to the user
        } catch (error) {
            console.error('Error adding accounting entry:', error);
        }

    }

    return (
        <div className='w-full'>
            <ToastContainer />
            <form
                onSubmit={handleSubmit}
                className="text-[#979797] space-y-5"
            >
                <div className='text-xl'>
                    <h1 className=" text-2xl font-bold">Add Accounting</h1>

                </div>
                <div className="form-control">

                    <DatePicker
                        name='dob'
                        className="flex-1 flex items-center justify-center w-full h-[48px] px-2  py-5 rounded-sm"
                        placeholderText='Date Of Birth'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                    />

                </div>
                <div className="form-control flex flex-col md:flex-row gap-2 justify-between">

                    <select id="account"
                        name='account'
                        className="flex-1 h-[48px]  w-full px-2 rounded-sm"
                    >
                        <option value="" id="">Account Type</option>
                        <option value="1" id="">Credit</option>
                        <option value="2" id="">Debit</option>
                    </select>
                </div>

                <div className="form-control flex flex-col md:flex-row gap-2 justify-between">

                    <select id="head"
                        name='head'
                        className="flex-1 h-[48px]  w-full px-2 rounded-sm"
                    >
                        <option value="" id="">Choose Head</option>
                        {categories.map((category, index) => (
                            <option key={category.id} value={category.id} id="">{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-control">

                    <input type="text"
                        name='amount'
                        placeholder="Amount"
                        className="input input-bordered px-2 rounded-sm" required />
                </div>


                <div className="form-control mt-6">
                    <button className="btn bg-[#2397C8] rounded-sm
                             hover:bg-[#2397C8] w-full text-white
                             text-xl">Submit</button>
                </div>


            </form>

        </div>

    );
};

export default CategoryForm;