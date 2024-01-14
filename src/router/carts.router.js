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

router.put('/:cartId', async (requerimiento, respuesta) => {
    const {cartId} = requerimiento.params;
    try {
        const updateProduct = await productsManager.updateProduct(+cartId, request.body);
        if (updateProduct === -1) {
            respuesta.status(400).json({message: `Código de Error 404. Producto con id: ${cartId} no encontrado.`});
        } else {
            respuesta.status(200).json({mensaje: `Producto con id: ${cartId} encontrado. Modificado.`});
        }
    } catch (error) {
        respuesta.status(500).json({message: error});
    }
});

router.put('/:cartId/products/:productId', async (requerimiento, respuesta) => {
    const {cartId, productId} = requerimiento.body;
    if (!cartId || !productId) {
        return respuesta.status(400).json({mensaje: "Todos los datos son obligatorios."});
    }
    try {
        const updateProduct = await productsManager.updateProduct(+cartId, request.body);
        respuesta.status(200).json({mensaje: "Carrito creado", cart: createdCart});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

router.delete('/:cartId', async (requerimiento, respuesta) => {
    const {cartId} = requerimiento.params;
    try {
        const product = await productsManager.deleteProduct(+cartId);
        if (product) {
            respuesta.status(200).json({mensaje: `Producto con id: ${cartId} encontrado. Eliminado.`});
        } else {
            respuesta.status(400).json({mensaje: `Código de Error 404. Producto con id: ${cartId} no encontrado.`});
        }
    } catch (error) {
        respuesta.status(500).json({mensaje: error});
    }
});

router.delete('/:cartId/products/:productId', async (requerimiento, respuesta) => {
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
