import express  from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { sellerRouter } from './routes/sellerRouter'
import { userRouter } from './routes/userRouter'
import { productRouter } from './routes/productRouter'
import { signout } from './controller/SignoutController'; 
import mongoose from 'mongoose';
import { config } from './config/config';
const app = express();
const { MONGOOSE_CONNECTION_STRING } = config

app.use(express.json())
app.use(cookieParser())
app.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/signout', signout)
app.use('/seller', sellerRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)

async function main() {
    await mongoose.connect(MONGOOSE_CONNECTION_STRING)
    console.log('database connected');
    
    app.listen(3000, () => {
        console.log('lisining on port 3000')
    })
}
main();