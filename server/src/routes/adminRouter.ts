import { Request, Response, Router } from "express";
import { userSchema } from '../types/validationSchema'
import bcrypt from 'bcrypt'
import { sellerModel } from "../db/db";

export const sellerRouter = Router();

sellerRouter.get('/', (req: Request, res: Response) => {
    res.send('hello from sellerRouter')
})


sellerRouter.post('/signup', async (req: Request, res: Response) => {
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
        await sellerModel.create({
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
            msg: 'somthing went wrong in seller roouter /signup'
        })
        return
    }
})

sellerRouter.post('/signin', (req: Request, res: Response) => {
    res.send('hello from sellerRouter')
})

sellerRouter.post('/product', (req: Request, res: Response) => {
    res.send('hello from sellerRouter')
})

sellerRouter.delete('/product', (req: Request, res: Response) => {
    res.send('hello from sellerRouter')
})

sellerRouter.get('/product', (req: Request, res: Response) => {
    res.send('hello from sellerRouter')
})

sellerRouter.put('/product', (req: Request, res: Response) => {
    res.send('hello from sellerRouter')
})