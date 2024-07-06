import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Serie = sequelize.define('Serie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    fechaCreacion: {
        type: DataTypes.DATE
    },
    numeroProductos: {
        type: DataTypes.INTEGER
    },
    imgUrl: {
        type: DataTypes.STRING
    },
    numeroProductos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    freezeTableName: true,
    timestamps: false
});
