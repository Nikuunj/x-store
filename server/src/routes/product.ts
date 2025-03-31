import {  Request, Response, Router } from "express";
// import { config } from '../config/config';
import { productModel } from '../db/schema'
export const product = Router();


// send all item
product.get('/', (req: Request, res: Response) => {
    res.send('hello from product')
})


product.get('/:productId', (req: Request, res: Response) => {
    res.send('hello from product')
})