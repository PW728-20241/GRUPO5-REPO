import React, { useState, useEffect } from 'react';
import { Box, Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Button, Pagination } from '@mui/material';
import BarraLateral2 from '../../Componentes/BarraLateral2';
import Header2 from '../../Componentes/Header2';
import Footer from '../../Componentes/Footer';
import RellenarUsuario from "./ContenidoTablaUsuarios";

const drawerWidth = 240;

function ListaUsuarios() {
  const [pagina, setPagina] = useState(1);
  const [filasPorPagina, setFilasPorPagina] = useState(4);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePagina = (event, nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  const handleChangeFilasPorPagina = (event) => {
    setFilasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  async function busquedaDatos(query = "") {
    const url_base = "http://localhost:3100/usuarios";
    const url = query ? `${url_base}/${query}` : url_base;

    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        setData(data);
      } else if (res.status === 404) {
        setData([]);
        alert("No se encontraron usuarios que coincidan con la búsqueda.");
      } else {
        alert("Error al buscar los usuarios.");
      }
    } catch (error) {
      console.error('Error al buscar los datos:', error);
    }
  }

  useEffect(() => {
    busquedaDatos();
  }, []);

  const handleSearch = () => {
    busquedaDatos(searchQuery);
  };

  const handleEstadoChange = async (id) => {
    try {
      const res = await fetch(`http://localhost:3100/usuarios/cambioEstado/${id}`, {
        method: 'PUT'
      });

      if (res.status === 200) {
        const updatedUsuario = await res.json();
        setData(data.map(user => user.id === id ? { ...user, estado: updatedUsuario.usuario.estado } : user));
        alert(`Usuario actualizado a estado: ${updatedUsuario.usuario.estado}`);
      } else {
        alert("No se pudo cambiar el estado del usuario");
      }
    } catch (error) {
      console.error('Error cambiando el estado del usuario:', error);
    }
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
              Usuarios registrados
            </Typography>
          </Box>
          <TextField
            fullWidth
            id="buscarU"
            margin="normal"
            variant="outlined"
            placeholder="Buscar por correo, nombre o apellidos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button type="button" onClick={handleSearch} variant="contained" component="label" style={{ backgroundColor: '#FFEB3B', color: 'black', fontWeight: 'bold' }}>
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
                    <TableCell style={{ textAlign: 'center' }}>Nombre</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Apellido</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Correo</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Fecha de Registro</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Estado</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? data.map((item, index) => (
                    <RellenarUsuario key={index} usuario={item} onEstadoChange={handleEstadoChange} />
                  )) : (
                    <TableRow>
                      <TableCell colSpan={8} style={{ textAlign: 'center' }}>No hay datos disponibles</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
              <Typography variant="body2">Anterior</Typography>
              <Pagination
              />
              <Typography variant="body2">Siguiente</Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default ListaUsuarios;
