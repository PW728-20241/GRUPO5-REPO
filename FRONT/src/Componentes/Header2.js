import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Importa el AuthContext

const Barra = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const Titulo_Boton = styled(Button)(({ theme }) => ({
  color: '#000000', 
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '1.25rem',
  fontFamily: 'Arial, sans-serif', 
  transition: 'color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    color: '#fbbd08', 
    transform: 'scale(1.1)',
  },
}));

const Header1 = () => {
  const { user, logout } = useContext(AuthContext); // Usa el contexto de autenticación
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/iniciar-sesion'); // Redirigir a la página de inicio de sesión
  };

  return (
    <Barra>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar position="static" color="default" elevation={4}>
          <Toolbar>
            <Grow in={true} timeout={500}>
              <Titulo_Boton component={Link} to="/">
                ALDO'S MARKET
              </Titulo_Boton>
            </Grow>
            <div style={{ flexGrow: 1 }} />
            {user ? (
              <Grow in={true} timeout={700}>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </Grow>
            ) : (
              <Grow in={true} timeout={700}>
                <Button variant="contained" component={Link} to="/iniciarsesion">
                  Iniciar Sesión
                </Button>
              </Grow>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
    </Barra>
  );
};

export default Header1;
