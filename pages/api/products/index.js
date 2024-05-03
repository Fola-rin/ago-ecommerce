import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";
import data from "../../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
	
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

	// create object for price ranges
	let numObj = { a: [0, 99], b: [100, 200], c: [201, 1000] };

	if (numCat) {
		numCat = JSON.parse(numCat);
		lowNum = numObj[numCat[0][0]];
		highNum = numObj[numCat[0][1]];

		// get the low and high numbers for the price range
		numCat.forEach((numAlpha) => {
			lowNum = lowNum < numObj[numAlpha][0] ? lowNum : numObj[numAlpha][0];
			highNum = highNum > numObj[numAlpha][1] ? highNum : numObj[numAlpha][1];
		});
	} else {
		lowNum = 0;
		highNum = 1000;
	}

	const sortOptions = { [sortBy]: sortType };

	let products;
	let count;

	const mongoDBAvailabilty = await db.connect();

	// use mongo db store if database exists
	if (mongoDBAvailabilty) {
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
					name: { $regex: searchStr, $options: "i" },
					category: { $in: JSON.parse(filterCat) },
					price: { $gte: lowNum, $lte: highNum },
			  }
			: {
					name: { $regex: searchStr, $options: "i" },
					price: { $gte: lowNum, $lte: highNum },
			  };

	// get the products from the mongo db
	products = await Product.find(options)
		.sort(sortBy && sortType ? sortOptions : null)
		.limit(limit)
		.skip((page - 1) * limit)
		.exec();
	const countProducts = await Product.find(options).exec();
	count = countProducts.length;
	await db.disconnect();


	} 
	// revert to local store if database does not exist
	else {
		const totalProductsWithoutDb = data.products;

		const filterCategory = filterCat ? JSON.parse(filterCat) : null;

		// apply filters to the local data array
		let finalProducts = totalProductsWithoutDb.filter((item) => {
			return item.name.toLowerCase().includes(searchStr.toLowerCase()) &&
			(filterCategory ? filterCategory.includes(item.category) : true) &&
			(item.price >= lowNum && item.price <= highNum);
		});

		// apply sort if sort values are passed
		if (sortBy, sortType) {
			finalProducts.sort((a, b) => {
				if (sortBy === "price") {
					if (parseInt(sortType) === 1) {
						return a[sortBy] - b[sortBy];
					}
					else {
						return b[sortBy] - a[sortBy];
					}
				}
				else if (sortBy === "name") {
					if (+sortType === -1) {
						console.log(sortType);
						if (a[sortBy] >  b[sortBy]) {
							return -1;
						}
					}
					else {
						if (a[sortBy] <  b[sortBy]) {
							return -1;
						}
					}
				}
			});
		}
		// get the total number of returned products gotten after filtering
		count = finalProducts.length;

		if (limit || page) {
			const paginationStart = (page-1)*limit;
			finalProducts = finalProducts.slice(paginationStart, limit + paginationStart);
		}

		products = finalProducts;
	}

	
	res.send({
		products,
		totalPages: Math.ceil(count / limit),
		currentPage: page,
		totalCount: count,
	});
});

export default handler;
