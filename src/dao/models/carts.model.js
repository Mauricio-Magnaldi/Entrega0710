import { Schema, model } from "mongoose";

const cartsSchema = new Schema({
    idProduct:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
});

export const cartsModel = model("Carrito", cartsSchema);


