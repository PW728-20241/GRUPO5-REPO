import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RellenarUsuario({ usuario, onEstadoChange }) {
    const navigate = useNavigate();

    const handleViewUser = () => {
        navigate(`/usuarios/${usuario.id}`);
    };

    const handleToggleEstado = () => {
        onEstadoChange(usuario.id);
    };

    return (
        <TableRow>
            <TableCell style={{ textAlign: 'center' }}>{usuario.id}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{usuario.nombre}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{usuario.apellido}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{usuario.correo}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{usuario.fechaRegistro}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{usuario.estado}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>
                <Button
                    onClick={handleViewUser}
                    variant="text" size="small" style={{ fontWeight: 'bold', color: 'black' }}
                >
                    VER
                </Button>
                <Button
                    onClick={handleToggleEstado}
                    variant="text" size="small" style={{ fontWeight: 'bold', color: '#CC0000' }}
                >
                    CAMBIAR
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default RellenarUsuario;
