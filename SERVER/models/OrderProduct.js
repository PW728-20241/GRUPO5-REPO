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
            model: 'Orden', 
            key: 'id'
        }
    },
    productoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Producto', 
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
