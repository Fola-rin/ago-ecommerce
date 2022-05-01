import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    desc: { type: String, required: true },
}, {
    timestamps: true
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product;