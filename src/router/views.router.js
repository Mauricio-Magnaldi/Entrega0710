import { Router } from "express";
import { usersManager } from "../dao/mongoDB/managers/usersManager.js";
import { productsManager } from "../dao/mongoDB/managers/productsManager.js";

const router = Router();

router.get("/signup", (requerimiento, respuesta) => {
    respuesta.render("signup");
});

router.get("/findusers", (requerimiento, respuesta) => {
    respuesta.render("findUsers");
});

router.get("/createproduct", (requerimiento, respuesta) => {
    respuesta.render("createProduct");
});

router.get("/deleteproduct", (requerimiento, respuesta) => {
    respuesta.render("deleteProduct");
});

router.get("/home", async (requerimiento, respuesta) => {
    const products = await productsManager.getProducts();
    respuesta.render("home", {products});
});

router.get("/home/:userId", async (requerimiento, respuesta) => {
    //Después de que alguien se registre en signup es redireccionado aquí
    //Probado ok
    const {userId} = requerimiento.params;
    const userInformation = await usersManager.findById(userId);
    const {first_name, last_name} = userInformation;
    const products = await productsManager.findAll();
    console.log(first_name, last_name, products);
    respuesta.render("home", {first_name, last_name, products});
});

router.get("/realtimeproducts", async (requerimiento, respuesta) => {
    const products = await productsManager.getProducts();
    response.render("realtimeproducts", { products});
});

router.get('/signupresponse/:userId', async (requerimiento, respuesta) => {
    const {userId} = requerimiento.params;
    const user = await usersManager.getUserById(+userId);
    respuesta.render("signupresponse",{...user});
});

router.get('/allusers', async (requerimiento, respuesta) => {
    const users = await usersManager.findAll({});
    respuesta.render("allusers",{users, style:'signup.css'});
});

router.get("/chat", (requerimiento, respuesta) => {
    respuesta.render("chat");
})

export default router;
