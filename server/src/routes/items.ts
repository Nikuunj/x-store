import {  Request, Response, Router } from "express";

const items = Router();


// send all item
items.get('/', (req: Request, res: Response) => {
    res.send('hello from items')
})

module.exports = {
    items
}