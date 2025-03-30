import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {

}

module.exports = {
    adminMiddleware
}