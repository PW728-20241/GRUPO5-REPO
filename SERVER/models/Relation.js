import { Usuario } from './Usuario.js';
import { Producto } from './Producto.js';
import { Serie } from './Serie.js';
import { Orden } from './Orden.js';
import { OrderProduct } from './OrderProduct.js';

Usuario.hasMany(Orden, { foreignKey: 'usuarioId' });
Orden.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Serie.hasMany(Producto, { foreignKey: 'serieId' });
Producto.belongsTo(Serie, { foreignKey: 'serieId' });

Orden.belongsToMany(Producto, { through: OrderProduct, foreignKey: 'ordenId' });
Producto.belongsToMany(Orden, { through: OrderProduct, foreignKey: 'productoId' });

OrderProduct.belongsTo(Orden, { foreignKey: 'ordenId' });
OrderProduct.belongsTo(Producto, { foreignKey: 'productoId' });

Orden.hasMany(OrderProduct, { foreignKey: 'ordenId' });
Producto.hasMany(OrderProduct, { foreignKey: 'productoId' });

export { Usuario, Producto, Serie, Orden, OrderProduct };
