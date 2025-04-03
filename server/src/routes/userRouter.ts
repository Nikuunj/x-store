// tested complete working
import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware";
import UserController from "../controller/UserController";

export const userRouter = Router();

userRouter.post('/signup', UserController.userSignUp)

userRouter.post('/signin',  UserController.userSignIn)

userRouter.post('/product/:productId', userMiddleware,  UserController.userProductPurchase)

userRouter.get('/product', userMiddleware,  UserController.userGetPurchased)

userRouter.delete('/purchase/:purchaseId', userMiddleware,  UserController.userDeletePurchased)