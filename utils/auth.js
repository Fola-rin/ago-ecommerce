import jwt from "jsonwebtoken";

const signToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user._email,
			isAmin: user.isAmin,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "30d" }
	);
};
export { signToken };
