import React from 'react';
import { Box, Grid } from '@mui/material';
import ChangePassword from './cambiarpass';
import Sidebar from '../../Componentes/BarraLateral1';
import Footer from '../../Componentes/Footer';
import Header1 from '../../Componentes/Header2';
const CambiarContraseña = () => {
  return (<>
    <Header1/>
    <Box sx={{ flexGrow: 2, p: 2}}>
      <Grid container spacing={2}>
          <Sidebar />
        <Grid item xs={12} md={9}>
          <ChangePassword />
        </Grid>
      </Grid>
    </Box>
    <Footer/>
    </>
  );
};
  
export default CambiarContraseña;
