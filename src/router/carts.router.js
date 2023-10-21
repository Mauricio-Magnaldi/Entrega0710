//Importo el modulo de ruteo dentro de express
import { Router} from "express";
import { cartsManager } from "../dao/mongoDB/managers/cartsManager.js";

const router = Router();

router.get("/", async (requerimiento, respuesta) => {
    try {
        const carts = await cartsManager.findAll();
        respuesta.status(200).json({mensaje: "Carritos", carts});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

/*
router.get("/:cartId", async (requerimiento, respuesta) => {
    const {cartId} = requerimiento.params;
    try {
        const product = await cartsManager.findById(cartId);
        respuesta.status(200).json({mensaje: "Carrito", carrito});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});
*/

router.post("/", async (requerimiento, respuesta) => {
    const {productId, quantity} = requerimiento.body;
    if (!productId || !quantity) {
        return respuesta.status(400).json({mensaje: "Todos los datos son obligatorios."});
    }
    try {
        const createdCart = await cartsManager.createOne(requerimiento.body)
        respuesta.status(200).json({mensaje: "Carrito creado", cart: createdCart});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

router.delete('/:producId', async (requerimiento, respuesta) => {
    const {productId} = requerimiento.params;
    try {
        const product = await productsManager.deleteProduct(+productId);
        if (product) {
            respuesta.status(200).json({mensaje: `Producto con id: ${productId} encontrado. Eliminado.`});
        } else {
            respuesta.status(400).json({mensaje: `Código de Error 404. Producto con id: ${productId} no encontrado.`});
        }
    } catch (error) {
        respuesta.status(500).json({mensaje: error});
    }
});

export default router;
