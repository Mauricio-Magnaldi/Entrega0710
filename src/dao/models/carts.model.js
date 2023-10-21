import { Schema, model } from "mongoose";

const cartsSchema = new Schema({
    products: [
 /*/
        {
            productId: {
                type: mongoose.SchemaType.ObjectId,
                ref: "Products",
            },
            quantity: {
                type: Number,
            }    
        }
  */
    ]
});

export const cartsModel = model("Carrito", cartsSchema);


