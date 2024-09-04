import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: "January", debit: 70, credit: 120, amount: 250 },
    { name: "February", debit: 130, credit: 180, amount: 250 },
    { name: "March", debit: 45, credit: 95, amount: 250 },
    { name: "April", debit: 90, credit: 140, amount: 250 },
    { name: "May", debit: 160, credit: 210, amount: 250 },
    { name: "June", debit: 10, credit: 60, amount: 250 },
    { name: "July", debit: 30, credit: 80, amount: 250 },
    { name: "August", debit: 110, credit: 160, amount: 250 },
    { name: "September", debit: 20, credit: 70, amount: 250 },
    { name: "October", debit: 100, credit: 150, amount: 250 },
    { name: "November", debit: 200, credit: 250, amount: 250 },
    { name: "December", debit: 75, credit: 125, amount: 250 },
];

const Chart = () => {


    return (
        <div className='bg-[#e7e4e4] p-12'>
            <div className='flex justify-between mb-4'>
                <h2 className='text-xl font-medium'>
                    Yearly Account Analysis
                </h2>
                <div>
                    <select id="year"
                        name='year'
                        className=" bg-[#E5E5E5] border-none flex-1 h-[48px]  w-full px-2 rounded-sm"
                    >
                        <option value="2024" id="">Year 2024</option>
                        <option value="2023" id="">Year 2023</option>
                        <option value="2022" id="">Year 2022</option>
                        <option value="---" id="">---</option>
                    </select>
                </div>
            </div>
            <BarChart width={900} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="debit" barSize={6} fill="#FF8E5E" />
                <Bar dataKey="credit" barSize={6} fill="#52E30E" />
            </BarChart>
        </div>

    );
};

export default Chart;