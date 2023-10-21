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

router.get("/:userId", async (requerimiento, respuesta) => {
    //http://localhost:8080/api/users/65308e8cf32619a74287e2cd
    const {userId} = requerimiento.params;
    try {
        const user = await usersManager.findById(userId);
        respuesta.status(200).json({mensaje: "Usuario", user});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

router.post("/", async (requerimiento, respuesta) => {
    //Desde ThunderClient puedo ejecutar con post http://localhost:8080/api/users
    const {first_name, last_name, email, password} = requerimiento.body;
    //Evaluo que los 4 datos hayan sido enviados, de lo contrario no realizo el llamado a la bd.
    if (!first_name || !last_name || !email || !password) {
        return respuesta.status(400).json({mensaje: "Todos los datos son obligatorios."});
    }
    try {
        const createdUser = await usersManager.createOne(requerimiento.body)
        //respuesta.status(200).json({mensaje: "Usuario creado", user: createdUser});
        //respuesta.redirect(`/api/signupresponse/id: ${createdUser._id}`);
        respuesta.redirect(`/home/${createdUser._id}`);
        console.log("Dentro de users.router.js se recibe: ", requerimiento.body);
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

export default router;
