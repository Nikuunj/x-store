import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';

const { ADMIN_JWT_SECRET } = config

export const sellerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // const tokenArr =  req.cookies.token
    const tokenArr = req.headers.token;
    // console.log(tokenArr)

    if (!tokenArr || typeof tokenArr !== 'string') {
        res.status(401).json({ msg: 'Token not provided' });
        return
    }
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

export const loginWithToken = async (req: Request, res: Response) => {
    // const tokenArr =  req.cookies.token
    const tokenArr = req.headers.token;
    
    if (!tokenArr || typeof tokenArr !== 'string') {
        res.status(401).json({ msg: 'Token not provided' });
        return
    }

    try {
        const token = tokenArr.split(" ")[1];
        const verify = jwt.verify(token, ADMIN_JWT_SECRET) as JwtPayload;
        req.userId = verify.id;
        res.status(200).json({
            message: "you token is valid"
        })
    } catch(e) {
        // res.clearCookie('token');
        res.status(401).json({
            msg: 'your token not valid'
        })
    }
}