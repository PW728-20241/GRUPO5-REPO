import React, { useState, useEffect } from "react";
import { Box, Container, Typography, CssBaseline } from '@mui/material';
import Header from '../../Componentes/Header2';
import Footer from '../../Componentes/Footer';
import BarLateral from '../../Componentes/BarraLateral2';
import Contenido from './ContenidoDashboard';

const Dashboard = () => {
    const [fecha, setFecha] = useState('');
    const [infoDia, setInfoDia] = useState({
        cantUsuarioNuevos: 0,
        cantOrdenesDia: 0,
        ingresosDia: 0,
        Fecha: ''
    });

    useEffect(() => {
        if (!fecha) return;

        async function fetchData() {
            try {
                
                const usuariosRespuesta = await fetch(`http://grupo5final.azurewebsites.net/usuarios/fechaRegistro/${fecha}`);
                const usuariosData = await usuariosRespuesta.json();
                const usuariosNuevos = Array.isArray(usuariosData) ? usuariosData.length : 0;

                
                const ordenesRespuesta = await fetch(`http://grupo5final.azurewebsites.net/orden/fechaOrden/${fecha}`);
                const ordenesData = await ordenesRespuesta.json();
                const cantOrdenesDia = Array.isArray(ordenesData) ? ordenesData.length : 0;

                
                const ingresosDia = Array.isArray(ordenesData) 
                    ? ordenesData.reduce((total, orden) => total + (orden.total || 0), 0) 
                    : 0;

                setInfoDia({
                    cantUsuarioNuevos: usuariosNuevos,
                    cantOrdenesDia: cantOrdenesDia,
                    ingresosDia: ingresosDia,
                    Fecha: fecha
                });
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }

        fetchData();
    }, [fecha]);

    const handleDateChange = (event) => {
        setFecha(event.target.value);
    };

    return (
        <>
            <Header />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <BarLateral />
                <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Container sx={{ flexGrow: 1 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Typography variant="h4" style={{ fontWeight: 'bold' }}>Dashboard</Typography>
                            <input 
                                type="date" 
                                onChange={handleDateChange} 
                                style={{ backgroundColor: '#FFEB3B', color: 'black', fontWeight: 'bold', border: 'none', padding: '10px', borderRadius: '5px' }}
                            />
                        </Box>
                        <Contenido key={infoDia.Fecha} infoDia={infoDia} />
                    </Container>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Dashboard;
