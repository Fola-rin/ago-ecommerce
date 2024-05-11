import mongoose from "mongoose";

const connection = {};

const connect = async () => {
	let timeoutHandle;
	try {
		if (process.env.NODE_ENV === "development") {
			if (connection.isConnected === 1) {
				console.log("connected already", connection.isConnected);
				return true;
			}
			if (mongoose.connections.length > 0) {
				connection.isConnected = mongoose.connections[0].readyState;
				if (connection.isConnected === 1) {
					console.log("use previous connnection", connection.isConnected);
					return true;
				}
				await disconnect();
			}
			mongoose.set("strictQuery", true);
			const dbPromise = mongoose.connect(process.env.MONGODB_URI);

			// to handle cases where mongo db takes to long to respond, most likely due to errors
			const timeoutPromise = new Promise((resolve) => {
				timeoutHandle = setTimeout(
					() => {
						resolve(null);
					}, 1000);
			});

			return Promise.race([dbPromise, timeoutPromise]).then((db) => {
				if (db === null) {
					console.log("Connection timed out!");
					return false;
				}
				if (db.connections[0].readyState === 1) {
					connection.isConnected = db.connections[0].readyState;
					return true;
				}
					return false;
				}
			)
			.catch((error) => {
				console.log('ERROR-> mongoose stopped working', error);
				return false;
			});
		}
		else {
			return false;
		}
		
	} catch (error) {
		console.log('ERROR->', error?.reason?.setName)
		return false;
	}
	
};

const disconnect = async () => {
	if (connection.isConnected === 1) {
		if (process.env.NODE_ENV === "production") {
			await mongoose.disconnect();
			connection.isConnected = false;
		} else {
			console.log("not disconnected");
		}
	}
};

const convertDocToObj = (doc) => {
	doc.slug = doc.slug.toString();

	doc.createdAt = doc.createdAt.toString();
	doc.updatedAt = doc.updatedAt.toString();

	return doc;
};

const db = { connect, disconnect, convertDocToObj };
export default db;
