import Search from "@mui/icons-material/Search";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import Layout from "../../components/Layout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from '@mui/icons-material/Close';


import styles from "../../styles/watches.module.scss";
import { useState } from "react";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import db from "../../utils/db";
import Product from "../../models/Product";
import { useRouter } from "next/router";
import { useEffect } from "react";
import FullScreenLogoLoader from "../../components/Layout/FullScreenLogoLoader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCart,
	incrementQuantity,
	decrementQuantity,
} from "../../redux/cart.slice";
import data from "../../utils/data";

const Watches = ({ products, totalPages, currentPage, totalCount }) => {
	function arrayEquals(a, b) {
		return (
			Array.isArray(a) &&
			Array.isArray(b) &&
			a.length === b.length &&
			a.every((val, index) => val === b[index])
		);
	}
	const router = useRouter();
	const dispatch = useDispatch();

	const cartData = useSelector((state) => state.cart);
	console.log("cartData", cartData);

	const [openSort, setOpenSort] = useState(false);
	const [filterArr, setfilterArr] = useState([]);
	const [filterChecked, setFilterChecked] = useState({
		Silver: false,
		Leather: false,
		Gold: false,
		a: false,
		b: false,
		c: false,
	});
	const [newLoad, setNewLoad] = useState(true);
	const [loadedProducts, setLoadedProducts] = useState(products);
	const [loadedTotalPages, setLoadedTotalPages] = useState(totalPages);
	const [loadedCurrentPage, setLoadedCurrentPage] = useState(currentPage);
	const [loadedTotalCount, setLoadedTotalCount] = useState(totalCount);
	const [searchStr, setSearchStr] = useState("");
	const [numFilterArray, setNumFilterArray] = useState([]);

	const [loading, setLoading] = useState(false);

	const [openFilterMenu, setOpenFilterMenu] = useState(false);

	const [cart, setCart] = useState(0);

	const { query } = useRouter();

	const queryStringMaker = (params) => {
		const queryString = `?${params.page ? "page=" + params.page : ""}${
			params.sortBy
				? `&sortBy=${params.sortBy}&sortType=${params.sortType}`
				: ""
		}${params.numCat ? `&numCat=${params.numCat}` : ""}${
			params.filterCat ? `&filterCat=${params.filterCat}` : ""
		}${params.searchStr ? `&searchStr=${params.searchStr}` : ""}`;

		console.log("params", params.numCat);
		return queryString;
	};

	const handleTypeClick = (id, name) => {
		setNewLoad(false);
		if (id >= 1 && id <= 3) {
			if (filterArr.includes(name)) {
				const arr = filterArr.filter((item) => item !== name);
				setfilterArr(arr);
			} else {
				setfilterArr((prevValue) => [...prevValue, name]);
			}
		} else {
			if (numFilterArray.includes(name)) {
				const arr = numFilterArray.filter((item) => item !== name);
				setNumFilterArray(arr);
			} else {
				setNumFilterArray((prevValue) => [...prevValue, name]);
			}
		}
	};

	const handleCartAmount = () => {
		setCart(1);
	};

	const handleSort = (by, type) => {
		setOpenSort(false);
		const url = queryStringMaker({
			...query,
			sortBy: by,
			sortType: type,
		});
		router.push(url, undefined, {
			shallow: true,
		});
		return;
	};
	const sortName = (by, type) => {
		if (by == "price") {
			if (type == 1) {
				return "Price(Low to High)";
			} else {
				return "Price(High to Low)";
			}
		} else {
			if (type == 1) {
				return "Alphabetical(a-z)";
			} else if (type == -1) {
				return "Alphabetical(z-a)";
			} else {
				return "None";
			}
		}
	};

	const handlePage = ({ pageNum, direction }) => {
		if (direction === "right") {
			if (loadedCurrentPage < loadedTotalPages) {
				const url = queryStringMaker({
					...query,
					page: parseInt(loadedCurrentPage) + 1,
				});
				router.push(url, undefined, {
					shallow: true,
				});
				return;
			}
			return;
		}
		if (direction === "left") {
			if (loadedCurrentPage > 1) {
				const url = queryStringMaker({
					...query,
					page: parseInt(loadedCurrentPage) - 1,
				});
				router.push(url, undefined, {
					shallow: true,
				});
				return;
			}
			return;
		}
		if (pageNum) {
			return;
		}
	};
	const handleSearch = () => {
		console.log(filterArr);
		if (!newLoad) {
			const url = queryStringMaker({
				...query,
				searchStr: searchStr,
			});
			router.push(url, undefined, {
				shallow: true,
			});
			return;
		}
	};

	const count = 0;
	useEffect(() => {
		const countTimer = setTimeout(() => {
			setNewLoad(false);
			if (!newLoad) {
				const url = queryStringMaker({
					...query,
					numCat:
						numFilterArray && numFilterArray.length !== 0
							? JSON.stringify(numFilterArray)
							: null,
				});
				console.log("numFilterArray", numFilterArray);
				router.push(url, undefined, {
					shallow: true,
				});
				return;
			}
		}, 1000);
		return () => {
			clearTimeout(countTimer);
		};
	}, [numFilterArray]);
	useEffect(() => {
		const countTimer = setTimeout(() => {
			setNewLoad(false);
			if (!newLoad) {
				const url = queryStringMaker({
					...query,
					filterCat:
						filterArr && filterArr.length !== 0
							? JSON.stringify(filterArr)
							: null,
				});
				router.push(url, undefined, {
					shallow: true,
				});
				return;
			}
		}, 1000);
		return () => {
			clearTimeout(countTimer);
		};
	}, [filterArr]);
	useEffect(() => {
		if (newLoad) {
			if (query.filterCat || query.numCat) {
				const numCatArr = query.numCat ? JSON.parse(query.numCat) : [];
				setNumFilterArray(numCatArr);
				const filterCatArr = query.filterCat ? JSON.parse(query.filterCat) : [];
				setfilterArr(filterCatArr);
				const myArr = [...numCatArr, ...filterCatArr];

				let newChecked = filterChecked;
				myArr.map((name) => {
					newChecked = { ...newChecked, [name]: true };
				});

				setFilterChecked(newChecked);
				return;
			}
			setNewLoad(false);
		} else {
			if (query.filterCat) {
				if (arrayEquals(filterArr, JSON.parse(query.filterCat)) === false) {
					setfilterArr(JSON.parse(query.filterCat));
				}
			} else if (filterArr) {
				setNewLoad(true);
				setfilterArr([]);
			}
			if (query.numCat) {
				if (arrayEquals(numFilterArray, JSON.parse(query.numCat)) === false) {
					setNumFilterArray(JSON.parse(query.numCat));
				}
			} else if (numFilterArray) {
				setNumFilterArray([]);
				setNewLoad(true);
			}
			const url = queryStringMaker(query);
			setLoading(true);
			axios({
				method: "get",
				url: `/api/products/${url}`,
			})
				.then((response) => {
					console.log(response);
					setLoadedProducts(response.data.products);
					setLoadedTotalCount(response.data.totalCount);
					setLoadedTotalPages(response.data.totalPages);
					setLoadedCurrentPage(response.data.currentPage);
					setLoading(false);
					window.scrollTo({
						top: 0,
						left: 0,
						behavior: "smooth",
					});
				})
				.catch((error) => {
					setLoading(false);
					console.log(error.message);
				});
		}
	}, [query]);

	return (
		<>
			{loading ? <FullScreenLogoLoader /> : ""}
			<Layout>
				<div className={styles.watches_container}>
					<div className={styles.watches_wrapper}>
						<div className={styles.search_container}>
							<div className={styles.search_wrapper}>
								<input
									type="text"
									placeholder="Search for watches"
									value={searchStr}
									onChange={(e) => setSearchStr(e.target.value)}
								/>
								<div>
									<button onClick={() => handleSearch()}>
										<Search />
									</button>
								</div>
							</div>
						</div>

						<div className={styles.sort_container}>
							<p className={styles.results}>
								Showing {loadedTotalCount} products
							</p>
							<div className={styles.sort_wrapper}>
								<div
									className={styles.trigger}
									onClick={() => setOpenFilterMenu(!openFilterMenu)}
								>
									<span>Filters</span><FilterAltOutlined />
								</div>
							</div>
							<div className={styles.sort_wrapper}>
								<div
									className={styles.trigger}
									onClick={() => setOpenSort(!openSort)}
								>
									{query.sortBy && query.sortType
										? sortName(query.sortBy, query.sortType)
										: "None"}
									<KeyboardArrowDownIcon />
								</div>
								{openSort ? (
									<div className={styles.dropdown}>
										<p
											className={
												sortName(query.sortBy, query.sortType) === "None"
													? styles.selected
													: ""
											}
											onClick={() => handleSort("", 0)}
										>
											None
										</p>
										<p
											onClick={() => handleSort("name", 1)}
											className={
												sortName(query.sortBy, query.sortType) ===
												"Alphabetical(a-z)"
													? styles.selected
													: ""
											}
										>
											Alphabetical(a-z)
										</p>
										<p
											onClick={() => handleSort("name", -1)}
											className={
												sortName(query.sortBy, query.sortType) ===
												"Alphabetical(z-a)"
													? styles.selected
													: ""
											}
										>
											Alphabetical(z-a)
										</p>
										<p
											onClick={() => handleSort("price", 1)}
											className={
												sortName(query.sortBy, query.sortType) ===
												"Price(Low to High)"
													? styles.selected
													: ""
											}
										>
											Price(Low to High)
										</p>
										<p
											onClick={() => handleSort("price", -1)}
											className={
												sortName(query.sortBy, query.sortType) ===
												"Price(High to Low)"
													? styles.selected
													: ""
											}
										>
											Price(High to Low)
										</p>
									</div>
								) : (
									""
								)}
							</div>
						</div>
						{query.searchStr ? (
							<h2 className={styles.search_name}>
								Showing search results for &ldquo;{query.searchStr}&ldquo;
							</h2>
						) : (
							""
						)}
						<div className={styles.products_container}>
							<div className={styles.filter_wrapper_bg + (openFilterMenu ? (' ' + styles.filter_wrapper_bg__opened) : '')} onClick={() => setOpenFilterMenu(!openFilterMenu)}></div>
							<div className={styles.filter_wrapper + (openFilterMenu ? (' ' + styles.filter_wrapper__opened) : '')}>
								<button onClick={() => setOpenFilterMenu(!openFilterMenu)} className={styles.filter_wrapper__close}><CloseIcon/></button>
								<div className={styles.filter}>
									<p className={styles.title}>Type</p>
									<div className={styles.contents}>
										<div className={styles.content}>
											<input
												type="checkbox"
												className="checkbox"
												id={`checkbox${1}`}
												onChange={() => handleTypeClick(1, "Silver")}
												checked={filterArr.includes("Silver")}
											/>{" "}
											<label className="checkboxLabel" htmlFor={`checkbox${1}`}>
												Silver
											</label>
										</div>
										<div className={styles.content}>
											<input
												type="checkbox"
												className="checkbox"
												id={`checkbox${2}`}
												onChange={() => handleTypeClick(2, "Leather")}
												checked={filterArr.includes("Leather")}
											/>{" "}
											<label className="checkboxLabel" htmlFor={`checkbox${2}`}>
												Leather
											</label>
										</div>
										<div className={styles.content}>
											<input
												type="checkbox"
												className="checkbox"
												id={`checkbox${3}`}
												onChange={() => handleTypeClick(3, "Gold")}
												checked={filterArr.includes("Gold")}
											/>{" "}
											<label className="checkboxLabel" htmlFor={`checkbox${3}`}>
												Gold
											</label>
										</div>
									</div>
								</div>
								<div className={styles.filter}>
									<p className={styles.title}>Price</p>
									<div className={styles.contents}>
										<div className={styles.content}>
											<input
												type="checkbox"
												className="checkbox"
												id={`checkbox${4}`}
												onChange={() => handleTypeClick(4, "a")}
												checked={numFilterArray.includes("a")}
											/>{" "}
											<label className="checkboxLabel" htmlFor={`checkbox${4}`}>
												Below 100
											</label>
										</div>
										<div className={styles.content}>
											<input
												type="checkbox"
												className="checkbox"
												id={`checkbox${5}`}
												onChange={() => handleTypeClick(5, "b")}
												checked={numFilterArray.includes("b")}
											/>{" "}
											<label className="checkboxLabel" htmlFor={`checkbox${5}`}>
												100 to 200
											</label>
										</div>
										<div className={styles.content}>
											<input
												type="checkbox"
												className="checkbox"
												id={`checkbox${6}`}
												onChange={() => handleTypeClick(6, "c")}
												checked={numFilterArray.includes("c")}
											/>{" "}
											<label className="checkboxLabel" htmlFor={`checkbox${6}`}>
												Above 200
											</label>
										</div>
									</div>
								</div>
							</div>
							{loadedTotalCount ?
								<div className={styles.products_wrapper}>
									{loadedProducts.map((product) => (
										<Card
											key={product.slug}
											cart={cart}
											setCart={setCart}
											handleCartAmount={handleCartAmount}
											name={product.name}
											image={product.image}
											price={product.price}
											oldPrice={product.oldPrice}
											newItem={product.newItem}
											slug={product.slug}
											cartItem={product}
										/>
									))}
								</div>
								: 
								<h3 className={styles.no_results}>
									No results found!
								</h3>
							}
						</div>
						{loadedTotalCount ?
						<div className={styles.pagination_wrapper}>
							<div className={styles.icon}>
								<button
									onClick={() => handlePage({ direction: "left" })}
									className={`${loadedCurrentPage <= 1 ? styles.inactive : ""}`}
								>
									<ChevronLeftIcon />
								</button>
							</div>
							<div className={styles.contents}>
								{[...Array(loadedTotalPages + 1).keys()].map((i) =>
									i > 0 ? (
										<Link
											key={i}
											href={{
												pathname: router.pathname,
												query: { ...query, page: i },
											}}
											passHref
											shallow
											replace
										>
											<a
												onClick={() => handlePage({ pageNum: i })}
												className={i == loadedCurrentPage ? styles.active : ""}
											>
												{i}
											</a>
										</Link>
									) : (
										""
									)
								)}
							</div>
							<div className={styles.icon}>
								<button
									onClick={() => handlePage({ direction: "right" })}
									className={`${
										loadedCurrentPage >= loadedTotalPages ? styles.inactive : ""
									}`}
								>
									<ChevronRightIcon />
								</button>
							</div>
						</div>
						: ""
						}
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Watches;

const Card = ({
	cart,
	setCart,
	handleCartAmount,
	newItem,
	name,
	price,
	oldPrice,
	image,
	slug,
	cartItem,
}) => {
	const cartData = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const cartProductInfo = cartData.find((item) => item.slug === cartItem.slug);

	return (
		<div className={styles.card}>
			<div className={styles.utility_wrapper}>
				{newItem ? <div className={styles.new}>NEW</div> : ""}
				{oldPrice !== 0 ? <div className={styles.sale}>SALE</div> : ""}
			</div>
			<div className={styles.img_wrapper}>
				<Link href={`/watches/${slug}`} passHref>
					<a>
						<Image
							src={`/${image}/1.png`}
							alt=""
							width={"100%"}
							height="100%"
						/>
					</a>
				</Link>
			</div>
			<h3>{name}</h3>
			<p className={styles.price}>
				{oldPrice !== 0 ? <span>${oldPrice}</span> : ""}${price}
			</p>
			<div className={styles.link_wrapper}>
				{!cartProductInfo ? (
					<button
						className={styles.add_to_cart}
						onClick={() => {
							dispatch(addToCart(cartItem));
						}}
					>
						Add to Cart
					</button>
				) : (
					<div className={styles.cart_counter}>
						<button
							onClick={() => {
								dispatch(decrementQuantity(cartItem));
							}}
						>
							<RemoveIcon />
						</button>
						<span>
							{cartProductInfo.quantity ? cartProductInfo.quantity : 0}
						</span>
						<button onClick={() => dispatch(incrementQuantity(cartItem))}>
							<AddIcon />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export const getServerSideProps = async (context) => {
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
	} = context.query;

	console.log('stage 1');
	// create object for price ranges
	let numObj = { a: [0, 99], b: [100, 200], c: [201, 1000] };
	if (numCat) {
		numCat = JSON.parse(numCat);
		console.log(numCat);

		lowNum = numObj[numCat[0][0]];
		highNum = numObj[numCat[0][1]];

		// get the low and high numbers for the price range
		numCat.forEach((numAlpha) => {
			lowNum = lowNum < numObj[numAlpha][0] ? lowNum : numObj[numAlpha][0];
			highNum = highNum > numObj[numAlpha][1] ? highNum : numObj[numAlpha][1];
		});
	}
	const sortOptions = { [sortBy]: sortType };


	let products = null;
	let count = null;

	console.log('stage 2');
	const mongoDBAvailabilty = await db.connect();

	// use mongo db store if database exists
	if (mongoDBAvailabilty) {
	console.log('stage 3.1');
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
			.lean()
			.exec();

		const countProducts = await Product.find(options).exec();
		count = countProducts.length;
		await db.disconnect();
	} else {
		console.log('stage 3.2');
		const totalProductsWithoutDb = data.products;

		// apply filters to the local data array
		const filterCategory = filterCat ? JSON.parse(filterCat) : null;
		let finalProducts = totalProductsWithoutDb.filter((item) => {
			return item.name.toLowerCase().includes(searchStr.toLowerCase()) &&
			(filterCategory ? filterCategory.includes(item.category) : true) &&
			(item.price >= lowNum && item.price <= highNum);
		});

		// apply sort if sort values are passed
		if (sortBy, sortType) {
			finalProducts.sort((a, b) => {
				if (sortBy === "price") {
					if (+sortType === 1) {
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
	console.log('stage 4');
	
	return {
		props: {
			products: mongoDBAvailabilty ? products.map(db.convertDocToObj) : products,
			totalPages: Math.ceil(count / limit),
			currentPage: page,
			totalCount: count,
		},
	};
};
