import express  from 'express';
// import session from 'express-session';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { sellerRouter } from './routes/sellerRouter'
import { userRouter } from './routes/userRouter'
import { productRouter } from './routes/productRouter' 
import mongoose from 'mongoose';
import { config } from './config/config';
import { weakUp } from './controller/WeakupController';
const app = express();
const { MONGOOSE_CONNECTION_STRING } = config

app.use(express.json())
app.use(cookieParser())
app.set("trust proxy",1)
const allowedOrigins = ['http://localhost:5173' , 'https://x-store-nine.vercel.app'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));


app.use('/seller', sellerRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/', weakUp)

async function main() {
    await mongoose.connect(MONGOOSE_CONNECTION_STRING)
    console.log('database connected');
    
    app.listen(443, () => {
        console.log('lisining on port 443')
    })
}
main();