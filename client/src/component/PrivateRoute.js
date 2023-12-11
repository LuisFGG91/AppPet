// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, ...props }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <Route {...props} element={children} />
    ) : (
            <Navigate to="/user" replace={true} />  
    );
};

export default PrivateRoute;
