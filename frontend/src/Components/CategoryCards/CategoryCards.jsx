import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";



const CategoryCards = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        name: ''
    });


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


    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.dismiss();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/categories`,
                { name: newCategory }
            );
            setCategories((prevCategories) => [...prevCategories, res.data]);
            setNewCategory('');
            toast.success("Added successfully")
            document.getElementById('my_modal_5').close();
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <div className='w-full'>
            <ToastContainer />
            <h1 className="text-[#5E5E5E] text-2xl font-bold">Account Head</h1>

            <div className="space-y-2 pt-5">
                {
                    categories.map((category) => (
                        <div key={category.id}
                            className="card w-[169px] h-[27px] bg-[#ECEDFA]
                             text-primary-content rounded-sm">
                            <p className="text-[#5E5E5E] font-semibold pl-4">{category.name}</p>
                        </div>
                    ))
                }
            </div>

            <button onClick={() => document.getElementById('my_modal_5').showModal()}
                className="pt-5 bg-transparent hover:bg-none text-[#2397C8]
                             ">
                Add Accounts Head
            </button>


            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#F4FAFC]">
                    <h3 className="font-bold text-lg">Add Account Head</h3>

                    <div className="modal-action flex flex-col">
                        <form
                            onSubmit={handleSubmit}
                            method="dialog" className="w-full">

                            <div className="form-control pb-5">

                                <input
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    type="text"
                                    name='name'
                                    placeholder="Type Name Here"
                                    className="input input-bordered px-2 rounded-sm" />
                            </div>

                            <button className="btn bg-[#2397C8] rounded-sm
                             hover:bg-[#2397C8] w-full text-white
                             text-xl">Add Head</button>

                        </form>


                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default CategoryCards;