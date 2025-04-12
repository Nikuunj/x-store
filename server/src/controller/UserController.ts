import {  Request, Response } from "express";
import { userModel, purchaseModel } from '../db/db'
import { userSchema, userSellerSignIn } from "../types/validationSchema";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'
const { USER_JWT_SECRET } = config;

const userSignUp =  async (req: Request, res: Response) => {
    
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
}

const userSignIn =  async (req: Request, res: Response) => {

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
            expiresIn: "7d",
        })
        res.cookie('token', `Bearer ${token}`)
        res.status(200).json({
            token,
            name: user.name
        });
        return
    } else {
        res.status(403).json({
            message: "Wrong password!",
        });
        return
    }
}

const userProductPurchase = async (req: Request, res: Response) => {
    const userId = req.userId;
    const productId = req.params.productId;
    const deliveryAddress = req.body.deliveyAddress;

    try {
        await purchaseModel.create({
            userId,
            productId,
            deliveryAddress
        })
        
        res.json({
            msg: 'product purchased'
        })
    } catch(e) {
        res.status(402).json({
            msg: 'you cant purchase product'
        })
    }
}

const userGetPurchased = async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
        const productAll = await purchaseModel.find({
            userId
        }).populate({
            path : 'productId',
            populate: {
                path: 'sellerId',
                select: 'name'
            }
        })
        res.json({
            productAll
        })
    } catch(e) {
        res.status(500).json({
            msg: 'internal server error'
        })
    }
}

const userDeletePurchased = async (req: Request, res: Response) => {
    const purchaseId = req.params.purchaseId;
    
    try {
        const result = await purchaseModel.deleteOne({ _id: purchaseId });

        if (result.deletedCount === 0) {
            res.status(404).json({
                msg: "Purchase not found or already deleted"
            });
            return
        }

        res.json({ msg: "Purchase deleted successfully" });
        return
    } catch (e) {
        res.status(500).json({ msg: "Error deleting purchase" });
        return
    }

}

const UserController = {
    userSignUp,
    userSignIn,
    userProductPurchase,
    userGetPurchased,
    userDeletePurchased
}

export default UserController