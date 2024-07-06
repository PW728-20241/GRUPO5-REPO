import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { faker } from '@faker-js/faker';

import { sequelize } from "./database/database.js";


import { Sequelize, Op} from "sequelize";
import { Usuario, Producto, Serie, Orden, OrderProduct } from './models/Relation.js';


const app = express();
const port = 3100;

app.use(cors({
    origin: 'http://localhost:3000' 
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use('/images', express.static('Imagenes'));

async function verificacionConexion(){
    try{
        sequelize.authenticate();
        console.log("Conexion satisfactoria con la BD");
        await sequelize.sync();
    }
    catch(error){
        console.error("No se puede conectar a la BD",error);
    }
}


/*
-----------------------------------------------------
...................ALUMNO 1..........................
-----------------------------------------------------
*/

/*function crearProducto(id, nombre, precio, editor, fechaRegistro, stock, imageUrl, categoria, nuevo) {
    return {
        id: id,
        nombre: nombre,
        editor: editor,
        precio: precio,
        fechaRegistro: fechaRegistro,
        stock: stock,
        estado: "Activo",
        imageUrl: imageUrl,
        categoria: categoria,
        nuevo: nuevo,
        descripcion: faker.commerce.productDescription(),
        caracteristicas: Array.from({ length: 5 }, () => faker.commerce.productMaterial())
    };
}*/

/*const productos = [
    crearProducto(1, "Assassin's Creed II", 60.00, "Ubisoft", "2024-06-25", 10, "/images/ezio.jpeg", "Aventura", false),
    crearProducto(2, "FIFA 2022", 49.99, "EA Sports", "2024-06-25", 15, "/images/FIFA_22.webp", "Deportes", false),
    crearProducto(3, "God of War", 59.99, "Sony", "2024-06-25", 5, "/images/god.avif", "Acción", false),
    crearProducto(4, "Grand Theft Auto V", 39.99, "Rockstar", "2024-06-25", 20, "/images/Grand_Theft_Auto_V.png", "Aventura", false),
    crearProducto(5, "Mortal Kombat I", 54.99, "NetherRealm", "2024-06-25", 12, "/images/mortal.avif", "Lucha", false),
    crearProducto(6, "Minecraft", 29.99, "Mojang", "2024-06-25", 30, "/images/mine.webp", "Aventura", false),
    crearProducto(7, "Horizon Zero Dawn", 49.99, "Guerrilla", "2024-06-25", 8, "/images/hori.webp", "Aventura", false),
    crearProducto(8, "PUBG", 19.99, "PUBG Corp", "2024-06-25", 25, "/images/pub.png", "Disparos", false),
    crearProducto(9, "The Last Of Us Part II", 59.99, "Naughty Dog", "2024-06-25", 18, "/images/last.webp", "Aventura", false),
    crearProducto(10, "The Last Of Us", 39.99, "Naughty Dog", "2024-06-25", 14, "/images/lastofus.avif", "Aventura", false),
    crearProducto(11, "Red Dead Redemption 2", 59.99, "Rockstar", "2024-06-25", 22, "/images/red.avif", "Aventura", false),
    crearProducto(12, "Super Mario Maker", 49.99, "Nintendo", "2024-06-25", 7, "/images/Super_Mario_Maker_Artwork.jpg", "Plataformas", false),
    crearProducto(13, "God of War PO", 69.99, "Sony", "2024-06-25", 9, "/images/ragna.webp", "Acción", false),
    crearProducto(14, "Uncharted", 39.99, "Naughty Dog", "2024-06-25", 16, "/images/uncharted.jpg", "Aventura", false),
    crearProducto(15, "WWE 2020", 49.99, "2K", "2024-06-25", 11, "/images/WWE_2K2.jpg", "Deportes", false),


    crearProducto(16, "Magic The Gathering: Colección de Invierno Fase 2 2024 Nueva Temporada", 99.99, "Wizards of the Coast", "2024-06-25", 3, "/images/WWE_2K2.jpg", "Various", true),
    crearProducto(17, "GI Joe Classified Series Big Boa, Airborne & More", 79.99, "Hasbro", "2024-06-25", 6, "/images/ufc.jpg", "Various", true),
    crearProducto(18, "Spawn 30 Anniversary", 89.99, "McFarlane Toys", "2024-06-25", 4, "/images/injustice.jpg", "Various", true),


    crearProducto(19, "Colección de Items 1: Juegos para regresar al colegio", 29.99, "Various", "2024-06-25", 27, "/images/casa.jpeg", "Colección", false),
    crearProducto(20, "Colección de Items 2: Juegos para la casa", 19.99, "Various", "2024-06-25", 35, "/images/colegio.jpeg", "Colección", false),
    crearProducto(21, "Colección de Items 3: Juegos para los pequeños", 24.99, "Various", "2024-06-25", 42, "/images/niños.webp", "Colección", false)
];*/


/*app.get('/contenido', function(req, res){
    res.json(productos);
});*/

app.get("/productos", async function(req,res){
    const listaProducto = await Producto.findAll();
    res.json(listaProducto);

});


app.delete('/productos/:id',async function(req,res)
{
    const id = req.params.id;
    try{
        await Producto.destroy({
            where:{
                id:id
            }
        })
        res.send("Producto eliminado");
    }
    catch(error){
        console.log("Ocurrio un error: ",error);
        res.status(400).send("Ocurrio un error");
    }
    
});

app.get('/producto/id/:id', async function(req, res) {
    const id = parseInt(req.params.id, 10);
    const producto = await Producto.findByPk(id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});



app.put("/producto/:id", async function(req,res)
{
    const id = req.params.id;
    const data = req.body;
    if(data.nombre){
        const productoModificado = await Producto.update({
            nombre: data.nombre
        },{
            where:{
                id:id
            }
        })
    }
    else
    {
        res.status(400).send('No se encuentra el producto');
    }
    
});


/*app.get('/buscar', function(req, res) {
    const query = req.query.query.toLowerCase();
    const resultados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(query)
    );
    res.json(resultados);
});*/

app.get('/buscar', async function(req, res) {

    const query = req.query.query.toLowerCase();   
    const resultados = await Producto.findAll({
            where: {
                nombre: {
                    [Sequelize.Op.iLike]: `%${query}%`  // Case-insensitive search
                }
            }
        });
        
        if (resultados.length > 0) {
            res.json(resultados);
        } else {
            res.status(404).send("No se encontraron productos que coincidan con la búsqueda.");
        }
    
});

/*
-----------------------------------------------------
...................ALUMNO 5..........................
-----------------------------------------------------
*/


app.get("/productos-url",function(req,res)
{   
    const {id, nombre, editor, estado}=req.query;
    let productoFiltrado = arreglo_general;
    if(id || nombre || editor || estado)
        {
            productoFiltrado = productoFiltrado.filter(pub=>{
                return(
                    (id && pub.id == id)||
                    (nombre && pub.nombre.toLowerCase() == nombre.toLowerCase()) ||
                    (editor && pub.editor.toLowerCase() == editor.toLowerCase()) ||
                    (estado && pub.estado.toLowerCase() == estado.toLowerCase())
                );
            })
        }
    if(productoFiltrado.length >0)
    {
        res.json(productoFiltrado);
    }
    else
    {
        res.status(404).send("Producto no encontrado");
    }
});

app.get('/usuarios/fechaRegistro/:fechaRegistro', async function(req, res) {
    const fechaRegistro = req.params.fechaRegistro.substring(0, 10);
    const fechaInicio = new Date(`${fechaRegistro}T00:00:00.000Z`);
    const fechaFin = new Date(`${fechaRegistro}T23:59:59.999Z`);

    try {
        const usuarios = await Usuario.findAll({
            where: {
                fechaRegistro: {
                    [Op.between]: [fechaInicio, fechaFin] // Usa between para abarcar todo el día
                }
            }
        });

        if (usuarios.length > 0) {
            res.json(usuarios);
        } else {
            res.status(404).json({ error: "Usuarios no encontrados" });
        }
    } catch (error) {
        console.error('Error al buscar usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get("/productos5",function(req,res){
    res.json(arreglo_general);
});

app.get("/productos/random", function (req, res) {
    const randomItems = arreglo_general.sort(() => 0.5 - Math.random()).slice(0, 5);
    res.json(randomItems);
});

app.post('/productos', async (req, res) => {
    const { nombre, descripcion, caracteristicas, editor, precio, stock, imageUrl } = req.body;

    try {
        const nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            caracteristicas,
            editor,
            precio,
            stock,
            estado:'Activo',
            imageUrl: ''
        });

        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.put("/productos/:id",function(req,res)
{
    const id=req.params.id;
    const data= req.body;

    if(data.nombre&&data.editor&&data.precio&&data.fechaRegistro&&data.stock)
    {
        const producto = arreglo_general.find((pub)=>pub.id==id);
        if(producto)
        {
            arreglo_general.nombre=data.nombre;
            arreglo_general.editor=data.editor;
            arreglo_general.precio=data.precio;
            arreglo_general.fechaRegistro=data.fechaRegistro;
            arreglo_general.stock=data.stock;
            res.json(producto);
        }
        else
        {
            res.status(404).send("Producto no encontrado");
        }
    }
    else
    {
        res.status(400).send("Faltan datos");
    }
});

app.delete("/productos/:id",function(req,res)
{
    const id=req.params.id;
    const producto=arreglo_general.find((pub)=>pub.id==id);
    if(producto)
    {
        producto.estado="Eliminado";
        res.json(producto);
    }
    else
    {
        res.status(404).send("Producto no encontrado");
    }
});

/*
-----------------------------------------------------
...................ALUMNO 6..........................
-----------------------------------------------------
*/

app.get('/usuarios', async function(req,res){
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});


app.get('/usuarios-url', async (req, res) => {
    const { correo, nombre, apellido } = req.query;
  
    try {
      const usuario = await Usuario.findAll({
        where: {
          correo: correo,
          nombre: nombre,
          apellido: apellido
        }
      });
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).send("Usuario no encontrado");
      }
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.status(500).json({ error: 'Error al obtener el usuario' });
    }
  });


/* ESTO SIRVE PARA QUE DESACTIVES A UN USUARIO PERO USANDO EL PUT*/ 
app.put("/usuarios/:id/desactivar", async function(req, res) {
    const { id } = req.params;
    try {
      const [updated] = await Usuario.update({ estado: 'Inactivo' }, {
        where: { id: id }
      });
  
      if (updated) {
        res.send("Usuario desactivado");
      } else {
        res.status(404).send("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Ocurrió un error al desactivar el usuario:", error);
      res.status(500).send("Ocurrió un error al desactivar el usuario");
    }
  });


/*
PARA ELIMINAR UN USUARIO CON DELETE
app.delete("/usuarios/:id", async function(req, res) {
    const id = req.params.id;
    try {
        await Usuario.destroy({
            where: {
                id: id
            }
        })
        res.send("Usuario eliminado");
    }
    catch(error) {
        console.log("Ocurrio error: ", error);
        res.status(400).send("Ocurrio un error");
    }
});
*/
/**SOBRE LAS ORDENES DE ACUERDO AL DETALLE DEL USUARIO */

app.get('/usuarios/:id/ordenes', function(req, res) {
    const usuarioId = parseInt(req.params.id, 10);
    const ordenesUsuario = ordenes.filter(item => item.usuarioId === usuarioId);

    if (ordenesUsuario.length > 0) {
        res.json(ordenesUsuario);
    } else {
        res.status(404).send("No se encontraron órdenes para este usuario");
    }
});

/** NOS MUESTRA TODA LA LISTA DE ORDENES*/
app.get('/ordenes', async function(req,res){
    const ordenes = await Orden.findAll();
        res.json(ordenes);
});

/**SIRVE PARA BUSCAR UNA ORDEN DE ACUERDO A CIERTOS PARAMETROS **/
app.get('/ordenes-url', async function(req,res){
    const {id, usuario} = req.query;
    try{
        const orden = await Orden.findAll({
            where: {
                id: id,
                usuario: usuario
            }
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



/*
-----------------------------------------------------
...................ALUMNO 4..........................
-----------------------------------------------------
*/

app.post('/registrar', async (req, res) => {
    const { nombre, apellido, correo, password } = req.body;

    try {
        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            correo,
            password,
            fechaRegistro: new Date(),
            estado: 'Activo'
        });
        res.json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'No se pudo crear el usuario' });
    }
});

app.post('/login', async (req, res) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo, password } });
        if (usuario) {
            res.json({ message: 'Inicio de sesión exitoso', usuario });
        } else {
            res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'No se pudo iniciar sesión' });
    }
});
app.post('/recuperarPassword', async (req, res) => {
    const { correo } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo } });
        if (usuario) {
            // Aquí puedes agregar lógica para enviar un correo de recuperación
            res.json({ message: 'Correo de recuperación enviado' });
        } else {
            res.status(404).json({ error: 'Correo no encontrado' });
        }
    } catch (error) {
        console.error('Error al recuperar contraseña:', error);
        res.status(500).json({ error: 'No se pudo recuperar la contraseña' });
    }
});

