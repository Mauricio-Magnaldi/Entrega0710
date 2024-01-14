import express from 'express';
import handlebars from "express-handlebars";
//Coloco los archivos con las diversas rutas en la carpeta router
import cartsRouter from './router/carts.router.js';
import productsRouter from './router/products.router.js';
import usersRouter from './router/users.router.js';
import viewsRouter from './router/views.router.js';
import { __dirname } from "./utils.js";
import "./dao/configDB.js";
//Para crear el socketServer
import { Server } from "socket.io";
import {
    getAllProductsHandler,
    messagesHandler,
  } from "./handlers/handlers.js";

//Guardo en app toda la funcionalidad del servidor de express
const app = express();
const PORT = 8080;

/*
console.log(__dirname);
Mostrará la ruta absoluta hasta src C:\Clase\Desarrollo Backend\Clase7-10\PracticaIntegradora\src
*/

//Middleware = función
//Se ejecutan antes de llegar al endpoint correspondiente. Siempre se ejecuta antes de llegar al endpoint que corresponda.
//Middleware a nivel de aplicación
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//__dirname no esta definido para ESModule, por lo que lo debemos crear en utils.js e importarlo aquí
app.use(express.static(__dirname+'/public'));

//Configuración de handlebars - motor de plantilla
//Si se trabaja con ejs o pug, la siguiente línea no es necesaria.
app.engine("handlebars",handlebars.engine());
//Las siguientes líneas siempre se escriben en express, independendiente del motor de plantilla a utilizar
//Declaro la ubicación de las distintas vistas
app.set("views", __dirname + "/views");
//Ejs o pug, o handlebars como en este caso
app.set("view engine","handlebars");

//routes
//Por convención se utiliza el /api c4-0:27
app.use('/', viewsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

const httpServer = app.listen(PORT,() => {
    console.log(`Conectado al puerto ${PORT}.`);
});

//websocket server
const socketServer = new Server(httpServer);
const onConnection = async (socket) => {
    await getAllProductsHandler(socketServer, socket);
    await messagesHandler(socketServer, socket);
  };
  
  socketServer.on("connection", onConnection);
  