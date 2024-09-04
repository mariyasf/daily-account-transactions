import React from 'react';
import MonthlyExpense from '../../Components/MonthlyExpense/MonthlyExpense';
import Chart from '../../Components/Chart/Chart';

const Dashboard = () => {
    return (
        <div>
            <div className="flex flex-col justify-center gap-14">
                <MonthlyExpense />
                <Chart />
            </div>
        </div>
    );
};

export default Dashboard;