import React from 'react';
import PropTypes from 'prop-types';
import { Button, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RellenarOrden = ({ orden }) => {
  const navigate = useNavigate();

  const handleVerClick = () => {
    navigate(`/DetalleOrdenAdmin/${orden.id}`);
  };

  const formatCurrency = (amount) => {
    return `S/. ${amount.toFixed(2)}`;
  };

  return (
    <TableRow>
      <TableCell style={{ textAlign: 'center' }}>{orden.id}</TableCell>
      <TableCell style={{ textAlign: 'center' }}>{orden.usuarioId}</TableCell>
      <TableCell style={{ textAlign: 'center' }}>{orden.fechaOrden}</TableCell>
      <TableCell style={{ textAlign: 'center' }}>{formatCurrency(parseFloat(orden.total))}</TableCell>
      <TableCell style={{ textAlign: 'center' }}>{orden.correoUsuario}</TableCell>
      <TableCell style={{ textAlign: 'center' }}>{orden.estado}</TableCell>
      <TableCell style={{ textAlign: 'center' }}>
        <Button
          variant="text"
          size="small"
          style={{ fontWeight: 'bold', color: 'black' }}
          onClick={handleVerClick}
        >
          Ver
        </Button>
      </TableCell>
    </TableRow>
  );
};

RellenarOrden.propTypes = {
  orden: PropTypes.shape({
    id: PropTypes.number.isRequired,
    usuarioId: PropTypes.string.isRequired,
    fechaOrden: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
    correoUsuario: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
  }).isRequired,
};

export default RellenarOrden;
