import {  Request, Response, Router } from "express";
import { userModel, puchaseModel } from '../db/db'
import { userSchema, userSellerSignIn } from "../types/validationSchema";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'
const { USER_JWT_SECRET } = config;

export const userRouter = Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
    
    // validation
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
        const hashedPass = await bcrypt.hash(password, 10);
        await userModel.create({
            name,
            email,
            password: hashedPass
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

userRouter.post('/signin', async (req: Request, res: Response) => {

    // validation
    const validaton = userSellerSignIn.safeParse(req.body);
    if(!validaton.success) {
        res.status(400).json({
            message: "Incorrect data format",
            error: validaton.error,
        });
        return
    }
    const { email, password }  = req.body;

    const user = await userModel.findOne({
        email
    })


    if (!user) {
        res.status(403).json({
            message: "User not found!",
        });
        return
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        const token = jwt.sign( {id :user._id.toString()}, USER_JWT_SECRET, {
            expiresIn: "7d", // Token valid for 7 days
        })
        res.cookie('token', `Bearer ${token}`, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        })
        res.status(200).json({
            token
        });
        return
    } else {
        res.status(403).json({
            message: "Wrong password!",
        });
        return
    }
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
