import React, { useState, useEffect } from "react";
import { Box, Button, Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Pagination } from '@mui/material';
import Header from '../../Componentes/Header2';
import Footer from '../../Componentes/Footer';
import BarLateral from '../../Componentes/BarraLateral2';
import ContenidoTabla from './ContenidoTablaProd';
import { Link as RouterLink } from 'react-router-dom';

function AdminProducto (){
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [searchParams, setSearchParams] = useState('');
    const [paginaActual, setpaginaActual] = useState(1);
    const productosPorPagina = 5;

    const fetchData = async () => {
        try {
            const URL_base = 'http://localhost:3100/';
            const respuesta = await fetch(URL_base + 'productos');
            const resultado = await respuesta.json();
            const productosOrdenados = resultado.sort((a, b) => a.id - b.id); // Ordenar los productos por id
            setData(productosOrdenados);
            setAllData(productosOrdenados);
        } catch (error) {
            console.error('No se encontró data: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filtrarID = async () => {
        if (searchParams.trim() === '') {
            setData(allData); 
            setpaginaActual(1);
            return;
        }
        
        try {
            const URL_base = 'http://localhost:3100/';
            const respuesta = await fetch(`${URL_base}producto/id/${searchParams}`);
            if (!respuesta.ok) {
                throw new Error('Producto no encontrado');
            }
            const resultado = await respuesta.json();
            setData([resultado]); 
            setpaginaActual(1);
        } catch (error) {
            console.error('Error al buscar producto:', error);
            setData([]); 
        }
    };

    const indexDelUltimoProducto = paginaActual * productosPorPagina;
    const indexDelPrimerProducto = indexDelUltimoProducto - productosPorPagina;
    const productosActuales = data.filter(producto => producto.estado !== 'Eliminado').slice(indexDelPrimerProducto, indexDelUltimoProducto);

    const handlePageChange = (event, value) => {
        setpaginaActual(value);
    };

    return (
        <>
            <Header />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <BarLateral />
                <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h4" style={{ fontWeight: 'bold' }}>Productos</Typography>
                        <Button component={RouterLink} to={`/AgregarProducto`} variant="contained" style={{ backgroundColor: '#FFEB3B', color: 'black', fontWeight: 'bold' }}>
                            Agregar Producto
                        </Button>
                    </Box>
                    <TextField
                        id="buscarP"
                        label="Buscar por ID"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={searchParams}
                        onChange={(e) => setSearchParams(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <Button
                                    type="button"
                                    onClick={filtrarID}
                                    variant="contained"
                                    component="label"
                                    style={{ backgroundColor: '#FFEB3B', color: 'black', fontWeight: 'bold' }}
                                >
                                    Buscar
                                </Button>
                            ),
                        }}
                    />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ textAlign: 'center' }}>ID</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Nombre</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Editor</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Precio (S/)</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Fecha de Registro</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Stock</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Estado</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productosActuales.length > 0 ? productosActuales.map((producto, index) => (
                                    <ContenidoTabla key={index} producto={producto}/>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={8} style={{ textAlign: 'center' }}>No hay datos disponibles</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination 
                            count={Math.ceil(data.filter(producto => producto.estado !== 'Eliminado').length / productosPorPagina)} 
                            page={paginaActual} 
                            onChange={handlePageChange} 
                        />
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default AdminProducto;
