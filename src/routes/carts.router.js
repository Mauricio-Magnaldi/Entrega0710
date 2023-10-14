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

router.get("/:idCart", async (requerimiento, respuesta) => {
    const {idCart} = requerimiento.params;
    try {
        const product = await cartsManager.findById(idCart);
        respuesta.status(200).json({mensaje: "Carrito", carrito});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

router.post("/", async (requerimiento, respuesta) => {
    const {idProduct, quantity} = requerimiento.body;
    if (!idProduct || !quantity) {
        return respuesta.status(400).json({mensaje: "Todos los datos son obligatorios."});
    }
    try {
        const createdCart = await cartsManager.createOne(requerimiento.body)
        respuesta.status(200).json({mensaje: "Carrito creado", cart: createdCart});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

router.delete('/:idProduct', async (request, response) => {
    const {idProduct} = request.params;
    try {
        const product = await productsManager.deleteProduct(+idProduct);
        if (product) {
            response.status(200).json({mensaje: `Producto con id: ${idProduct} encontrado. Eliminado.`});
        } else {
            response.status(400).json({mensaje: `Código de Error 404. Producto con id: ${idProduct} no encontrado.`});
        }
    } catch (error) {
        response.status(500).json({mensaje: error});
    }
});



export default router;
