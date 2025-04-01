import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';

const { ADMIN_JWT_SECRET } = config

export const sellerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const tokenArr =  req.cookies.token
        try {
            const token = tokenArr.split(" ")[1];
            const verify = jwt.verify(token, ADMIN_JWT_SECRET) as JwtPayload;
            req.userId = verify.id;
            next()
        } catch(e) {
            res.status(401).json({
                msg: 'need to login'
            })
        }
}

module.exports = {
    sellerMiddleware
}