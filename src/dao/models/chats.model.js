import { Schema, model } from "mongoose";

const messagesSchema = new Schema({
    user:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
});

export const chatsModel = model("Messages", messagesSchema);


