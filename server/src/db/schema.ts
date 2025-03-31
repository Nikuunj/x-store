import mongoose from "mongoose";
import { User_Seller, Porduct, Puchase } from "../types/schemaTyepe";

const Schema = mongoose.Schema;


const Seller = new Schema<User_Seller>({
    name: String,
    email: String,
    password: String,
})

const User = new Schema<User_Seller>({
    name: String,
    email: String,
    password: String,
})

const Product = new Schema<Porduct>({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    sellerId: { type: Schema.Types.ObjectId, ref: "user", required: true },
})

const Purchase = new Schema<Puchase>({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "product", required: true },
})


export const sellerModel = mongoose.model('seller', Seller);
export const userModel = mongoose.model('user', User);
export const productModel = mongoose.model('product', Product);
export const puchaseModel = mongoose.model('purchase', Purchase);