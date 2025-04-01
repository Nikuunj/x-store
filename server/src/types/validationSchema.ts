import mongoose from 'mongoose';
import z from 'zod'

export const userSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(5, { message: "Your pass is too short " }),
});

export const productSchema = z.object({
    title: z.string().min(1, { message: "Name cannot be empty" }),
    description: z.string().email({ message: "Invalid email format" }),
    price: z.string().min(5, { message: "Your pass is too short " }),
    imageLink: z.string().min(5, { message: "It not url" }).url(),
});

export interface userSellerType extends z.infer<typeof userSchema> {
    salt: string
}

export interface productType extends z.infer<typeof productSchema> {
    sellerId:mongoose.Types.ObjectId;
}

export interface Puchase {
    userId:mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
}