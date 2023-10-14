import { Router } from "express";

const router = Router();

router.get("/signup", (requerimiento, respuesta) => {
    respuesta.render("signup");
});

router.get("/createproduct", (requerimiento, respuesta) => {
    respuesta.render("createProduct");
});

router.get("/deleteproduct", (requerimiento, respuesta) => {
    respuesta.render("deleteProduct");
});

router.get("/home/:idUsder", async (requerimiento, respuesta) => {
    const {idUser} = requerimiento.params;
    const userInformation = await usersManager.findById(idUser);
    const {first_name, last_name} = userInformation;
    const products = await productsManager.findAll();
    respuesta.render("home", {first_name, last_name, products});
})

router.get("/chat", (requerimiento, respuesta) => {
    respuesta.render("websocket");
})

export default router;
