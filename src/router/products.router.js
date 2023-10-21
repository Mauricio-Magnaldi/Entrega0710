import { Router} from "express";
import { productsManager } from "../dao/mongoDB/managers/productsManager.js";

const router = Router();

router.get("/", async (requerimiento, respuesta) => {
    try {
        const products = await productsManager.findAll();
        respuesta.status(200).json({mensaje: "Productos", products});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

router.get("/:productId", async (requerimiento, respuesta) => {
    const {productId} = requerimiento.params;
    try {
        const product = await productsManager.findById(productId);
        respuesta.status(200).json({mensaje: "Product", product});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

router.post("/", async (requerimiento, respuesta) => {
    const {title, description, code, price, status, stock, category, thumbnails} = requerimiento.body;
    if (!title || !description || !code || !price || !status || !category || !thumbnails) {
        return respuesta.status(400).json({mensaje: "Faltan datos que son obligatorios."});
    }
    console.log(requerimiento.body);  
    
    //De mongoosejs.com/docs/default.html
    // Defaults do **not** run on `null`, `''`, or value other than `undefined`.
    //A mongoose no se le manda la propiedad stock para que así la crea y le da el valor que pusimos en default (0)
    if (!stock) {
        delete requerimiento.body.stock;
    }

    try {
        const createdProduct = await productsManager.createOne(requerimiento.body);
        respuesta.status(200).json({mensaje: "Producto creado", product: createdProduct});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

router.delete('/:productId', async (requerimiento, respuesta) => {
    //Recibo el idProduct a buscar desde params
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

router.put('/:productId', async (requerimiento, respuesta) => {
        const {productId} = requerimiento.params;
        try {
            const updateProduct = await productsManager.updateProduct(+productId, request.body);
            if (updateProduct === -1) {
                respuesta.status(400).json({message: `Código de Error 404. Producto con id: ${productId} no encontrado.`});
            } else {
                respuesta.status(200).json({mensaje: `Producto con id: ${productId} encontrado. Modificado.`});
            }
        } catch (error) {
            respuesta.status(500).json({message: error});
        }
});

export default router;
