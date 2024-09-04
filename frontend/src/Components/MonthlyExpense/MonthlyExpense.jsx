import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MonthlyExpense = () => {
    const [data, setData] = useState([]);
    const eID = localStorage.getItem('eID');
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/report-data`, {
                    params: { eID }
                });

                const reportData = res.data;
                setData(res.data);


                const totalDebit = reportData.reduce((acc, item) => {
                    return item.account === 'debit' ? acc + item.amount : acc;
                }, 0);

                const totalCredit = reportData.reduce((acc, item) => {
                    return item.account === 'credit' ? acc + item.amount : acc;
                }, 0);

                setTotalDebit(totalDebit);
                setTotalCredit(totalCredit);
                setTotalAmount(totalDebit + totalCredit)

            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        };

        if (eID) {
            fetchReportData();
        }
    }, [eID]);
    // console.log(data);

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="card rounded-lg w-96 bg-[#F6DBDB]">
                <div className="flex flex-col gap-8 card-body">
                    <h2 className="flex justify-end text-3xl font-bold text-[#FF5F5F] 
                    ">
                        {totalDebit.toFixed(2)} Taka
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
                        {totalCredit.toFixed(2)} TK
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
                        {totalAmount.toFixed(2)} TK
                    </h2>
                    <div className="flex flex-col justify-start gap-1 card-actions">
                        <h3 className="text-xl font-medium text-[#868686]">Total Amount</h3>
                        <p className='text-[#5E5E5E]'>This month</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MonthlyExpense;