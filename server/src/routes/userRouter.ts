import {  Request, Response, Router } from "express";
import { userModel, puchaseModel } from '../db/db'
import { userSchema } from "../types/validationSchema";
import bcrypt from 'bcrypt'

export const userRouter = Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
    
    const validaton = userSchema.safeParse(req.body);
    
    if(!validaton.success) {
        res.status(400).json({
            message: "Incorrect data format",
            error: validaton.error,
        });
        return
    }
    const { name, email, password }  = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        await userModel.create({
            name,
            email,
            password,
            salt
        })
        res.json({
            msg: 'seller id created'
        })
        return
    } catch(e) {
        res.status(500).json({
            msg: 'somthing went wrong in user roouter /signup'
        })
        return
    }
})

userRouter.post('/signin', (req: Request, res: Response) => {
    res.send('hello from userRouter')
})

userRouter.post('/purchase', (req: Request, res: Response) => {
    res.send('hello from userRouter')
})

userRouter.get('/purchased', (req: Request, res: Response) => {
    res.send('hello from userRouter')
})

userRouter.get('/', (req: Request, res: Response) => {
    res.send('hello from userRouter')
})

userRouter.put('/', (req: Request, res: Response) => {
    res.send('hello from userRouter')
})
