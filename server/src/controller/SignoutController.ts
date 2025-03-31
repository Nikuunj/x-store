import { Request, Response, Router } from 'express'

export const signout = Router();

signout.get('/',  (req: Request, res: Response) => {
    res.clearCookie('token');
    res.json({
        msg : 'singout'
    })
})