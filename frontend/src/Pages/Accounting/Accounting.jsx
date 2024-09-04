import React, { useState } from 'react';

import CategoryCards from '../../Components/CategoryCards/CategoryCards';
import CategoryForm from '../../Components/CategoryForm/CategoryForm';


const categories = [
    "Transportation",
    "Office Management",
    "Courier Cost",
    "Stationary",
    "Food"
];

const Accounting = () => {



    return (
        <div className="bg-gray-100 card rounded-lg max-w-[742px] mx-auto">
            <div className="flex justify-between flex-col lg:flex-row 
              gap-2 card-body">

                <CategoryForm />

                <div className="hidden lg:block border m-10"></div>


                <CategoryCards />

            </div>
        </div>
    );
};

export default Accounting;