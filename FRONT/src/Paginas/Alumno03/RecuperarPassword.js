import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Header from '../../Componentes/Header1';
import Footer from '../../Componentes/Footer';

const RecuperarPassword = () => {
    const [correo, setCorreo] = useState('');
    const [error, setError] = useState('');

    const manejarRecuperarPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://grupo5final.azurewebsites.net/recuperarPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo })
            });

            if (response.ok) {
                alert('Correo de recuperación enviado');
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error en el servidor');
        }
    };

    return (
        <>
            <Header />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '74.5vh',
                    backgroundColor: '#fff',
                }}
            >
                <Box
                    component="form"
                    onSubmit={manejarRecuperarPassword}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: 350,
                        padding: 3,
                        boxShadow: 'none',
                        backgroundColor: '#fff',
                        borderRadius: 0,
                    }}
                >
                    <Typography sx={{ marginBottom: 5, color: 'black', fontSize: 17, fontWeight: 'bold' }}>
                        Ingrese su correo para enviar contraseña
                    </Typography>
                    <TextField
                        label="Email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    {error && (
                        <Typography sx={{ color: 'black', marginTop: 0, marginBottom: 0 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: '100%',
                            backgroundColor: '#000000',
                            color: '#fff',
                            marginTop: 3,
                            padding: '10px',
                            borderRadius: '5px',
                            '&:hover': {
                                backgroundColor: '#474646',
                            },
                        }}
                    >
                        Enviar
                    </Button>
                    <Box sx={{ marginTop: 5, textAlign: 'center', fontSize: 17 }}>
                        <a href="/IniciarSesion" style={{ color: 'black', textDecoration: 'outlined' }}>
                            Regresar a login
                        </a>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default RecuperarPassword;
