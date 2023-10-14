import express from 'express';
import handlebars from "express-handlebars";
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import { __dirname } from "./utils.js";
import "./dao/configDB.js";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

//handlebars
app.engine("handlebars",handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine","handlebars");

//routes
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

const httpServer = app.listen(PORT,() => {
    console.log(`Conectado al puerto ${PORT}.`);
});

//websocket server
const socketServer = new Server(httpServer);

socketServer.on("connection",(socket)=>{
    console.log(`Cliente conectado ${socket.id}.`);
    socket.on("disconnect", ()=> {
        console.log(`Cliente desconectado ${socket.id}.`);    
    });

    socket.on("mensajeEvento", (info) => {
        console.log(`El usuario ${info} está en el chat.`);    
    });

});
