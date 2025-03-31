import express  from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { admin } from './routes/admin'
import { user } from './routes/user'
import { product } from './routes/product'
import { signout } from './controller/SignoutController'; 
import mongoose from 'mongoose';
import { config } from './config/config';
const app = express();
const { MONGOOSE_CONNECTION_STRING } = config
app.use(cookieParser())
app.use(cors());

app.use('/signout', signout)
app.use('/admin', admin)
app.use('/user', user)
app.use('/product', product)

async function main() {
    mongoose
        .connect(MONGOOSE_CONNECTION_STRING)
        .then(() => {
            console.log("✅ Connected to MongoDB");
        })
        .catch((err) => {
            console.error("❌ MongoDB Connection Error:", err);
        });
    console.log(config)
    console.log('database connected');
    
    app.listen(3000, () => {
        console.log('PORT 3000')
    })
}

main();