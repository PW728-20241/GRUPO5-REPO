import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

const Detalle = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
    } else {
      alert('No estás logueado');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://grupo5final.azurewebsites.net/usuarios/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Datos actualizados correctamente');
      } else {
        alert('Error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      alert('Error al actualizar los datos');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        sx={{
          p: 3,
          background: 'transparent',
          textAlign: "left",
          width: "100%",
          margin: "auto"
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ 
            backgroundColor: "grey", 
            p: 1,
            textAlign: "left",
            borderColor: 'black',
            borderWidth: 1,
            borderStyle: 'solid',
            width: "100%",
            maxWidth: 900
          }}
        >
          Datos de Registro
        </Typography>
        <Box component="form" gap={4} p={2} noValidate autoComplete="off">
          <TextField
            label="Nombre"
            name="nombre"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            value={userData.nombre}
            onChange={handleInputChange}
          />
          <TextField
            label="Apellido"
            name="apellido"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            value={userData.apellido}
            onChange={handleInputChange}
          />
          <TextField
            label="Correo"
            name="correo"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={userData.correo}
            onChange={handleInputChange}
          />
          <Box textAlign="center">
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                background: "black",
                color: "White",
                width: "50%",
                textAlign: "center",
              }}
              onClick={handleUpdate}
            >
              Actualizar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Detalle;
