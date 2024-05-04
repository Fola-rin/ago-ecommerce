import bcrypt from "bcryptjs";
import nc from "next-connect";
import User from "../../../models/User";
import { signToken } from "../../../utils/auth";
import db from "../../../utils/db";
import data from "../../../utils/data";

const handler = nc();

handler.post(async (req, res) => {

	let user;
	const mongoDBAvailabilty = await db.connect();
	if (mongoDBAvailabilty) {
		user = await User.findOne({ email: req.body.email });
		await db.disconnect();		
	}
	else {
		user = data.users.find((item) => item.email === req.body.email)
	}

	if (user) {
		const token = signToken(user);
		res.send({
			token,
			// slug: user.slug,
			name: user.name,
			email: user.email,
			isAmin: user.isAdmin,
		});
	} else {
		res.status(401).send({ message: "Invalid user" });
	}
});

export default handler;
