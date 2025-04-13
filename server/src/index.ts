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

const allowedOrigins = ['http://localhost:5173' , 'https://x-store-nine.vercel.app/'];
app.use(cors({
    origin: (origin, callback) => {

        if (!origin) {
            // Uncomment below if you want to allow tools like Postman
            // return callback(null, true); 
      
            // Block missing origin (browser required)
            return callback(new Error('CORS Error: This origin is not allowed'));
        }
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS Error: This origin is not allowed'));
        }
    },
    credentials: true
}));

app.use('/signout', signout)
app.use('/seller', sellerRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)

async function main() {
    await mongoose.connect(MONGOOSE_CONNECTION_STRING)
    console.log('database connected');
    
    app.listen(443, () => {
        console.log('lisining on port 443')
    })
}
main();