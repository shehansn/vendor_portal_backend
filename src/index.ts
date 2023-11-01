import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import path from 'path';
import { dbConnect } from './configs/database.config';
import productRouter from './routers/product.router';
import userRouter from './routers/user.router';

dotenv.config();
dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);


app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
})