import mongoose from "mongoose";

const connection = {};

const connect = async () => {
	if (connection.isConnected) {
		console.log("connected already");
		return;
	}
	if (mongoose.connections.length > 0) {
		// console.log(mongoose.connections);
		connection.isConnected = mongoose.connections[0].readyState;
		if (connection.isConnected === 1) {
			console.log("use previous connnection");
			return;
		}
		await mongoose.disconnect();
	}

	try {
		const db = await mongoose.connect(process.env.MONGODB_URI);
		console.log("new connection");
		connection.isConnected = db.connections[0].readyState;
	} catch (error) {
		// throw(error);
		throw error;
	}
	
};

const disconnect = async () => {
	if (connection.isConnected) {
		if (process.env.NODE_ENV === "production") {
			await mongoose.disconnect();
			connection.isConnected = false;
		} else {
			console.log("not disconnected");
		}
	}
};

const convertDocToObj = (doc) => {
	doc._id = doc._id.toString();

	doc.createdAt = doc.createdAt.toString();
	doc.updatedAt = doc.updatedAt.toString();

	return doc;
};

const db = { connect, disconnect, convertDocToObj };
export default db;
