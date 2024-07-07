import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword !== repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;
    if (!userId) {
      alert('No estás logueado');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3100/usuarios/${userId}/cambiar-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      if (response.ok) {
        alert('Contraseña actualizada correctamente');
        // Actualizar la contraseña en el localStorage
        user.password = newPassword;
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setError('Error al cambiar la contraseña');
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
          Cambiar Password
        </Typography>
        <Box component="form" gap={4} p={2} noValidate autoComplete="off">
          <TextField
            label="Actual"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="Nuevo"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Repetir"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          {error && (
            <Typography sx={{ color: 'red', mt: 2 }}>
              {error}
            </Typography>
          )}
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
              onClick={handlePasswordChange}
            >
              Cambiar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
