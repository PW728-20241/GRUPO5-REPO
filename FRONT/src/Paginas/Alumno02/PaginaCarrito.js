import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, FormControl, Select, MenuItem } from '@mui/material';
import Header1 from '../../Componentes/Header1';
import Footer from '../../Componentes/Footer';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    const storedSavedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    setSavedItems(storedSavedItems);
  }, []);

  const handleQuantityChange = (id, quantity) => {
    const updatedCartItems = cartItems.map(item => item.id === id ? { ...item, cantidad: quantity } : item);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleSaveForLater = (id) => {
    const itemToSave = cartItems.find(item => item.id === id);
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setSavedItems([...savedItems, itemToSave]);
    localStorage.setItem('savedItems', JSON.stringify([...savedItems, itemToSave]));
  };

  const handleMoveToCart = (id) => {
    const itemToMove = savedItems.find(item => item.id === id);
    const updatedSavedItems = savedItems.filter(item => item.id !== id);
    setSavedItems(updatedSavedItems);
    localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
    setCartItems([...cartItems, itemToMove]);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, itemToMove]));
  };

  const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleCheckout = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/checkout');
  };

  return (
    <>
      <Header1 />
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>{cartItems.length} Items en tu Carrito de Compras</Typography>
        {cartItems.length === 0 ? (
          <Typography>No hay productos en el carrito.</Typography>
        ) : (
          <>
            <Box sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1, mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid #ccc', paddingBottom: 1, background: "#D3D3D3", border: 2 }}>Items Disponibles para Envío</Typography>
              {cartItems.map(item => (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: '1px solid #ddd' }}>
                  <img src={item.imageUrl} alt={item.nombre} style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 16 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography>{item.nombre}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="text" sx={{ fontSize: '0.8rem' }} onClick={() => handleRemoveItem(item.id)}>Eliminar</Button>
                      <Typography variant="body2" sx={{ mx: 1 }}> | </Typography>
                      <Button variant="text" sx={{ fontSize: '0.8rem' }} onClick={() => handleSaveForLater(item.id)}>Guardar para después</Button>
                    </Box>
                  </Box>
                  <FormControl size="small" sx={{ width: '60px', mr: 2 }}>
                    <Select
                      value={item.cantidad}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
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
              ))}
            </Box>
            <Box sx={{ textAlign: 'right', padding: 2, borderTop: '1px solid #ddd', mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Total: S/ {total.toFixed(2)}</Typography>
              <Button variant="contained" onClick={handleCheckout} color="primary">Checkout</Button>
            </Box>
          </>
        )}

        {savedItems.length > 0 && (
          <Box sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1 }}>
            <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid #ccc', paddingBottom: 1, background: "#D3D3D3", border: 2 }}>Guardado para después</Typography>
            {savedItems.map(item => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: '1px solid #ddd' }}>
                <img src={item.imageUrl} alt={item.nombre} style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 16 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography>{item.nombre}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="text" sx={{ fontSize: '0.8rem' }} onClick={() => handleRemoveItem(item.id)}>Eliminar</Button>
                    <Typography variant="body2" sx={{ mx: 1 }}> | </Typography>
                    <Button variant="text" sx={{ fontSize: '0.8rem' }} onClick={() => handleMoveToCart(item.id)}>Mover al carrito</Button>
                  </Box>
                </Box>
                <Typography sx={{ width: '100px', textAlign: 'right' }}>Cantidad: {item.cantidad}</Typography>
                <Typography sx={{ width: '80px', textAlign: 'right' }}>S/ {item.precio.toFixed(2)}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default CartPage;
