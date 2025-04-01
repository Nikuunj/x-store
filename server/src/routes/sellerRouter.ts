import { Request, Response, Router } from "express";
import { userSchema, userSellerSignIn, productSchema } from '../types/validationSchema'
import bcrypt from 'bcrypt'
import { sellerModel, productModel } from "../db/db";
import { config } from "../config/config";
import jwt from 'jsonwebtoken'
import { sellerMiddleware } from "../middleware/sellerMiddleware";

export const sellerRouter = Router();
const { ADMIN_JWT_SECRET } = config

sellerRouter.get('/', (req: Request, res: Response) => {
    res.send('hello from sellerRouter')
})


sellerRouter.post('/signup', async (req: Request, res: Response) => {

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
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        await sellerModel.create({
            name,
            email,
            password: hashedPass,
            salt
        })
        res.json({
            msg: 'seller id created'
        })
        return
    } catch(e) {
        res.status(500).json({
            msg: 'somthing went wrong in seller roouter ya duplicate email in db /seller/signup'
        })
        return
    }
})

sellerRouter.post('/signin',async (req: Request, res: Response) => {

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

    const user = await sellerModel.findOne({
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
        const token = jwt.sign( {id :user._id.toString()}, ADMIN_JWT_SECRET, {
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

sellerRouter.post('/product', sellerMiddleware, async (req: Request, res: Response) => {

    const validaton = productSchema.safeParse(req.body);

    if(!validaton.success) {
        if(!validaton.success) {
            res.status(400).json({
                message: "Incorrect data format",
                error: validaton.error,
            });
            return
        }
    }

    const sellerId = req.userId;
    const { title, description, price, imageLink } = req.body

    try {
        await productModel.create({
            title,
            description,
            price,
            imageLink,
            sellerId
        })

        res.status(200).json({
            msg : 'product added'
        })
        return
    } catch(e) {
        res.status(401).json({
            msg : 'seller id not valid'
        })
        return
    }
    
})

sellerRouter.delete('/:productId', sellerMiddleware, async (req: Request, res: Response) => {
    const productId = req.params.productId;

    try {
        await productModel.deleteOne({
            _id: productId
        })
        res.json({
            msg : 'product drop'
        })
    } catch (e) {
        res.status(409).json({
            msg: 'cant delete product'
        })
    }
})

sellerRouter.get('/product', sellerMiddleware, async (req: Request, res: Response) => {
    const sellerId = req.userId;
    const owenProduct = await productModel.find({
        sellerId
    })

    res.json({
        owenProduct
    })
})

sellerRouter.put('/:productId', sellerMiddleware, async (req: Request, res: Response) => {
    // validation
    const validaton = productSchema.safeParse(req.body);

    if(!validaton.success) {
        if(!validaton.success) {
            res.status(400).json({
                message: "Incorrect data format",
                error: validaton.error,
            });
            return
        }
    }
    const productId = req.params.productId;
    const { title, description, price, imageLink } = req.body;

    try {
        await productModel.findOneAndUpdate({
            _id: productId
        }, { $set: { title, description, price, imageLink } } )
        res.json({
            msg : 'product updated'
        })
    } catch(e) {
        res.status(409).json({
            msg: 'product not found'
        })
    }
    
})