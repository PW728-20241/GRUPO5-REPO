import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const OrderProduct = sequelize.define('OrderProduct', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ordenId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Orden', // Nombre de la tabla a la que hace referencia
            key: 'id'
        }
    },
    productoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Producto', // Nombre de la tabla a la que hace referencia
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    precio: {
        type: DataTypes.FLOAT
    }
}, {
    freezeTableName: true,
    timestamps: false
});
