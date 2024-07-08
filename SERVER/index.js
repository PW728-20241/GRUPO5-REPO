import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { sequelize } from "./database/database.js";
import QRCode from 'qrcode';
import { Sequelize, Op } from "sequelize";
import {
  Usuario,
  Producto,
  Serie,
  Orden,
  OrderProduct,
} from "./models/Relation.js";

const app = express();
const port = process.env.PORT || 4000;



app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
async function verificacionConexion() {
  try {
    sequelize.authenticate();
    console.log("Conexion satisfactoria con la BD");
    await sequelize.sync();
  } catch (error) {
    console.error("No se puede conectar a la BD", error);
  }
}

app.post('/generate-qr', (req, res) => {
    const { orderId } = req.body;
    const qrData = `Order ID: ${orderId}`;
    QRCode.toDataURL(qrData, (err, url) => {
      if (err) {
        console.error('Error generating QR code:', err);
        res.status(500).json({ error: 'Failed to generate QR code' });
      } else {
        res.status(200).json({ qrUrl: url });
      }
    });
  });

app.get("/productos", async function (req, res) {
  const listaProducto = await Producto.findAll();
  res.json(listaProducto);
});

app.delete("/productos/:id", async function (req, res) {
  const id = req.params.id;
  try {
    await Producto.destroy({
      where: {
        id: id,
      },
    });
    res.send("Producto eliminado");
  } catch (error) {
    console.log("Ocurrio un error: ", error);
    res.status(400).send("Ocurrio un error");
  }
});

