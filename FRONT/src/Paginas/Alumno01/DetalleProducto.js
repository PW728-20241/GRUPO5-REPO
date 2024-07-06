import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography, Button, Link } from '@mui/material';
import Header1 from '../../Componentes/Header1';
import Footer from '../../Componentes/Footer';
import CantidadProducto from '../Alumno01/DETALLE/Cantidad';
import { useParams, useNavigate } from 'react-router-dom';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:3100/producto/id/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del producto');
        }
        const data = await response.json();
        setProduct({ ...data, imageUrl: `http://localhost:3100${data.imageUrl}` });
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ ...product, cantidad });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/carrito');
  };

  const aumentarCantidad = () => setCantidad(cantidad + 1);
  const disminuirCantidad = () => cantidad > 1 && setCantidad(cantidad - 1);

  if (!product) {
    return (
      <>
        <Header1 />
        <Container maxWidth="md">
          <Box my={4}>
            <Typography variant="h4">Cargando producto...</Typography>
          </Box>
        </Container>
        <Footer />
      </>
    );
  }

  const caracteristicasList = Array.isArray(product.caracteristicas) ? product.caracteristicas : [];

  return (
    <>
      <Header1 />
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4">{product.nombre}</Typography>
          <Typography variant="subtitle1">Por: {product.serie}</Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              width="100%"
              height={300}
              sx={{
                backgroundImage: `url(${product.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 5,
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box border={1} borderColor="black" borderRadius={8} p={2} textAlign="center">
                <Box borderBottom={1} borderColor="black" pb={1} mb={1}>
                  <Typography variant="h6">DISPONIBLE</Typography>
                </Box>
                <Typography variant="h4" color="black" fontWeight="bold">S/{product.precio.toFixed(2)}</Typography>
                <Button variant="contained" style={{ marginTop: 8, backgroundColor: '#fbbd08', color: '#ffffff' }} onClick={handleAddToCart}>
                  AÑADIR AL CARRITO
                </Button>
                <Box mt={2} />
                <CantidadProducto cantidad={cantidad} aumentar={aumentarCantidad} disminuir={disminuirCantidad} />
                <Typography variant="body2" mt={2}>
                  <Link href="#" color="inherit">
                    Ver métodos de envío disponibles
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6">Descripción</Typography>
          <Typography variant="body1" paragraph>
            {product.descripcion}
          </Typography>
        </Box>

        <Box mt={4} mb={4} bgcolor="grey.300" p={2} borderRadius={3}>
          <Typography variant="h6">Características del Producto:</Typography>
          <ul>
            {caracteristicasList.map((feature, index) => (
              <li key={index}>
                <Typography variant="body1">{feature}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default DetalleProducto;