/*
ENDPOINTS PARA ORDENES
*/
// Crear una nueva orden
app.post('/ordenes', async (req, res) => {
    const { fechaOrden, total, estado, metodoEnvio, metodoPago, direccion } = req.body;
    
    try {
        const nuevaOrden = await Orden.create({
            fechaOrden,
            total,
            estado,
            metodoEnvio,
            metodoPago,
            direccion
        });

        res.status(201).json(nuevaOrden);
    } catch (error) {
        console.error('Error creando la orden:', error);
        res.status(500).json({ error: 'Error interno al crear la orden' });
    }
});

// Obtener una orden por ID
app.get('/ordenes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const orden = await Orden.findByPk(id);

        if (!orden) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        res.json(orden);
    } catch (error) {
        console.error('Error obteniendo la orden:', error);
        res.status(500).json({ error: 'Error interno al obtener la orden' });
    }
});

// Actualizar una orden por ID
app.put('/ordenes/:id', async (req, res) => {
    const { id } = req.params;
    const { fechaOrden, total, estado, metodoEnvio, metodoPago, direccion } = req.body;

    try {
        const orden = await Orden.findByPk(id);

        if (!orden) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        await orden.update({
            fechaOrden,
            total,
            estado,
            metodoEnvio,
            metodoPago,
            direccion
        });

        res.json(orden);
    } catch (error) {
        console.error('Error actualizando la orden:', error);
        res.status(500).json({ error: 'Error interno al actualizar la orden' });
    }
});

