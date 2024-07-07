import React, { useEffect, useState } from 'react';
import { Box, Container, TextField, Button, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SeriesDetail = () => {
  const { id } = useParams();
  const [serie, setSerie] = useState({});
  const [productos, setProductos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(`http://grupo5final.azurewebsites.net/series/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching series data');
        }
        let data = await response.json();
        setSerie(data);

        response = await fetch('http://grupo5final.azurewebsites.net/productos');
        if (!response.ok) {
          throw new Error('Error fetching products');
        }
        data = await response.json();
        setProductos(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, [id]);

  const handleAddProduct = (product) => {
    const updatedSerie = {
      ...serie,
      productos: [...(serie.productos || []), product.nombre]
    };
    setSerie(updatedSerie);
    setOpenDialog(false);
    updateSerie(updatedSerie);
  };

  const handleRemoveProduct = (productName) => {
    const updatedSerie = {
      ...serie,
      productos: serie.productos.filter(p => p !== productName)
    };
    setSerie(updatedSerie);
    updateSerie(updatedSerie);
  };

  const updateSerie = async (updatedSerie) => {
    try {
      const response = await fetch(`http://grupo5final.azurewebsites.net/series/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: updatedSerie.nombre,
          descripcion: updatedSerie.descripcion,
          productos: updatedSerie.productos
        })
      });
      if (!response.ok) {
        throw new Error('Error updating series');
      }
      const data = await response.json();
      console.log("Serie actualizada:", data);
    } catch (error) {
      console.error("Error actualizando la serie:", error);
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = productos.filter(product =>
      product.nombre.toLowerCase().includes(event.target.value.toLowerCase()) ||
      product.id.toString().includes(event.target.value)
    );
    setFilteredProducts(filtered);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Detalles de la Serie
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box 
                sx={{
                  width: '100%',
                  height: '300px',
                  border: '1px solid #ccc',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 2,
                  overflow: 'hidden',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${serie.imagen || ''})`,
                }}
              >
                {!serie.imagen && (
                  <Typography variant="h6" color="textSecondary" textAlign="center">
                    Previsualización de la imagen
                  </Typography>
                )}
              </Box>
              <Button variant="outlined" component="label" justifyContent="center">
                Agregar Imagen
                <input type="file" hidden onChange={(e) => console.log(e.target.files)} />
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label="Nombre"
                fullWidth
                margin="normal"
                variant="outlined"
                value={serie.nombre || ''}
                onChange={(e) => setSerie({ ...serie, nombre: e.target.value })}
              />
              <TextField
                label="Descripción"
                fullWidth
                margin="normal"
                variant="outlined"
                value={serie.descripcion || ''}
                onChange={(e) => setSerie({ ...serie, descripcion: e.target.value })}
              />
              <Typography variant="h6" sx={{ mt: 3 }}>
                Productos en la serie
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Descripción</TableCell>
                      <TableCell>Acción</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {serie.productos && serie.productos.map((productName) => (
                      <TableRow key={productName}>
                        <TableCell>{productos.find(p => p.nombre === productName)?.id}</TableCell>
                        <TableCell>{productName}</TableCell>
                        <TableCell>
                          <IconButton color="error" onClick={() => handleRemoveProduct(productName)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <IconButton color="primary" onClick={() => setOpenDialog(true)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button variant="contained" color="primary" component={Link} to="/ListaSeries" fullWidth sx={{ mt: 2 }} onClick={() => updateSerie(serie)}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Agregar Producto</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            placeholder="Buscar por descripción o ID"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ marginBottom: 2 }}
          />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.nombre}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleAddProduct(product)}>Agregar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SeriesDetail;
