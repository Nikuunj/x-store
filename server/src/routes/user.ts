import {  Request, Response, Router } from "express";
import { config } from '../config/config';
import { userModel, puchaseModel } from '../db/schema'

export const user = Router();

user.post('/signup', (req: Request, res: Response) => {
    res.send('hello from user')
})

user.post('/signin', (req: Request, res: Response) => {
    res.send('hello from user')
})

user.post('/purchase', (req: Request, res: Response) => {
    res.send('hello from user')
})

user.get('/purchased', (req: Request, res: Response) => {
    res.send('hello from user')
})

user.get('/', (req: Request, res: Response) => {
    res.send('hello from user')
})

user.put('/', (req: Request, res: Response) => {
    res.send('hello from user')
})
