import {  Request, Response, Router } from "express";
import { productModel } from '../db/db'

export const productRouter = Router();

// send all item
productRouter.get('/:skip', async (req: Request, res: Response) => {

    const skip = parseInt(req.params.skip);
    try {
        const productAll = await productModel.find({}).populate('sellerId', 'name')
        if(!productAll) {
            res.status(404).json({
                msg : 'no any product find'
            })
            return
        }
        res.json({
            productAll
        })
        return
    } catch(e) {
        res.json({
            msg : 'internal server error'
        })
        return
    }
})