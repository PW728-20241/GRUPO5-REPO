import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Pagination } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header1 from '../../Componentes/Header1';
import Footer from '../../Componentes/Footer';
import TarjetaProducto from '../Alumno01/RESULTADO_BUSQUEDA/Grids';
import SelectorOrden from '../Alumno01/RESULTADO_BUSQUEDA/Orden';

const ResultadoBusqueda = () => {
    const [productos, setProductos] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 5; 

    const location = useLocation();
    const query = location.state?.query || ''; 
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`http://grupo5final.azurewebsites.net/buscar?query=${query}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del servidor');
                }
                const data = await response.json();
                const resultados = data.map((producto, index) => ({
                    id: producto.id,
                    title: producto.nombre,
                    price: producto.precio,
                    brand: producto.serie,
                    imageUrl: `http://grupo5final.azurewebsites.net${producto.imageUrl}`,
                    link: `#producto-${index}`
                }));
                setProductos(resultados);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProductos();
    }, [query]);

    const [ordenarPor, setOrdenarPor] = useState('Precio');

    const manejarCambioOrden = (event) => {
        setOrdenarPor(event.target.value);
    };

    const productosFiltrados = productos.filter(producto => {
        return producto.title.toLowerCase().includes(query.toLowerCase());
    });

    const productosOrdenados = productosFiltrados.slice().sort((a, b) => {
        if (ordenarPor === 'Precio') {
            return a.price - b.price;
        } else if (ordenarPor === 'Nombre') {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    const indiceInicio = (paginaActual - 1) * productosPorPagina;
    const indiceFin = indiceInicio + productosPorPagina;
    const productosPaginados = productosOrdenados.slice(indiceInicio, indiceFin);

    const handleChangePage = (event, value) => {
        setPaginaActual(value);
    };

    return (
        <>
            <Header1 />
            <Container maxWidth="lg">
                <SelectorOrden ordenarPor={ordenarPor} manejarCambioOrden={manejarCambioOrden} />
                <Box mb={2} p={2} border={1} borderColor="grey.400" borderRadius={4}>
                    <Typography variant="h6">Resultados de Búsqueda</Typography>
                </Box>
                {productosPaginados.length > 0 ? (
                    productosPaginados.map((producto, index) => (
                        <TarjetaProducto producto={producto} indice={indiceInicio + index} key={indiceInicio + index} />
                    ))
                ) : (
                    <Typography variant="body1">No se encontraron productos.</Typography>
                )}
                <Box display="flex" justifyContent="center" mt={4} pb={20}>
                    <Pagination
                        count={Math.ceil(productosOrdenados.length / productosPorPagina)}
                        page={paginaActual}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChangePage}
                    />
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default ResultadoBusqueda;
