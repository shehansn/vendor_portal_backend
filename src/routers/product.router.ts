import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { sample_products } from '../data';
import { ProductModel } from '../models/product.model';
const router = Router();


router.get("/seed", asyncHandler(
    async (req, res) => {
        const foodsCount = await ProductModel.countDocuments();
        console.log('foodsCount', foodsCount);
        if (foodsCount > 0) {
            res.send("Seed is already done!");
            return;
        }

        await ProductModel.create(sample_products);
        res.send("Seed Is Done!");
    }
))


router.get("/", asyncHandler(
    async (req, res) => {
        //const products = await ProductModel.find();
        res.send('product initial router');
    }
))

router.get("/all", asyncHandler(
    async (req, res) => {
        const products = await ProductModel.find();
        res.send(products);
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const products = await ProductModel.find({ name: { $regex: searchRegex } })
        res.send(products);
    }
))

router.get("/:productId", asyncHandler(
    async (req, res) => {
        const product = await ProductModel.findById(req.params.productId);
        res.send(product);
    }
))


export default router;
