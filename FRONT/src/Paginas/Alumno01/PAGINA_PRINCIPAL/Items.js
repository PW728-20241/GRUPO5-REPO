import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Subrayado = styled(RouterLink)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif',
  color: '#000000',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Items = ({ items }) => {
  return (
    <Grid container spacing={4} justifyContent="center" pb={4}>
      {items.map((item, index) => (
        <Grid item xs={6} sm={4} md={2} key={index}>
          <Box
            borderRadius={3}
            width="100%"
            height={150}
            bgcolor="grey.300"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}
            p={1}
            sx={{
              backgroundImage: `url(${item.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            
          </Box>
          <Typography variant="h6" align="left">{item.nombre}</Typography>
          <Subrayado to={`/detalle/${item.id}`} pb={4}>Learn More</Subrayado>
        </Grid>
      ))}
    </Grid>
  );
};

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Items;
