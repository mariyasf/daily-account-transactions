import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get('/login', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(() => {
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    setIsAuthenticated(false);
                });
        }
    }, []);

    const login = (token, eID) => {
        localStorage.setItem('token', token);
        localStorage.setItem('eID', eID);
        setIsAuthenticated(true);
    };



    const logout = async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('eID');
            
            setIsAuthenticated(false);

            await axios.get('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
