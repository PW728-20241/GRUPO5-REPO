import React from "react";
import { Box, Button, Container, Grid, Paper, Typography, CssBaseline, TextField } from '@mui/material';
import Header from '../../Componentes/Header2';
import Footer from '../../Componentes/Footer';
import BarLateral from '../../Componentes/BarraLateral2';
import { Link as RouterLink } from 'react-router-dom';

const AgregarProducto = () => {

    const manejarGuardar = async () => {
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const caracteristicas = document.getElementById('caracteristicas').value.split(',');
        const editor = document.getElementById('editor').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const stock = parseInt(document.getElementById('stock').value);
        const imagen = document.getElementById('imagen').files[0];

        const nuevoProducto = { 
            nombre, 
            descripcion, 
            caracteristicas, 
            editor, 
            precio, 
            stock, 
            imageUrl: '' 
        };

        try {
            const response = await fetch('http://localhost:3100/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoProducto)
            });

            if (response.ok) {
                alert('Producto guardado exitosamente');
            } else {
                alert('Error al guardar el producto');
            }
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            alert('Error al guardar el producto');
        }
    };

    return (
        <>
            <Header />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <BarLateral />
                <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Paper sx={{ p: 3, mb: 2 }}>
                        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
                            Agregar Producto
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Paper variant="outlined" sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button variant="contained" component="label" style={{ backgroundColor: '#FFEB3B', color: 'black', fontWeight: 'bold' }}>
                                        Agregar Imagen
                                        <input type="file" hidden id="imagen" />
                                    </Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label="Nombre" variant="outlined" fullWidth sx={{ mb: 2 }} id="nombre" />
                                <TextField label="Descripción" variant="outlined" fullWidth multiline rows={2} sx={{ mb: 2 }} id="descripcion" />
                                <TextField label="Características" variant="outlined" fullWidth multiline rows={2} sx={{ mb: 2 }} id="caracteristicas" />
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField label="Editor" variant="outlined" fullWidth id="editor" />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ mt: 2 }}>
                                    <Grid item xs={6}>
                                        <TextField label="Precio" variant="outlined" fullWidth type="number" InputProps={{ inputProps: { min: 1, step: 0.10 } }} id="precio" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Stock" variant="outlined" fullWidth type="number" InputProps={{ inputProps: { min: 1 } }} id="stock" />
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                    <Button variant="contained" style={{ backgroundColor: '#FFEB3B', color: 'black', fontWeight: 'bold' }} onClick={manejarGuardar} component={RouterLink} to={`/AdminProducto`}>
                                        Guardar
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default AgregarProducto;
