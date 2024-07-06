import React from "react";
import PropTypes from 'prop-types';
import {Grid, Paper, Typography} from '@mui/material';

function infoDiaX(props)
{   
    const {infoDia} = props;

    return(
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2, textAlign:'center', backgroundColor: '#FFEB3B'}}>
                        <Typography variant="h3">{infoDia.cantOrdenesDia}</Typography>
                        <Typography>&Oacute;rdenes del d&iacute;a de hoy</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2, textAlign:'center', backgroundColor: '#FFEB3B'}}>
                        <Typography variant="h3">{infoDia.cantUsuarioNuevos}</Typography>
                        <Typography>Usuarios nuevos</Typography>
                    </Paper>
                    
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2, textAlign:'center', backgroundColor: '#FFEB3B'}}>
                        <Typography variant="h3">S/ {parseFloat(infoDia.ingresosDia).toFixed(2)}</Typography>
                        <Typography>Ingresos de hoy</Typography>
                    </Paper>
                </Grid>
            </Grid>
    );
}
infoDiaX.propTypes =
{
    infoDia: PropTypes.shape({
        cantUsuarioNuevos:PropTypes.number.isRequired,
        cantOrdenesDia:PropTypes.number.isRequired,
        ingresosDia:PropTypes.number.isRequired,
        Fecha:PropTypes.string.isRequired
    }).isRequired,
};
export default infoDiaX;