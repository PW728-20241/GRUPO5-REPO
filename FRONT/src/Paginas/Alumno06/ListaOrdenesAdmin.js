import React, { useEffect, useState } from 'react';
import { Box, Button, Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Pagination } from '@mui/material';
import BarraLateral2 from '../../Componentes/BarraLateral2';
import Header2 from '../../Componentes/Header2';
import Footer from '../../Componentes/Footer';
import RellenarOrden from './ContenidoTablaOrdenes';
import { useNavigate } from 'react-router-dom';

const ListaOrdenesAdmin = () => {
  const [pagina, setPagina] = useState(1);
  const [filasPorPagina, setFilasPorPagina] = useState(5);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  async function obtenerOrdenes(query="") {
    const url_base = `http://grupo5final.azurewebsites.net/busquedadeorden`;
    const url = query ? `${url_base}?id=${query}` : url_base; 
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        setData(Array.isArray(data) ? data : [data]);
      } else if (res.status === 404) {
        alert("Orden no encontrada");
        setData([]);
      } else {
        alert("Error al buscar la orden");
        setData([]);
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
      const response = await fetch(`http://grupo5final.azurewebsites.net/ordenes1/${ordenId}`, {
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
                    <TableCell style={{ textAlign: 'center' }}>Usuario</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Fecha de Orden</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Monto total</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Correo</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Estado</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? (
                    data.slice((pagina - 1) * filasPorPagina, pagina * filasPorPagina).map((orden, index) => (
                      <RellenarOrden key={index} orden={orden} />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} style={{ textAlign: 'center' }}>No hay datos disponibles</TableCell>
                    </TableRow>
                  )}
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

export default ListaOrdenesAdmin;