app.get("/producto/id/:id", async function (req, res) {
  const id = parseInt(req.params.id, 10);
  const producto = await Producto.findByPk(id);
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.put("/producto/:id", async function (req, res) {
  const id = req.params.id;
  const data = req.body;
  if (data.nombre) {
    const productoModificado = await Producto.update(
      {
        nombre: data.nombre,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } else {
    res.status(400).send("No se encuentra el producto");
  }
});
  

app.get('/busquedaordensenusuarios', async (req, res) => {
    const { usuarioId, id } = req.query;
    try {
      let ordenes;
      if (id) {
        ordenes = await Orden.findAll({ where: { id, usuarioId } });
      } else {
        ordenes = await Orden.findAll({ where: { usuarioId } });
      }
      res.json(ordenes);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

app.get("/buscar", async function (req, res) {
  const query = req.query.query.toLowerCase();
  const resultados = await Producto.findAll({
    where: {
      nombre: {
        [Sequelize.Op.iLike]: `%${query}%`, 
      },
    },
  });

  if (resultados.length > 0) {
    res.json(resultados);
  } else {
    res
      .status(404)
      .send("No se encontraron productos que coincidan con la búsqueda.");
  }
});

app.get("/productos-url", function (req, res) {
  const { id, nombre, editor, estado } = req.query;
  let productoFiltrado = arreglo_general;
  if (id || nombre || editor || estado) {
    productoFiltrado = productoFiltrado.filter((pub) => {
      return (
        (id && pub.id == id) ||
        (nombre && pub.nombre.toLowerCase() == nombre.toLowerCase()) ||
        (editor && pub.editor.toLowerCase() == editor.toLowerCase()) ||
        (estado && pub.estado.toLowerCase() == estado.toLowerCase())
      );
    });
  }
  if (productoFiltrado.length > 0) {
    res.json(productoFiltrado);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});
app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.correo = correo;
    await usuario.save();

    res.json(usuario);
  } catch (error) {
    console.error("Error al actualizar los datos del usuario:", error);
    res
      .status(500)
      .json({ message: "Error al actualizar los datos del usuario" });
  }
});

app.put("/usuarios/:id/cambiar-password", async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verifica la contraseña actual
    if (usuario.password !== currentPassword) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }

  
    usuario.password = newPassword;
    await usuario.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    res.status(500).json({ message: "Error al cambiar la contraseña" });
  }
});

app.get("/usuarios/fechaRegistro/:fechaRegistro", async function (req, res) {
  const fechaRegistro = req.params.fechaRegistro.substring(0, 10);
  const fechaInicio = new Date(`${fechaRegistro}T00:00:00.000Z`);
  const fechaFin = new Date(`${fechaRegistro}T23:59:59.999Z`);

  try {
    const usuarios = await Usuario.findAll({
      where: {
        fechaRegistro: {
          [Op.between]: [fechaInicio, fechaFin], 
        },
      },
    });

    if (usuarios.length > 0) {
      res.json(usuarios);
    } else {
      res.status(404).json({ error: "Usuarios no encontrados" });
    }
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/orden/fechaOrden/:fechaOrden", async function (req, res) {
  const fechaOrden = req.params.fechaOrden.substring(0, 10);
  const fechaInicio = new Date(`${fechaOrden}T00:00:00.000Z`);
  const fechaFin = new Date(`${fechaOrden}T23:59:59.999Z`);

  try {
    const orden = await Orden.findAll({
      where: {
        fechaOrden: {
          [Op.between]: [fechaInicio, fechaFin], 
        },
      },
    });

    if (orden.length > 0) {
      res.json(orden);
    } else {
      res.status(404).json({ error: "Ordenes no encontradas" });
    }
  } catch (error) {
    console.error("Error al buscar ordenes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
app.get("/productos/random", async (req, res) => {
  try {
    const productos = await Producto.findAll();
    const randomItems = productos.sort(() => 0.5 - Math.random()).slice(0, 5);

    const productosConUrlCompleta = randomItems.map(producto => {
      if (producto.imageUrl.startsWith('http')) {
        return producto;
      } else {
        return {
          ...producto.toJSON(),
          imageUrl: `http://grupo5final.azurewebsites.net${producto.imageUrl}`
        };
      }
    });

    res.json(productosConUrlCompleta);
  } catch (error) {
    console.error("Error fetching random products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


  

app.post("/productos", async (req, res) => {
  const {
    nombre,
    descripcion,
    caracteristicas,
    editor,
    precio,
    stock,
    imageUrl,
  } = req.body;

  try {
    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      caracteristicas,
      editor,
      precio,
      stock,
      estado: "Activo",
      imageUrl: "",
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.put("/productos/:id", function (req, res) {
  const id = req.params.id;
  const data = req.body;

  if (
    data.nombre &&
    data.editor &&
    data.precio &&
    data.fechaRegistro &&
    data.stock
  ) {
    const producto = arreglo_general.find((pub) => pub.id == id);
    if (producto) {
      arreglo_general.nombre = data.nombre;
      arreglo_general.editor = data.editor;
      arreglo_general.precio = data.precio;
      arreglo_general.fechaRegistro = data.fechaRegistro;
      arreglo_general.stock = data.stock;
      res.json(producto);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } else {
    res.status(400).send("Faltan datos");
  }
});

app.delete("/productos/:id", function (req, res) {
  const id = req.params.id;
  const producto = arreglo_general.find((pub) => pub.id == id);
  if (producto) {
    producto.estado = "Eliminado";
    res.json(producto);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});




app.get("/usuarios", async function (req, res) {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

/* SIRVE PARA BUSCAR UN USUARIO POR SU NOMBRE */
app.get("/usuarios/:busqueda", async function (req, res) {
  const query = req.params.busqueda.toLowerCase();
  try {
    const usuarios = await Usuario.findAll({
      where: {
        [Op.or]: [
          {
            nombre: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            apellido: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            correo: {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
    });
    if (usuarios.length > 0) {
      res.json(usuarios);
    } else {
      res
        .status(404)
        .send("No se encontraron usuarios que coincidan con la búsqueda.");
    }
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    res.status(500).send("Error interno del servidor");
  }
});

/* ESTO SIRVE PARA CAMBIAR ESTADO A UN USUARIO PERO USANDO EL PUT*/
app.put("/usuarios/cambioEstado/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      const nuevoEstado = usuario.estado === "Activo" ? "Inactivo" : "Activo";
      await usuario.update({ estado: nuevoEstado });
      res.json({
        mensaje: `Usuario actualizado a estado: ${nuevoEstado}`,
        usuario,
      });
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Ocurrió un error al cambiar el estado del usuario:", error);
    res.status(500).send("Ocurrió un error al cambiar el estado del usuario");
  }
});
app.get('/busquedadeorden', async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const orden = await Orden.findOne({ where: { id } });
      if (orden) {
        res.json(orden);
      } else {
        res.status(404).json({ error: 'Orden no encontrada' });
      }
    } else {
      const ordenes = await Orden.findAll();
      res.json(ordenes);
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
/**ENDPOINT QUE ME VA A PERMITIR MOSTRAR EL DETALLE DEL USUARIO AL CLICKEAR VER */
app.get('/usuarios/detalle/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
app.get('/usuario/:id/ordenes', async (req, res) => {
    const { id } = req.params;
    try {
        const ordenes = await Orden.findAll({
            where: { usuarioId: id },
            limit: 10 // Limita el número de órdenes a 10
        });
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/** NOS MUESTRA TODA LA LISTA DE ORDENES USANDO UN ATRIBUTO DE LA TABLA DE USUARIOS*/
app.get("/ordenes1", async (req, res) => {
  try {
    const ordenes = await Orden.findAll({
      attributes: [
        "id",
        [
          sequelize.literal(
            `"Usuario"."nombre" || ' ' || "Usuario"."apellido"`
          ),
          "nombreUsuario",
        ], //ESTO SIRVE PARA PODER HACER UNA SENTENCIA SQL :)
        "fechaOrden",
        "total",
        [sequelize.col("Usuario.correo"), "correoUsuario"],
        "estado",
      ],
      include: [
        {
          model: Usuario,
          attributes: [], // AQUI SE INCLUYE LOS ATRIBUTOS QUE COLECTAMOS COMO LISTA AAAA
        },
      ],
    });
    if (ordenes.length > 0) {
      res.json(ordenes);
    } else {
      res.status(404).send("No se encontraron órdenes.");
    }
  } catch (error) {
    console.error("Error al obtener la lista de órdenes:", error);
    res.status(500).send("Error interno del servidor");
  }
});

/**SIRVE PARA BUSCAR UNA ORDEN DE ACUERDO A CIERTOS PARAMETROS **/
app.get("/ordenes-url", async function (req, res) {
  const { id, usuario } = req.query;
  try {
    const orden = await Orden.findAll({
      where: {
        id: id,
        usuario: usuario,
      },
    });
    if (orden) {
      res.json(orden);
    } else {
      res.status(404).send("Orden no econtrada");
    }
  } catch (error) {
    res.status(404).send(error, "Error al obtener la orden");
  }
});






app.post("/registrar", async (req, res) => {
  const { nombre, apellido, correo, password } = req.body;

  try {
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      password,
      fechaRegistro: new Date(),
      estado: "Activo",
    });
    res.json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "No se pudo crear el usuario" });
  }
});

app.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (password !== usuario.password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.json({
      message: "Inicio de sesión exitoso",
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el inicio de sesión" });
  }
});

app.post("/recuperarPassword", async (req, res) => {
  const { correo } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (usuario) {
      
      res.json({ message: "Correo de recuperación enviado" });
    } else {
      res.status(404).json({ error: "Correo no encontrado" });
    }
  } catch (error) {
    console.error("Error al recuperar contraseña:", error);
    res.status(500).json({ error: "No se pudo recuperar la contraseña" });
  }
});

/*
ENDPOINTS PARA ORDENES
*/

app.post('/orden', async (req, res) => {
  const { shippingAddress, paymentMethod, creditCard, cartItems, total, shippingMethod, userId } = req.body;

  try {
    // Crear la orden
    const newOrder = await Orden.create({
      direccion: shippingAddress,
      metodoPago: paymentMethod,
      metodoEnvio: shippingMethod,
      total,
      estado: 'pendiente',
      usuarioId: userId
    });

    // Crear las relaciones de productos en la orden y reducir el stock
    for (const item of cartItems) {
      await OrderProduct.create({
        ordenId: newOrder.id,
        productoId: item.id,
        cantidad: item.cantidad
      });

      const producto = await Producto.findByPk(item.id);
      if (producto) {
        producto.stock -= item.cantidad;
        await producto.save();
      }
    }

    res.json(newOrder);
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.get('/ordenes', async (req, res) => {
    const usuarioId = req.query.usuarioId;
  
    if (!usuarioId) {
      return res.status(400).json({ error: 'usuarioId es requerido' });
    }
  
    try {
      const ordenes = await Orden.findAll({
        where: {
          usuarioId: usuarioId
        }
      });
  
      res.json(ordenes);
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
      res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
  });
  

// Obtener una orden por ID
app.get("/orden/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const orden = await Orden.findByPk(id, {
      include: [
        {
          model: OrderProduct,
          include: [Producto],
        },
      ],
    });

    if (!orden) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.json(orden);
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    res.status(500).json({ message: "Error al obtener la orden" });
  }
});
app.delete("/orden/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const orden = await Orden.findByPk(id);

    if (!orden) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    await OrderProduct.destroy({ where: { ordenId: id } });
    await orden.destroy();

    res.status(200).json({ message: "Orden cancelada exitosamente" });
  } catch (error) {
    console.error("Error al cancelar la orden:", error);
    res.status(500).json({ message: "Error al cancelar la orden" });
  }
});

// Actualizar una orden por ID
app.put("/ordenes/:id", async (req, res) => {
  const { id } = req.params;
  const { fechaOrden, total, estado, metodoEnvio, metodoPago, direccion } =
    req.body;

  try {
    const orden = await Orden.findByPk(id);

    if (!orden) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    await orden.update({
      fechaOrden,
      total,
      estado,
      metodoEnvio,
      metodoPago,
      direccion,
    });

    res.json(orden);
  } catch (error) {
    console.error("Error actualizando la orden:", error);
    res.status(500).json({ error: "Error interno al actualizar la orden" });
  }
});

/*
TERMINA ACA LOS ENDPOINTS PARA ORDENES
*/

// Endpoint para obtener todas las series con sus productos
app.get("/series", async (req, res) => {
  try {
    const series = await Serie.findAll({
      include: [
        {
          model: Producto,
          attributes: [],
        },
      ],
      attributes: [
        "id",
        "nombre",
        "descripcion",
        "fechaCreacion",
        "numeroProductos",
        "imgUrl",
        [sequelize.fn("COUNT", sequelize.col("Productos.id")), "nroproductos"],
      ],
      group: [
        "Serie.id",
        "Serie.nombre",
        "Serie.descripcion",
        "Serie.fechaCreacion",
        "Serie.numeroProductos",
        "Serie.imgUrl",
      ],
    });

    res.json(series);
  } catch (error) {
    console.error("Error obteniendo las series:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.post("/series", async (req, res) => {
  const { nombre, descripcion, fechaCreacion, productos } = req.body;

  try {
    // Crear nueva serie en la base de datos
    const nuevaSerie = await Serie.create({
      nombre,
      descripcion,
      fechaCreacion,
      numeroProductos: productos.length,
    });

    // Establecer las relaciones con los productos
    for (const productoNombre of productos) {
      const producto = await Producto.findOne({
        where: { nombre: productoNombre },
      });
      if (producto) {
        producto.serieId = nuevaSerie.id;
        await producto.save();
      }
    }

    res.status(201).json(nuevaSerie);
  } catch (error) {
    console.error("Error creando la serie:", error);
    res.status(500).json({ error: "Error interno al crear la serie" });
  }
});
app.get("/series/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const serie = await Serie.findByPk(id, {
      include: Producto,
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("Productos.id")),
            "numeroProductos",
          ],
        ],
      },
      group: ["Serie.id", "Productos.id"],
    });
    if (!serie) {
      return res.status(404).json({ error: "Serie no encontrada" });
    }
    res.json(serie);
  } catch (error) {
    console.error("Error obteniendo la serie:", error);
    res.status(500).json({ error: "Error interno al obtener la serie" });
  }
});
app.put("/series/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, productos } = req.body;

  try {
    // Buscar la serie por ID
    const serie = await Serie.findByPk(id);

    if (!serie) {
      return res.status(404).json({ error: "Serie no encontrada" });
    }

    // Actualizar los datos de la serie
    serie.nombre = nombre;
    serie.descripcion = descripcion;

    // Guardar los cambios de la serie
    await serie.save();

    // Actualizar los productos asociados a la serie
    if (productos && productos.length > 0) {
      // Eliminar las asociaciones actuales
      await Producto.update({ serieId: null }, { where: { serieId: id } });

      // Asociar los nuevos productos
      for (const productName of productos) {
        const producto = await Producto.findOne({
          where: { nombre: productName },
        });
        if (producto) {
          producto.serieId = id;
          await producto.save();
        }
      }
    }

    res.status(200).json({ message: "Serie actualizada exitosamente" });
  } catch (error) {
    console.error("Error actualizando la serie:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
app.delete("/series/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const serie = await Serie.findByPk(id);
    if (!serie) {
      return res.status(404).json({ error: "Serie no encontrada" });
    }

    // Desvincular productos asociados
    await Producto.update({ serieId: null }, { where: { serieId: id } });

    await serie.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error eliminando la serie:", error);
    res.status(500).json({ error: "Error interno al eliminar la serie" });
  }
});


let carrito = [];
let guardadosParaDespues = [];


app.get("/carrito", (req, res) => {
  res.json(carrito);
});


app.post("/carrito", (req, res) => {
  const producto = req.body;
  carrito.push(producto);
  res.json(carrito);
});


app.delete("/carrito/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  carrito = carrito.filter((producto) => producto.id !== id);
  res.json(carrito);
});


app.post("/guardarParaDespues", (req, res) => {
  const producto = req.body;
  guardadosParaDespues.push(producto);
  carrito = carrito.filter((p) => p.id !== producto.id);
  res.json({ carrito, guardadosParaDespues });
});


app.get("/guardadosParaDespues", (req, res) => {
  res.json(guardadosParaDespues);
});


app.post("/moverAlCarrito", (req, res) => {
  const producto = req.body;
  carrito.push(producto);
  guardadosParaDespues = guardadosParaDespues.filter(
    (p) => p.id !== producto.id
  );
  res.json({ carrito, guardadosParaDespues });
});


app.listen(port, function () {
  console.log("Servidor escuchando en el puerto " + port);
  verificacionConexion();
});
