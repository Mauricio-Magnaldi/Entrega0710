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

router.get("/:idProduct", async (requerimiento, respuesta) => {
    const {idProduct} = requerimiento.params;
    try {
        const product = await productsManager.findById(idProduct);
        respuesta.status(200).json({mensaje: "Product", product});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

router.post("/", async (requerimiento, respuesta) => {
    const {title, description, code, price, status, stock, category, thumbnails} = requerimiento.body;
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        return respuesta.status(400).json({mensaje: "Todos los datos son obligatorios."});
    }
    console.log(requerimiento.body);
/*    
    if (!stock) {
        delete requerimiento.body.stock;
    }
*/
    try {
        const createdProduct = await productsManager.createOne(requerimiento.body);
        respuesta.status(200).json({mensaje: "Producto creado", product: createdProduct});
    } catch (error) {
        respuesta.status(500).json({error: error.mensaje});
    }
});

router.delete('/:idProduct', async (request, response) => {
    //Recibo el idProduct a buscar desde params
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

router.put('/:idProduct', async (request, response) => {
        const {idProduct} = request.params;
        try {
            const updateProduct = await productsManager.updateProduct(+idProduct, request.body);
            if (updateProduct === -1) {
                response.status(400).json({message: `Código de Error 404. Producto con id: ${idProduct} no encontrado.`});
            } else {
                response.status(200).json({mensaje: `Producto con id: ${idProduct} encontrado. Modificado.`});
            }
        } catch (error) {
            response.status(500).json({message: error});
        }
});

export default router;
