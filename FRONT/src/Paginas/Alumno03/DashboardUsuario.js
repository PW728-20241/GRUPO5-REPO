import React, { useEffect, useState } from 'react';
import { Box, Button, Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Pagination } from '@mui/material';
import BarraLateral2 from '../../Componentes/BarraLateral1';
import Header2 from '../../Componentes/Header2';
import Footer from '../../Componentes/Footer';
import { useNavigate } from 'react-router-dom';

const ListaOrdenesusuario = () => {
  const [pagina, setPagina] = useState(1);
  const [filasPorPagina, setFilasPorPagina] = useState(5); 
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  async function obtenerOrdenes(query = "") {
    const user = JSON.parse(localStorage.getItem('user'));
    const usuarioId = user ? user.id : null;
    if (!usuarioId) {
      alert('No estás logueado');
      return;
    }
    const url_base = query ? `http://localhost:3100/busquedaordensenusuarios?usuarioId=${usuarioId}&id=${query}` : `http://localhost:3100/busquedaordensenusuarios?usuarioId=${usuarioId}`;
    try {
      const res = await fetch(url_base);
      if (res.status === 200) {
        const data = await res.json();
        setData(data);
      } else {
        alert("Error al obtener las órdenes");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    obtenerOrdenes();
  }, []);

  const handleSearch = () => {
    obtenerOrdenes(searchQuery);
  };

  const handleDesactivarOrden = async (ordenId) => {
    try {
      const response = await fetch(`http://localhost:3100/ordenes1/${ordenId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        alert("Esta orden ha sido desactivada");
        obtenerOrdenes();
      } else {
        alert("Error al desactivar la orden");
      }
    } catch (error) {
      console.error("Error al desactivar la orden:", error);
    }
  };

  const handleChangePagina = (event, nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  const handleVerDetalle = (ordenId) => {
    navigate(`/ordenes/${ordenId}`);
  };

  return (
    <>
      <Header2 />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <BarraLateral2 />
        <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" style={{ fontWeight: 'bold' }} gutterBottom>
              Lista de Órdenes
            </Typography>
            <Button variant="contained" style={{ backgroundColor: '#FFEB3B', color: 'black', fontWeight: 'bold' }}>
              Agregar Orden
            </Button>
          </Box>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Buscar por ID de orden..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button
                  type="button"
                  onClick={handleSearch}
                  variant="contained"
                  style={{ backgroundColor: '#FFEB3B', color: 'black', fontWeight: 'bold' }}
                >
                  Buscar
                </Button>
              ),
            }}
          />
          <Paper>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ textAlign: 'center' }}>ID</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Fecha de Orden</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Monto total</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Estado</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice((pagina - 1) * filasPorPagina, pagina * filasPorPagina).map((orden) => (
                    <TableRow key={orden.id}>
                      <TableCell style={{ textAlign: 'center' }}>{orden.id}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{new Date(orden.fechaOrden).toLocaleDateString()}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{orden.total}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{orden.estado}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        <Button variant="contained" color="primary" onClick={() => handleVerDetalle(orden.id)}>
                          Ver
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDesactivarOrden(orden.id)}>
                          Cancelar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
              <Typography variant="body2">Anterior</Typography>
              <Pagination
                count={Math.ceil(data.length / filasPorPagina)}
                page={pagina}
                onChange={handleChangePagina}
                shape="rounded"
                color="primary"
              />
              <Typography variant="body2">Siguiente</Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ListaOrdenesusuario;
