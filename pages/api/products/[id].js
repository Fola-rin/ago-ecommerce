import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
	let product = {};
	const mongoDBAvailabilty = await db.connect();
	if (mongoDBAvailabilty) {
		product = await Product.findOne(req.query.id).lean();
		await db.disconnect();
	}
	else {
		
	}
	res.send(product);
});

export default handler;
