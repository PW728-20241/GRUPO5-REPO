import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, TablePagination, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const SeriesTable = () => {
  const [series, setSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetch('http://localhost:3100/series')
      .then(response => response.json())
      .then(data => {
        setSeries(data);
        setFilteredSeries(data);
      })
      .catch(error => console.error('Error fetching series:', error));
  }, []);

  useEffect(() => {
    const filtered = series.filter(serie =>
      serie.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serie.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serie.id.toString().includes(searchTerm)
    );
    setFilteredSeries(filtered);
  }, [searchTerm, series]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper elevation={3} sx={{ margin: 'center', padding: 2 }}>
      <Typography variant="h6" gutterBottom>Series</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <TextField
          fullWidth
          placeholder="Buscar por nombre, descripción o ID..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" component={Link} to="/crear-serie">
          Crear serie
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ padding: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Nro. Productos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSeries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((serie) => (
              <TableRow key={serie.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{serie.id}</TableCell>
                <TableCell>{serie.nombre}</TableCell>
                <TableCell>{serie.descripcion}</TableCell>
                <TableCell>{new Date(serie.fechaCreacion).toLocaleDateString()}</TableCell>
                <TableCell>{serie.nroproductos}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" component={Link} to={`/ver/serie/${serie.id}`}>
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredSeries.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
      />
    </Paper>
  );
};

export default SeriesTable;
