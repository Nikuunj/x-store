import express  from 'express';
import cors from "cors";
import { admin } from './routes/admin'


const app = express();

app.use(cors());

app.use('/admin', admin)
app.listen(3000, () => {
    console.log('PORT 3000')
})