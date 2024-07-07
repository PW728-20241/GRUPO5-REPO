import React from 'react';
import { Box, Typography, Button, FormControl, Select, MenuItem } from '@mui/material';

function CartItem({ item }) {
  const handleEliminar = async () => {
    await fetch(`http://grupo5final.azurewebsites.net/carrito/${item.id}`, {
      method: 'DELETE',
    });
    // Actualizar estado aquí
  };

  const handleGuardarParaDespues = async () => {
    await fetch('http://grupo5final.azurewebsites.net/guardarParaDespues', {
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
          <Button variant="text" sx={{ fontSize: '0.8rem' }} onClick={handleGuardarParaDespues}>Guardar para después</Button>
        </Box>
      </Box>
      <FormControl size="small" sx={{ width: '60px', mr: 2 }}>
        <Select
          value={item.cantidad}
          onChange={() => {}}
          displayEmpty
        >
          {[1, 2, 3, 4, 5].map((x) => (
            <MenuItem key={x} value={x}>{x}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography sx={{ width: '80px', textAlign: 'right' }}>S/ {item.precio.toFixed(2)}</Typography>
      <Typography sx={{ width: '80px', textAlign: 'right' }}>S/ {(item.cantidad * item.precio).toFixed(2)}</Typography>
    </Box>
  );
}

export default CartItem;
