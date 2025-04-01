import mongoose from 'mongoose';
import { ExitStatus } from 'typescript';
import z from 'zod'

export const userSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(5, { message: "Your pass is too short " }),
});

export const productSchema = z.object({
    title: z.string().min(10, { message: "Name cannot be empty" }),
    description: z.string().min(50),
    price: z.number().min(2, { message: "Your pass is too short " }),
    imageLink: z.string().min(5, { message: "It not url" }).url(),
});


export interface userSellerType extends z.infer<typeof userSchema> {
}

export const userSellerSignIn = userSchema.pick({ email: true, password: true });

export type userSellerSignInType = z.infer<typeof userSellerSignIn >

export interface productType extends z.infer<typeof productSchema> {
    sellerId:mongoose.Types.ObjectId;
}

export interface Puchase {
    userId:mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
}