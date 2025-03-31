import {  Request, Response, Router } from "express";
import { config } from '../config/config';
import { sellerModel } from '../db/schema'

export const admin = Router();

admin.get('/', (req: Request, res: Response) => {
    res.send('hello from admin')
})


admin.post('/signup', (req: Request, res: Response) => {
    res.send('hello from admin')
})

admin.post('/signin', (req: Request, res: Response) => {
    res.send('hello from admin')
})

admin.post('/product', (req: Request, res: Response) => {
    res.send('hello from admin')
})

admin.delete('/product', (req: Request, res: Response) => {
    res.send('hello from admin')
})

admin.get('/product', (req: Request, res: Response) => {
    res.send('hello from admin')
})

admin.put('/product', (req: Request, res: Response) => {
    res.send('hello from admin')
})