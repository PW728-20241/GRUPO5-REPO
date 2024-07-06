import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

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

const Navegar = styled(Button)(({ theme }) => ({
  color: '#000000', 
  textTransform: 'none',
  marginLeft: theme.spacing(2),
  fontFamily: 'Arial, sans-serif', 
  transition: 'color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    color: '#fbbd08', 
    transform: 'scale(1.1)',
  },
}));

const Header1 = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  const handleNavigate = (path, section) => {
    navigate(path);
    if (section) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  return (
    <Barra>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar position="static" color="default" elevation={4}>
          <Toolbar>
            <Grow in={true} timeout={500}>
              <Titulo_Boton onClick={() => handleNavigate('/')}>
                ALDO'S MARKET
              </Titulo_Boton>
            </Grow>
            <Grow in={true} timeout={700}>
              <Navegar onClick={() => handleNavigate('/', 'vendidos')}>
                Más vendidos
              </Navegar>
            </Grow>
            <Grow in={true} timeout={900}>
              <Navegar onClick={() => handleNavigate('/', 'nuevos')}>
                Nuevos
              </Navegar>
            </Grow>
            <Grow in={true} timeout={1100}>
              <Navegar onClick={() => handleNavigate('/', 'ofertas')}>
                Ofertas
              </Navegar>
            </Grow>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton href="/carritocompra" color="inherit">
              <ShoppingCartIcon />
            </IconButton>
            <Grow in={true} timeout={1300}>
              <Navegar href='/ayuda'>
                Ayuda
              </Navegar>
            </Grow>
            {isAuthenticated ? (
              <>
                <Grow in={true} timeout={1500}>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: 2, backgroundColor: '#fbbd08', color: '#ffffff' }}
                    onClick={() => navigate('/dashboard')}
                  >
                    Mi Cuenta
                  </Button>
                </Grow>
                <Grow in={true} timeout={1700}>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: 2, backgroundColor: '#fbbd08', color: '#ffffff' }}
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </Grow>
              </>
            ) : (
              <Grow in={true} timeout={1500}>
                <Button
                  variant="contained"
                  sx={{ marginLeft: 2, backgroundColor: '#fbbd08', color: '#ffffff' }}
                  onClick={() => navigate('/iniciar-sesion')}
                >
                  Mi Cuenta
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