// Eliminar una orden por ID
app.delete('/ordenes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const orden = await Orden.findByPk(id);

        if (!orden) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        await orden.destroy();

        res.json({ message: 'Orden eliminada' });
    } catch (error) {
        console.error('Error eliminando la orden:', error);
        res.status(500).json({ error: 'Error interno al eliminar la orden' });
    }
});



/*
TERMINA ACA LOS ENDPOINTS PARA ORDENES
*/




// Endpoint para obtener todas las series con sus productos
app.get('/series', async (req, res) => {
    try {
        const series = await Serie.findAll({
            include: [
                {
                    model: Producto,
                    attributes: []
                }
            ],
            attributes: [
                'id',
                'nombre',
                'descripcion',
                'fechaCreacion',
                'numeroProductos',
                'imgUrl',
                [sequelize.fn('COUNT', sequelize.col('Productos.id')), 'nroproductos']
            ],
            group: ['Serie.id', 'Serie.nombre', 'Serie.descripcion', 'Serie.fechaCreacion', 'Serie.numeroProductos', 'Serie.imgUrl']
        });

        res.json(series);
    } catch (error) {
        console.error('Error obteniendo las series:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.post('/series', async (req, res) => {
    const { nombre, descripcion, fechaCreacion, productos } = req.body;

    try {
        // Crear nueva serie en la base de datos
        const nuevaSerie = await Serie.create({
            nombre,
            descripcion,
            fechaCreacion,
            numeroProductos: productos.length
        });

        // Establecer las relaciones con los productos
        for (const productoNombre of productos) {
            const producto = await Producto.findOne({ where: { nombre: productoNombre } });
            if (producto) {
                producto.serieId = nuevaSerie.id;
                await producto.save();
            }
        }

        res.status(201).json(nuevaSerie);
    } catch (error) {
        console.error('Error creando la serie:', error);
        res.status(500).json({ error: 'Error interno al crear la serie' });
    }
});
app.get('/series/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const serie = await Serie.findByPk(id, {
            include: Producto,
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Productos.id')), 'numeroProductos']
                ]
            },
            group: ['Serie.id', 'Productos.id']
        });
        if (!serie) {
            return res.status(404).json({ error: 'Serie no encontrada' });
        }
        res.json(serie);
    } catch (error) {
        console.error('Error obteniendo la serie:', error);
        res.status(500).json({ error: 'Error interno al obtener la serie' });
    }
});
app.put('/series/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, productos } = req.body;

    try {
        // Buscar la serie por ID
        const serie = await Serie.findByPk(id);

        if (!serie) {
            return res.status(404).json({ error: 'Serie no encontrada' });
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
                const producto = await Producto.findOne({ where: { nombre: productName } });
                if (producto) {
                    producto.serieId = id;
                    await producto.save();
                }
            }
        }

        res.status(200).json({ message: 'Serie actualizada exitosamente' });
    } catch (error) {
        console.error('Error actualizando la serie:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
app.delete('/series/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const serie = await Serie.findByPk(id);
        if (!serie) {
            return res.status(404).json({ error: 'Serie no encontrada' });
        }

        // Desvincular productos asociados
        await Producto.update({ serieId: null }, { where: { serieId: id } });

        await serie.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error eliminando la serie:', error);
        res.status(500).json({ error: 'Error interno al eliminar la serie' });
    }
});




