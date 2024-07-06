import React from "react";
import PropTypes from 'prop-types';
import { Button, TableCell, TableRow } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
function AgregarFila(props) {   
    const { producto } = props;
    async function eliminarProducto() {
        const respuesta = await fetch(`http://localhost:3100/productos/${producto.id}`, {method: 'DELETE'});
        if (respuesta.status == 200) {
            alert("Producto eliminado con éxito");
            window.location.href = window.location.href;
        } else {
            alert("No se ha podido eliminar el producto");
        }
    }
    return (
        <TableRow >
            <TableCell style={{ textAlign: 'center' }}>{producto.id}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{producto.nombre}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{producto.editor}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{parseFloat(producto.precio).toFixed(2)}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{producto.fechaRegistro.substring(0, 10)}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{producto.stock}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{producto.estado}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>
                <Button component={RouterLink} to={`/detalle/${producto.id}`} variant="text" size="small" style={{ fontWeight: 'bold', color: 'black' }}>
                    Ver
                </Button>
                <Button onClick={eliminarProducto} variant="text" size="small" style={{ fontWeight: 'bold', color: '#CC0000' }}>
                    Eliminar
                </Button>
            </TableCell>
        </TableRow>
        
    );
}

AgregarFila.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        editor: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        fechaRegistro: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
        estado: PropTypes.string.isRequired
    }).isRequired,
};

export default AgregarFila;
