import React from 'react';

const MonthlyExpense = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="card rounded-lg w-96 bg-[#F6DBDB]">
                <div className="flex flex-col gap-8 card-body">
                    <h2 className="flex justify-end text-3xl font-bold text-[#FF5F5F] 
                    ">
                        20,700 Taka
                    </h2>
                    <div className="flex flex-col justify-start gap-1 card-actions">
                        <h3 className="text-xl font-medium text-[#868686]">Total Debit</h3>
                        <p className='text-[#5E5E5E]'>This month</p>
                    </div>
                </div>
            </div>
            <div className="card rounded-lg w-96 bg-[#E0F6DB]">
                <div className="flex flex-col gap-8 card-body">
                    <h2 className="flex justify-end text-3xl font-bold text-[#21DF10] 
                    ">
                        31,700 TK
                    </h2>
                    <div className="flex flex-col justify-start gap-1 card-actions">
                        <h3 className="text-xl font-medium text-[#868686]">Total Credit</h3>
                        <p className='text-[#5E5E5E]'>This month</p>
                    </div>
                </div>
            </div>
            <div className="card rounded-lg w-96 bg-[#F6EBDB]">
                <div className="flex flex-col gap-8 card-body">
                    <h2 className="flex justify-end text-3xl font-bold text-[#E49700] 
                    ">
                        34,200 TK
                    </h2>
                    <div className="flex flex-col justify-start gap-1 card-actions">
                        <h3 className="text-xl font-medium text-[#868686]">Total Credit</h3>
                        <p className='text-[#5E5E5E]'>This month</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MonthlyExpense;