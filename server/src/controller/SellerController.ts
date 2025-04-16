
import { Request, Response } from "express";
import { userSchema, userSellerSignIn, productSchema } from '../types/validationSchema'
import bcrypt from 'bcrypt'
import { sellerModel, productModel, purchaseModel } from "../db/db";
import { config } from "../config/config";
import jwt from 'jsonwebtoken'
import { Types } from "mongoose";

const { ADMIN_JWT_SECRET } = config

const sellerSignUp = async (req: Request, res: Response) => {
    console.log(req.body);
    

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
}

const sellerSignIn = async (req: Request, res: Response) => {

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
            expiresIn: "7d",
        })
        // res.cookie('token', `Bearer ${token}`, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: 'lax', 
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        // });          
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

const sellerProductGet = async (req: Request, res: Response) => {
    const sellerId = req.userId;

    try {
        const owenProduct = await productModel.find({
            sellerId
        })
    
        res.json({
            owenProduct
        })
        return
    } catch(e) {
        res.status(500).json({
            msg: 'internal server error'
        })
    }
}

const sellerProductPost = async (req: Request, res: Response) => {

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
    
}

const sellerProductPut = async (req: Request, res: Response) => {
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
        const updatedProduct = await productModel.findOneAndUpdate({
            _id: productId
        }, { $set: { title, description, price, imageLink } } )
        if (!updatedProduct) {
            res.status(404).json({ msg: 'product not found' });
            return
        }
        res.json({ msg: 'product updated' });
        return
    } catch(e) {
        res.status(500).json({ msg: 'Internal server error' });
        return
    }
}

const sellerProductDelete = async (req: Request, res: Response) => {
    const productId = req.params.productId;
        
    try {
        const result = await productModel.deleteOne({ _id: productId });

        if (result.deletedCount === 0) {
            res.status(404).json({
                msg: "product not found or already deleted / plz refresh the page"
            });
            return
        }

        res.json({ msg: "product deleted successfully" });
        return
    } catch (e) {
        res.status(500).json({ msg: "Error deleting product" });
        return
    }
}
const sellerProductPurchaseGet = async (req: Request, res: Response) => {
    const sellerId = new Types.ObjectId(req.userId);

    const innterJoin = await productModel.aggregate([
        {
            $match: { sellerId: sellerId }
        },
        {
            $lookup: {
                from: 'purchases',
                localField: '_id',
                foreignField: 'productId',
                as: 'purchasedProduct'
            }
        },
        {
            $unwind: '$purchasedProduct'
        },
        {
            $lookup: {
                from: 'users',
                let: { userId: '$purchasedProduct.userId' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$userId'] }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                            email: 1
                        }
                    }
                ],
                as: 'purchasedProduct.user'
            }
        },
        {
            $unwind: '$purchasedProduct.user'
        },
        {
            $group: {
                _id: '$_id',
                title: { $first: '$title' },
                imageLink: { $first: '$imageLink' },
                price: { $first: '$price' },
                description: { $first: '$description' },
                sellerId: { $first: '$sellerId' },
                purchasedProduct: { $push: '$purchasedProduct' }
            }
        },
        {
            $match: { "purchasedProduct.0": { $exists: true } }
        }
    ]);

    res.json({ innterJoin });
};

const sellerProductPurchasePut = async (req: Request, res: Response) => {
    const purchaseId = req.params.purchaseId;

    const status = 'recived';

    try {
        const updatedPurchase = await purchaseModel.findOneAndUpdate(
            { _id: purchaseId },
            { $set: { status } },
        );
    
        if (!updatedPurchase) {
            res.status(404).json({ msg: 'Purchase not found' }); 
            return
        }
    
        res.json({ msg: 'Purchase updated', purchase: updatedPurchase });
        return
    
    } catch(e) {
        res.status(500).json({ msg: 'Internal server error' }); 
        return
    }
}


const SellerController = {
    sellerSignUp,
    sellerSignIn,
    sellerProductGet,
    sellerProductPost,
    sellerProductPut,
    sellerProductDelete,
    sellerProductPurchaseGet,
    sellerProductPurchasePut
}

export default SellerController;