import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const Report = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState([]);
    const eID = localStorage.getItem('eID');

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/report-data`, {
                    params: { eID }
                });

                setData(res.data);
            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        };

        if (eID) {
            fetchReportData();
        }
    }, [eID]);

    console.log(data);

    return (
        <div className="max-w-[906px] mx-auto">
            <div className="flex flex-row justify-between border-b-2 pb-4 mb-10">
                <h1 className="text-xl font-medium">Daily Report</h1>
                <DatePicker
                    className="border p-4 rounded-sm"
                    dateFormat="yyyy-MM-dd"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Accounts Head</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index}
                                        className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                        <td>{index + 1}</td>
                                        <td>{item.category_name}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.account}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No data available for the given eID.
                                    </td>
                                </tr>
                            )}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Report;