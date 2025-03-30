import {  Request, Response, Router } from "express";

export const admin = Router();


admin.post('/signup', (req: Request, res: Response) => {
    res.send('hello from admin')
})

admin.post('/signin', (req: Request, res: Response) => {
    res.send('hello from admin')
})

admin.post('/item', (req: Request, res: Response) => {
    res.send('hello from admin')
})

admin.delete('/item', (req: Request, res: Response) => {
    res.send('hello from admin')
})

admin.put('/item', (req: Request, res: Response) => {
    res.send('hello from admin')
})

module.exports = {
    admin
}