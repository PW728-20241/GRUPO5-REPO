import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, CssBaseline, Paper, Typography, Grid, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';

const DetalleOrdenAdmin = () => {
  const { id } = useParams();
  const [detalleOrden, setDetalleOrden] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetalleOrden = async () => {
      try {
        const response = await fetch(`http://localhost:3100/orden/${id}`);
        const data = await response.json();
        setDetalleOrden(data);
      } catch (error) {
        console.error('Error al obtener los detalles de la orden:', error);
      }
    };

    fetchDetalleOrden();
  }, [id]);

  const handleCancelarOrden = async () => {
    try {
      const response = await fetch(`http://localhost:3100/orden/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Orden cancelada exitosamente');
        navigate('/');
      } else {
        alert('Error al cancelar la orden');
      }
    } catch (error) {
      console.error('Error al cancelar la orden:', error);
      alert('Error al cancelar la orden');
    }
  };

  if (!detalleOrden) {
    return <Typography>Cargando detalles de la orden...</Typography>;
  }

  const { direccion, metodoPago, metodoEnvio, total, OrderProducts } = detalleOrden;
  const isCreditCard = metodoPago.length > 4;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Detalles de Orden Nro {id}
        </Typography>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Datos de compra</strong>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Dirección de Envío</strong><br />
                {direccion.join(', ')}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Pago</strong><br />
                {isCreditCard ? `Pago con tarjeta de crédito que termina en: ****${metodoPago.slice(-4)}` : 'Pago con código QR'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Método de Envío</strong>
          </Typography>
          <RadioGroup value={metodoEnvio}>
            <FormControlLabel value="economico" control={<Radio />} label="Económico Aéreo - S/10.00" disabled />
            <FormControlLabel value="prioritario" control={<Radio />} label="Envío prioritario (5 a 10 días) - S/17.00" disabled />
          </RadioGroup>
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Items en Pedido:</strong>
              </Typography>
              {OrderProducts.map((item, index) => (
                <Typography key={index} variant="body2">
                  {item.cantidad}x {item.Producto.nombre} - S/ {item.Producto.precio}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom>
                <strong>Resumen de Orden:</strong>
              </Typography>
              <Typography variant="body2">Subtotal: S/ {total - (metodoEnvio === 'economico' ? 10 : 17) - (total * 0.18).toFixed(2)}</Typography>
              <Typography variant="body2">Envío: S/ {metodoEnvio === 'economico' ? '10.00' : '17.00'}</Typography>
              <Typography variant="body2">Impuestos: S/ {(total * 0.18).toFixed(2)}</Typography>
              <Typography variant="body2"><strong>Total: S/ {total.toFixed(2)}</strong></Typography>
              <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleCancelarOrden}>Cancelar Pedido</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default DetalleOrdenAdmin;
