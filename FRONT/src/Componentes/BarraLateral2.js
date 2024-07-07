import React from 'react';
import { Paper, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Paper elevation={6} sx={{ height: '100%', pt: 2, ml: 5, mt: 5, width: "20%" }}>
      <List>
        <ListItem>
          <ListItemText primary="Admin" sx={{ textAlign: 'center' }} />
        </ListItem>

        <ListItem button sx={{ p: 1 }} onClick={() => handleNavigation('/Dashboard')}>
          <ListItemText primary="Dashboard" sx={{ textAlign: 'center' }} />
        </ListItem>

        <ListItem button sx={{ p: 1 }} onClick={() => handleNavigation('/ListaUsuariosAdmin')}>
          <ListItemText primary="Usuarios Registrados" sx={{ textAlign: 'center' }} />
        </ListItem>
        
        <ListItem button sx={{ p: 1 }} onClick={() => handleNavigation('/AdminProducto')}>
          <ListItemText primary="Productos" sx={{ textAlign: 'center' }} />
        </ListItem>

        <ListItem button sx={{ p: 1 }} onClick={() => handleNavigation('/ListaOrdenesAdmin')}>
          <ListItemText primary="Ordenes" sx={{ textAlign: 'center' }} />
        </ListItem>

        <ListItem button sx={{ p: 1 }} onClick={() => handleNavigation('/ListaSeries')}>
          <ListItemText primary="Series" sx={{ textAlign: 'center' }} />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Sidebar;
