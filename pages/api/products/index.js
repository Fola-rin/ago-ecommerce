import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
	await db.connect();
	let {
		page = 1,
		limit = 7,
		sortBy,
		sortType,
		filterCat,
		lowNum = 0,
		highNum = 1000,
		numCat,
		searchStr = "",
	} = req.query;

	let numObj = { a: [0, 99], b: [100, 200], c: [201, 1000] };

	if (numCat) {
		numCat = JSON.parse(numCat);
		lowNum = numObj[numCat[0][0]];
		highNum = numObj[numCat[0][1]];
		numCat.forEach((numAlpha) => {
			lowNum = lowNum < numObj[numAlpha][0] ? lowNum : numObj[numAlpha][0];
			highNum = highNum > numObj[numAlpha][1] ? highNum : numObj[numAlpha][1];
		});

		console.log("numbers", [lowNum, highNum]);
	} else {
		lowNum = 0;
		highNum = 1000;
	}

	const sortOptions = { [sortBy]: sortType };

	const options =
		searchStr === ""
			? filterCat
				? {
						category: { $in: JSON.parse(filterCat) },
						price: { $gte: lowNum, $lte: highNum },
				  }
				: {
						price: { $gte: lowNum, $lte: highNum },
				  }
			: filterCat
			? {
					name: { $regex: searchStr, $options: "$i" },
					category: { $in: JSON.parse(filterCat) },
					price: { $gte: lowNum, $lte: highNum },
			  }
			: {
					name: { $regex: searchStr, $options: "$i" },
					price: { $gte: lowNum, $lte: highNum },
			  };

	const products = await Product.find(options)
		.sort(sortBy && sortType ? sortOptions : null)
		.limit(limit)
		.skip((page - 1) * limit)
		.exec();
	const countProducts = await Product.find(options).exec();
	const count = countProducts.length;
	await db.disconnect();
	res.send({
		products,
		totalPages: Math.ceil(count / limit),
		currentPage: page,
		totalCount: count,
	});
});

export default handler;
