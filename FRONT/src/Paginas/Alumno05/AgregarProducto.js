import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Paper, Typography, CssBaseline, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Header from '../../Componentes/Header2';
import Footer from '../../Componentes/Footer';
import BarLateral from '../../Componentes/BarraLateral2';

const AgregarProducto = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [caracteristicas, setCaracteristicas] = useState('');
    const [editor, setEditor] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [imagen, setImagen] = useState(null);
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch all products when component mounts
        async function fetchProductos() {
            try {
                const response = await fetch('http://localhost:3100/productos');
                if (!response.ok) {
                    throw new Error('Error fetching products');
                }
                const data = await response.json();
                setProductos(data);
                setFilteredProductos(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProductos();
    }, []);

    useEffect(() => {
        // Filter products whenever the search term changes
        const filtered = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.editor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.id.toString().includes(searchTerm)
        );
        setFilteredProductos(filtered);
    }, [searchTerm, productos]);

    const manejarGuardar = async () => {
        const nuevoProducto = { 
            nombre, 
            descripcion, 
            caracteristicas: caracteristicas.split(','), // Convertir características en arreglo
            editor, 
            precio: parseFloat(precio), // Asegurarse de que el precio sea un número
            stock: parseInt(stock), // Asegurarse de que el stock sea un número entero
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
                // Limpiar los campos del formulario
                setNombre('');
                setDescripcion('');
                setCaracteristicas('');
                setEditor('');
                setPrecio('');
                setStock('');
                setImagen(null);
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
                                        <input type="file" hidden onChange={(e) => setImagen(e.target.files[0])} />
                                    </Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label="Nombre" variant="outlined" fullWidth sx={{ mb: 2 }} value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                <TextField label="Descripción" variant="outlined" fullWidth multiline rows={2} sx={{ mb: 2 }} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                <TextField label="Características" variant="outlined" fullWidth multiline rows={2} sx={{ mb: 2 }} value={caracteristicas} onChange={(e) => setCaracteristicas(e.target.value)} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField label="Editor" variant="outlined" fullWidth value={editor} onChange={(e) => setEditor(e.target.value)} />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ mt: 2 }}>
                                    <Grid item xs={6}>
                                        <TextField label="Precio" variant="outlined" fullWidth type="number" InputProps={{ inputProps: { min: 1, step: 0.10 } }} value={precio} onChange={(e) => setPrecio(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Stock" variant="outlined" fullWidth type="number" InputProps={{ inputProps: { min: 1 } }} value={stock} onChange={(e) => setStock(e.target.value)} />
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                    <Button variant="contained" style={{ backgroundColor: '#FFEB3B', color: 'black', fontWeight: 'bold' }} onClick={manejarGuardar}>
                                        Guardar
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper sx={{ p: 3, mt: 4 }}>
                        <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                            Buscar Producto
                        </Typography>
                        <TextField
                            label="Buscar por ID, Nombre o Editor"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Editor</TableCell>
                                        <TableCell>Precio</TableCell>
                                        <TableCell>Stock</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredProductos.map(producto => (
                                        <TableRow key={producto.id}>
                                            <TableCell>{producto.id}</TableCell>
                                            <TableCell>{producto.nombre}</TableCell>
                                            <TableCell>{producto.editor}</TableCell>
                                            <TableCell>{producto.precio}</TableCell>
                                            <TableCell>{producto.stock}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default AgregarProducto;
