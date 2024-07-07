import React, { useState, useContext } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../Componentes/Header1';
import Footer from '../../Componentes/Footer';
import { AuthContext } from '../../Componentes/AuthContext';

const IniciarSesion = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const manejarIniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3100/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // Guardar la información del usuario
        login({ ...data.user, token: data.token });
        alert(data.message);

        // Redirigir al dashboard correspondiente según el correo y la contraseña
        if (correo === 'admin@ejemplo.com' && password === 'admin') {
          navigate('/Dashboard');
        } else {
          navigate('/');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('*Error al intentar iniciar sesión');
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
          backgroundColor: '#fffff',
        }}
      >
        <Box
          component="form"
          onSubmit={manejarIniciarSesion}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 350,
            padding: 3,
            boxShadow: 'none',
            backgroundColor: '#fffff',
            borderRadius: 0,
          }}
        >
          <Typography sx={{ marginBottom: 5, color: '#333', fontSize: 18, fontWeight: 'bold' }}>
            Ingreso para clientes registrados
          </Typography>
          <TextField
            label="Email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          {error && (
            <Typography sx={{ color: 'black', marginTop: 2, marginBottom: 3 }}>
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
              padding: '10px',
              borderRadius: '5px',
              '&:hover': {
                backgroundColor: '#474646',
              },
            }}
          >
            Ingresar
          </Button>
          <Box sx={{ marginTop: 2, textAlign: 'center', fontSize: 17 }}>
            <a href="/RecuperarPassword" style={{ color: 'black', textDecoration: 'outlined' }}>
              Olvidé mi password
            </a>
            <br />
            <a href="/Registrar" style={{ color: 'black', textDecoration: 'outlined' }}>
              No tengo cuenta, deseo registrarme
            </a>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default IniciarSesion;
