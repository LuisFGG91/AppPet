// Navbar.js

import React from 'react';
import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta según tu estructura de carpetas

const Navbar = () => {
    const navigate = useNavigate();
    const { logout , user } = useAuth(); // Asegúrate de tener esta función en tu contexto

    const userLogout = async () => {
        try {
            // Llamada al backend para cerrar sesión
            await axios.post('http://localhost:8110/api/user/logout');
            logout();
            // Redirección a la lista de películas
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#006b81" }}>
            <Container>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "whitesmoke" }}>
                        {user.firstName} {user.lastName} 
                    </Typography>
                    <div className="buttonHeader">
                        <Button color="inherit" onClick={userLogout}>
                            Logout
                        </Button>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
