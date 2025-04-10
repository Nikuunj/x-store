// all thing tested all are in working stage

import { Request, Response, Router } from "express";
import { loginWithToken, sellerMiddleware } from "../middleware/sellerMiddleware";
import SellerController from "../controller/SellerController";

export const sellerRouter = Router();

sellerRouter.get('/', loginWithToken);


sellerRouter.post('/signup', SellerController.sellerSignUp)

sellerRouter.post('/signin', SellerController.sellerSignIn)

sellerRouter.get('/product', sellerMiddleware, SellerController.sellerProductGet)

sellerRouter.post('/product', sellerMiddleware, SellerController.sellerProductPost)

sellerRouter.delete('/:productId', sellerMiddleware, SellerController.sellerProductDelete)

sellerRouter.put('/:productId', sellerMiddleware, SellerController.sellerProductPut)

// get all own product order which place by user
sellerRouter.get('/purchase', sellerMiddleware, SellerController.sellerProductPurchaseGet)

// status update
sellerRouter.put('/purchase/:purchaseId', sellerMiddleware, SellerController.sellerProductPurchasePut)