// Datos en memoria para el ejemplo
let carrito = [];
let guardadosParaDespues = [];

// Obtener el carrito de compras
app.get('/carrito', (req, res) => {
  res.json(carrito);
});

// Añadir producto al carrito de compras
app.post('/carrito', (req, res) => {
  const producto = req.body;
  carrito.push(producto);
  res.json(carrito);
});

// Eliminar producto del carrito de compras
app.delete('/carrito/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  carrito = carrito.filter(producto => producto.id !== id);
  res.json(carrito);
});

// Mover producto a guardados para después
app.post('/guardarParaDespues', (req, res) => {
    const producto = req.body;
    guardadosParaDespues.push(producto);
    carrito = carrito.filter(p => p.id !== producto.id);
    res.json({ carrito, guardadosParaDespues });
  });
  
  // Obtener los guardados para después
  app.get('/guardadosParaDespues', (req, res) => {
    res.json(guardadosParaDespues);
  });
  
  // Mover producto del guardado para después al carrito
  app.post('/moverAlCarrito', (req, res) => {
    const producto = req.body;
    carrito.push(producto);
    guardadosParaDespues = guardadosParaDespues.filter(p => p.id !== producto.id);
    res.json({ carrito, guardadosParaDespues });
  });

  const ordenes1 = [];

  app.get('/productos', (req, res) => {
    res.json(productos);
  });
  
  app.get('/producto/id/:id', (req, res) => {
    const { id } = req.params;
    const producto = productos.find(p => p.id == id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  });
  
  app.post('/ordenes', (req, res) => {
    const nuevaOrden = { id: uuidv4(), ...req.body };
    ordenes.push(nuevaOrden);
    res.json(nuevaOrden);
  });
  
/**ENDPOINTS PARA LA BASE DE DATOS EN POSTGRES */

/*async function verificacionConexion() {
    try {
        await sequelize.authenticate();
        console.log("Conexion satisfactoria con la Base de Datos");
        await sequelize.sync();
    }
    catch(error) {
        console.error("No se puede conectar a la Base de Datos", error);
    }
}*/

app.listen(port,function(){
    console.log("Servidor escuchando en el puerto "+port);
    verificacionConexion();
});