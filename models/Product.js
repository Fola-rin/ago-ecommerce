import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		category: { type: String, required: true },
		image: { type: String, required: true },
		brand: { type: Number, required: true },
		price: { type: Number, required: true },
		oldPrice: { type: Number, required: true },
		brand: { type: String, required: true },
		newItem: { type: Boolean, required: true, default: false },
		desc: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Product =
	mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
