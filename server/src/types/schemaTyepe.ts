import mongoose from "mongoose";


export interface User_Seller {
    name: string;
    email: string;
    password: string;
}

export interface Porduct {
    title: string;
    description: string;
    price: number;
    imageLink: string
    sellerId:mongoose.Types.ObjectId;
}

export interface Puchase {
    userId:mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
}