import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function SavedItem({ item }) {
  const handleEliminar = async () => {
    await fetch(`http://grupo5final.azurewebsites.net/guardadosParaDespues/${item.id}`, {
      method: 'DELETE',
    });
    // Actualizar estado aquí
  };

  const handleMoverAlCarrito = async () => {
    await fetch('http://grupo5final.azurewebsites.net/moverAlCarrito', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    // Actualizar estado aquí
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: '1px solid #ddd' }}>
      <Box sx={{ width: 80, height: 80, backgroundColor: '#eee', mr: 2 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography>{item.nombre}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="text" sx={{ fontSize: '0.8rem' }} onClick={handleEliminar}>Eliminar</Button>
          <Typography variant="body2" sx={{ mx: 1 }}> | </Typography>
          <Button variant="text" sx={{ fontSize: '0.8rem' }} onClick={handleMoverAlCarrito}>Mover al carrito</Button>
        </Box>
      </Box>
      <Typography sx={{ width: '100px', textAlign: 'right' }}>Cantidad: {item.cantidad}</Typography>
      <Typography sx={{ width: '80px', textAlign: 'right' }}>S/ {item.precio.toFixed(2)}</Typography>
    </Box>
  );
}

export default SavedItem;
