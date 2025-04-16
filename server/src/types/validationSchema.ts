import mongoose from 'mongoose';
import { ExitStatus } from 'typescript';
import z from 'zod'

export const userSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(5, { message: "Your pass is too short " }),
});

export const productSchema = z.object({
    title: z.string().min(5, { message: "Title is too Short" }),
    description: z.string().min(20, { message: "Description is too Short" } ),
    price: z.number().min(2, { message: "Your pass is too short " }),
    imageLink: z.string().url(),
});


export const statusWhereSchema = z.object({
    status: z.string().min(1, { message: "Status need" }),
    where: z.string().min(1, { message: "Location address Needed" })
});
export const userSellerSignIn = userSchema.pick({ email: true, password: true });

export type userSellerSignInType = z.infer<typeof userSellerSignIn >

export interface userSellerType extends z.infer<typeof userSchema> {
}

export interface productType extends z.infer<typeof productSchema> {
    sellerId:mongoose.Types.ObjectId;
}

export interface Puchase {
    userId:mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    deliveryAddress: string;
    status: string;
    where: string;
}