import mongoose from "mongoose";
import { userSellerType, productType, Puchase } from "../types/validationSchema";

const Schema = mongoose.Schema;

const UserSeller = new Schema<userSellerType>({
    name: String,
    email: { type : String, unique: true },
    password: String,
})

const Product = new Schema<productType>({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    sellerId: { type: Schema.Types.ObjectId, ref: "seller", required: true },
})

const Purchase = new Schema<Puchase>({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "product", required: true },
    status: { type: String, default: "Order Placed" },
    where: { type: String, default: "Update Soon" }
})

export const sellerModel = mongoose.model('seller', UserSeller);
export const userModel = mongoose.model('user', UserSeller);
export const productModel = mongoose.model('product', Product);
export const purchaseModel = mongoose.model('purchase', Purchase);