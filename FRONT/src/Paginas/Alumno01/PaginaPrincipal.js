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
        const response = await fetch('http://grupo5final.azurewebsites.net/productos');
        if (!response.ok) {
          throw new Error('Error al obtener los datos del servidor');
        }
        const data = await response.json();
        
        console.log('Data received from backend:', data);

        const makeAbsoluteUrls = (items) => items.map(item => ({
          ...item,
          imageUrl: `http://grupo5final.azurewebsites.net${item.imageUrl}`
        }));

        setProductos(makeAbsoluteUrls(data));
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
      }
    }

    obtenerProductos();
  }, []);

  const categorias = productos.filter(producto => producto.categoria === 'Colección');
  const nuevos = productos.filter(producto => producto.nuevo === true);

  
  const productosSinCategoriasYNuevos = productos.filter(producto => 
    !nuevos.includes(producto) && !categorias.includes(producto)
  );

  const fila1 = productosSinCategoriasYNuevos.slice(0, 5);
  const fila2 = productosSinCategoriasYNuevos.slice(5, 10);
  const fila3 = productosSinCategoriasYNuevos.slice(10, 15);

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
