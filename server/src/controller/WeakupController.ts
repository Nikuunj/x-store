import { Request, Response, Router } from 'express'

export const weakUp = Router();

weakUp.get('/',  (req: Request, res: Response) => {
    console.log('Req resived')
    res.send('I am alive')
})
