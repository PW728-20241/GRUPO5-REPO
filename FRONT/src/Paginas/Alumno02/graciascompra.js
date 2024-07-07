// src/pages/ThankYouPage.jsx
import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import RecommendedItems from './componentes/recomendacion';
import Header from '../../Componentes/Header1';
import Footer from '../../Componentes/Footer';
function ThankYouPage() {
  return (
    <>
    <Header/>
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 2,textAlign:"center"}}>¡Muchas gracias por tu pedido!</Typography>
      <Typography variant="body1" sx={{ mb: 4,textAlign:"center" }}>
        Puedes ver el detalle y estado de tu pedido ingresando a <Link href="/ListaOrdenesUsuario">tu cuenta</Link>.
      </Typography>
      <RecommendedItems />
    </Container>
    <Footer/>
    </>
  );
}

export default ThankYouPage;
