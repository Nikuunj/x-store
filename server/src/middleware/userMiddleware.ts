import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';
import { any } from 'zod';

const { USER_JWT_SECRET } = config;

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const tokenArr =  req.cookies.token
    try {
        const token = tokenArr.split(" ")[1];
        const verify = jwt.verify(token, USER_JWT_SECRET) as JwtPayload;

        req.userId = verify.id;
        next()
    } catch(e) {
        res.status(401).json({
            msg: 'need to login'
        })
    }
}

module.exports = {
    userMiddleware
}