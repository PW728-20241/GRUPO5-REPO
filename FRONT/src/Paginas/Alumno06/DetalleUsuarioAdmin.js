import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link } from '@mui/material';
import BarraLateral2 from '../../Componentes/BarraLateral2';
import Header2 from '../../Componentes/Header2';
import Footer from '../../Componentes/Footer';

function DetalleUsuarioAdmin() {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const res = await fetch(`http://grupo5final.azurewebsites.net/usuarios/detalle/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setUsuario(data);
                } else {
                    console.error('Error fetching user:', res.status);
                    setUsuario(null);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUsuario(null);
            }
        };

        const fetchOrdenes = async () => {
            try {
                const res = await fetch(`http://grupo5final.azurewebsites.net/usuario/${id}/ordenes`);
                if (res.ok) {
                    const data = await res.json();
                    setOrdenes(data);
                } else {
                    console.error('Error fetching orders:', res.status);
                    setOrdenes([]);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                setOrdenes([]);
            }
        };

        if (id) {
            fetchUsuario();
            fetchOrdenes();
        }
    }, [id]);

    return (
        <>
            <Header2 />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <BarraLateral2 />
                <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Detalle de Usuario Registrado
                    </Typography>
                    {usuario ? (
                        <Paper sx={{ p: 2, mb: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Typography variant="body1" sx={{ flex: '1 1 50%', pr: 2 }}>
                                    <strong>ID:</strong> {usuario.id} <br />
                                    <strong>Nombre:</strong> {usuario.nombreCompleto} <br />
                                    <strong>Correo:</strong> {usuario.correo} <br />
                                    <strong>Fecha de Registro:</strong> {usuario.fechaRegistro}
                                </Typography>
                            </Box>
                        </Paper>
                    ) : (
                        <Typography variant="body1">Cargando datos de usuario...</Typography>
                    )}
                    <Typography variant="h6" gutterBottom>
                        Órdenes recientes (máximo 10)
                    </Typography>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Fecha de Orden</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ordenes.length > 0 ? ordenes.map((orden, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{orden.id}</TableCell>
                                            <TableCell>{new Date(orden.fechaOrden).toLocaleDateString()}</TableCell>
                                            <TableCell>{orden.total}</TableCell>
                                            <TableCell>{orden.estado}</TableCell>
                                            <TableCell>
                                                <Link href={`/ordenes/${orden.id}`} underline="hover">
                                                    Ver Detalle
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                                                No hay órdenes disponibles
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            </Box>
            <Footer />
        </>
    );
}

export default DetalleUsuarioAdmin;
