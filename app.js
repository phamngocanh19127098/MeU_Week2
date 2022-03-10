import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import dotenv from 'dotenv';
import userRoute from './routes/users.route.js'
import authRoute from './routes/auth.route.js'
import morgan from 'morgan';
const app = express();
app.use(express.json())
app.use(morgan('dev'));
dotenv.config();
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
const port = 3000;
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
});
