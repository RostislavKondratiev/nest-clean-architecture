import { Schema } from "mongoose";

export const productSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true}
});