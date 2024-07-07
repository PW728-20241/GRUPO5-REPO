import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Usuario } from './Usuario.js';
export const Orden = sequelize.define('Orden', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaOrden: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    total: {
        type: DataTypes.FLOAT
    },
    estado: {
        type: DataTypes.STRING
    },
    metodoEnvio: {
        type: DataTypes.STRING
    },
    metodoPago: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },usuarioId: {
        type: DataTypes.INTEGER,
        references: {
          model: Usuario,
          key: 'id'
        }
      }
}, {
    freezeTableName: true,
    timestamps: false
});
