import {  Request, Response, Router } from "express";
// import { config } from '../config/config';
import { productModel } from '../db/db'
export const productRouter = Router();


// send all item
productRouter.get('/', (req: Request, res: Response) => {
    res.send('hello from productRouter')
})


productRouter.get('/:productId', (req: Request, res: Response) => {
    res.send('hello from productRouter')
})