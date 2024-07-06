import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Header1 from '../../Componentes/Header1';
import Footer from '../../Componentes/Footer';

const CheckoutPage = () => {
  const navigate = useNavigate(); // Usa useNavigate para la navegación

  const [shippingAddress, setShippingAddress] = useState({
    linea1: '',
    linea2: '',
    distrito: '',
    ciudad: '',
    pais: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [creditCard, setCreditCard] = useState({
    numeroTarjeta: '',
    nombreTarjeta: '',
    vencimiento: '',
    ccv: ''
  });

  const [shippingMethod, setShippingMethod] = useState('economico');
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    const subtotal = storedCartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const shippingCost = shippingMethod === 'economico' ? 10 : 17;
    const tax = subtotal * 0.18;
    setTotal(subtotal + shippingCost + tax);
  }, [shippingMethod]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    setCreditCard({ ...creditCard, [name]: value });
  };

  const handleShippingMethodChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handleSubmit = async () => {
    if (!shippingAddress.linea1 || !shippingAddress.distrito || !shippingAddress.ciudad || !shippingAddress.pais) {
      alert('Por favor, complete todos los campos de dirección.');
      return;
    }
    if (paymentMethod === 'tarjeta' && (!creditCard.numeroTarjeta || !creditCard.nombreTarjeta || !creditCard.vencimiento || !creditCard.ccv)) {
      alert('Por favor, complete todos los campos de la tarjeta de crédito.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3100/orden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shippingAddress, paymentMethod, creditCard, cartItems, total, shippingMethod })
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.removeItem('cartItems');
        setCartItems([]);
        // Redirige a DetalleOrden con los detalles de la orden
        navigate('/', { state: { orderDetails: { ...result, shippingAddress, paymentMethod, creditCard, cartItems, total, shippingMethod } } });
      } else {
        alert('Error al completar la orden');
      }
    } catch (error) {
      console.error('Error al completar la orden:', error);
      alert('Error al completar la orden');
    }
  };

  return (
    <>
      <Header1 />
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>¡Casi Listo! Tu orden no estará completa hasta que revises y presiones el botón “completar orden” al final de la página.</Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ flexGrow: 1, mr: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Datos de compra</Typography>
            <Box component="form">
              <TextField label="Línea 1" name="linea1" value={shippingAddress.linea1} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Línea 2" name="linea2" value={shippingAddress.linea2} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Distrito" name="distrito" value={shippingAddress.distrito} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Ciudad" name="ciudad" value={shippingAddress.ciudad} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="País" name="pais" value={shippingAddress.pais} onChange={handleInputChange} fullWidth margin="normal" />
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, ml: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Pago</Typography>
            <FormControl component="fieldset">
              <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
                <FormControlLabel value="qr" control={<Radio />} label="Pago con código QR" />
                <FormControlLabel value="tarjeta" control={<Radio />} label="Pago con tarjeta de crédito" />
              </RadioGroup>
            </FormControl>
            {paymentMethod === 'tarjeta' && (
              <Box component="form">
                <TextField label="Número de Tarjeta" name="numeroTarjeta" value={creditCard.numeroTarjeta} onChange={handleCreditCardChange} fullWidth margin="normal" />
                <TextField label="Nombre en tarjeta" name="nombreTarjeta" value={creditCard.nombreTarjeta} onChange={handleCreditCardChange} fullWidth margin="normal" />
                <TextField label="Vencimiento" name="vencimiento" value={creditCard.vencimiento} onChange={handleCreditCardChange} fullWidth margin="normal" />
                <TextField label="CCV" name="ccv" value={creditCard.ccv} onChange={handleCreditCardChange} fullWidth margin="normal" />
              </Box>
            )}
            {paymentMethod === 'qr' && (
              <Box sx={{ mt: 2 }}>
                <img src="https://via.placeholder.com/150" alt="QR Code" />
              </Box>
            )}
          </Box>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Método de Envío</Typography>
          <FormControl component="fieldset">
            <RadioGroup value={shippingMethod} onChange={handleShippingMethodChange}>
              <FormControlLabel value="economico" control={<Radio />} label="Económico Aéreo - S/10.00" />
              <FormControlLabel value="prioritario" control={<Radio />} label="Envío prioritario (5 a 10 días) - S/17.00" />
            </RadioGroup>
          </FormControl>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Items en Pedido</Typography>
          {cartItems.map(item => (
            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>{item.cantidad}x {item.nombre}</Typography>
              <Typography>S/ {(item.cantidad * item.precio).toFixed(2)}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Resumen de Orden</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Subtotal:</Typography>
            <Typography>S/ {(total - (shippingMethod === 'economico' ? 10 : 17) - (total * 0.18)).toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Envío:</Typography>
            <Typography>S/ {shippingMethod === 'economico' ? '10.00' : '17.00'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Impuestos:</Typography>
            <Typography>S/ {(total * 0.18).toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography>Total:</Typography>
            <Typography>S/ {total.toFixed(2)}</Typography>
          </Box>
        </Box>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Completar Orden
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default CheckoutPage;
