import { Router} from "express";
import { usersManager } from "../dao/mongoDB/managers/usersManager.js";

const router = Router();

router.get("/", async (requerimiento, respuesta) => {
    try {
        const users = await usersManager.findAll();
        respuesta.status(200).json({mensaje: "Usuarios", users});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

router.get("/:idUser", async (requerimiento, respuesta) => {
    const {idUser} = requerimiento.params;
    try {
        const user = await usersManager.findById(idUser);
        respuesta.status(200).json({mensaje: "Usuario", user});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

router.post("/", async (requerimiento, respuesta) => {
    const {first_name, last_name, email, password} = requerimiento.body;
    if (!first_name || !last_name || !email || !password) {
        return respuesta.status(400).json({mensaje: "Todos los datos son obligatorios."});
    }
    try {
        const createdUser = await usersManager.createOne(requerimiento.body)
        respuesta.redirect(`/home/${createdUser._id}`);
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

export default router;
