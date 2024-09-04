import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Provider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <ScaleLoader color="#2397C8" />
        </div>;
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // Render children if authenticated
    return children;


};

export default PrivateRoute;