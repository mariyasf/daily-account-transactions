
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import DashboardSideBar from '../Pages/Shared/DashboardSideBar/DashboardSideBar';
import { useAuth } from '../Provider/AuthProvider';

const Root = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div>

            <div className="flex flex-col h-screen">
                <Navbar />
                {
                    isAuthenticated ? <>
                        <div className="flex flex-1">
                            <DashboardSideBar />
                            <div className="flex-1 p-5">
                                <Outlet />
                            </div>
                        </div>
                    </> : <Outlet />

                }

            </div>
        </div>
    );
};

export default Root;