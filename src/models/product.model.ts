import { Schema, model } from 'mongoose';

export interface Product {
    id: string;
    productName: string;
    productDescription: string;
    images: string[];
    sku: string;
    quantity:number;
}

export const ProductSchema = new Schema<Product>(
    {
        productName: { type: String, required: true },
        productDescription: { type: String, required: true },
        images: { type: [String] },
        sku: { type: String, required: true },
        quantity: { type: Number, required: true }
    }, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
}
);

export const ProductModel = model<Product>('product', ProductSchema);