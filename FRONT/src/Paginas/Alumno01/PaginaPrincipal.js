import React, { useState, useEffect } from "react";
import { Container, Box, Divider } from '@mui/material';
import Header from '../../Componentes/Header1';
import Footer from '../../Componentes/Footer';
import BarradeBusqueda from './PAGINA_PRINCIPAL/BarradeBusqueda'; 
import CategoriaSeccion from './PAGINA_PRINCIPAL/Categoria_Seccion'; 
import Items from './PAGINA_PRINCIPAL/Items';
import NuevaSeccion from './PAGINA_PRINCIPAL/NuevaSeccion';

const PaginaPrincipal = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function obtenerProductos() {
      try {
        const response = await fetch('http://localhost:3100/productos');
        if (!response.ok) {
          throw new Error('Error al obtener los datos del servidor');
        }
        const data = await response.json();
        
        console.log('Data received from backend:', data);

        const makeAbsoluteUrls = (items) => items.map(item => ({
          ...item,
          imageUrl: `http://localhost:3100${item.imageUrl}`
        }));

        setProductos(makeAbsoluteUrls(data));
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
      }
    }

    obtenerProductos();
  }, []);

  // Filtrar productos por categorías específicas
  const categorias = productos.filter(producto => producto.categoria === 'Colección');
  
  // Filtrar productos marcados como nuevos
  const nuevos = productos.filter(producto => producto.nuevo === true);

  // Dividir productos en filas para mostrar en la página
  const fila1 = productos.slice(0, 5);
  const fila2 = productos.slice(5, 10);
  const fila3 = productos.slice(10, 15);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <BarradeBusqueda />
        
        <CategoriaSeccion categorias={categorias} />
        
        <Box id='ofertas' mb={4}>
          
          <Items items={fila1} />
          <Items items={fila2} />
        </Box>
        <Divider />
        
       
        <NuevaSeccion nuevos={nuevos} />
        
        <Box mb={4}>
          
          <Items items={fila3} />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default PaginaPrincipal;
