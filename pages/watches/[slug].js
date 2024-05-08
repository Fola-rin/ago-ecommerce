import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/watch.module.scss";
import heroProd from "../../public/images/products/third_showcase.jpg";
import bestPlace from "../../public/images/products/best-place.jpg";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Layout from "../../components/Layout";
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCart,
	incrementQuantity,
	decrementQuantity,
} from "../../redux/cart.slice";
import data from "../../utils/data";
import Error from "next/error";

const Watch = ({ product }) => {
	const router = useRouter();
	const [openSort, setOpenSort] = useState(false);
	const [checkedLocations, setCheckedLocations] = useState([]);
	const [cart, setCart] = useState(0);

	const handleTypeClick = (id) => {
		if (checkedLocations.includes(id)) {
			const arr = checkedLocations.filter((item) => item !== id);
			setCheckedLocations(arr);
		} else {
			setCheckedLocations((prevValue) => [...prevValue, id]);
		}
	};

	const cartData = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const cartProductInfo = cartData.find((item) => item.slug === product.slug);

	const [show, setShow] = useState(0);

	if (product === null) {
		return <Error statusCode={500} title="😱 | No products found!"/>
	}
	return (
		<Layout>
			<div className={styles.watch_container}>
				<div className={styles.main_watch_wrapper}>
					<button className={styles.go_back} onClick={() => router.back()}>
						Go Back
					</button>
					<div className={styles.watch_wrapper}>
						<div className={styles.img_container}>
							<div className={styles.img_showcase}>
								<Image
									src={`/${product.image}/1.png`}
									alt=""
									objectFit="contain"
									height={100}
									width={100}
									className={show === 0 ? styles.showImg : styles.hideImg}
								/>
								<Image
									src={bestPlace}
									alt=""
									objectFit="cover"
									className={show === 1 ? styles.showImg : styles.hideImg}
								/>
								<Image
									src={heroProd}
									alt=""
									objectFit="cover"
									className={show === 2 ? styles.showImg : styles.hideImg}
								/>
								<Image
									src={bestPlace}
									alt=""
									objectFit="cover"
									className={show === 3 ? styles.showImg : styles.hideImg}
								/>
							</div>
							<div className={styles.img_arrows}>
								<button onClick={() => show > 0 ? setShow(show-1): ''} disabled={show <= 0}><ChevronLeftIcon/></button>
								<button onClick={() => show < 3 ? setShow(show+1) : ''} disabled={show >= 3}><ChevronRightIcon/></button>
							</div>

							<div className={styles.img_choices}>
								<div
									className={
										styles.img_choice + (show === 0 ? " " + styles.selected : "")
									}
									onClick={() => setShow(0)}
								>
									<Image
										src={`/${product.image}/1.png`}
										alt=""
										objectFit="contain"
										height={100}
										width={100}
									/>
								</div>
								<div
									className={
										styles.img_choice + (show === 1 ? " " + styles.selected : "")
									}
									onClick={() => setShow(1)}
								>
									<Image src={bestPlace} alt="" objectFit="cover" />
								</div>
								<div
									className={
										styles.img_choice + (show === 2 ? " " + styles.selected : "")
									}
									onClick={() => setShow(2)}
								>
									<Image src={heroProd} alt="" objectFit="cover" />
								</div>
								<div
									className={
										styles.img_choice + (show === 3 ? " " + styles.selected : "")
									}
									onClick={() => setShow(3)}
								>
									<Image src={bestPlace} alt="" objectFit="cover" />
								</div>
							</div>
						</div>

						<div className={styles.text_wrapper}>
							<p className={styles.brand}>{product.brand}</p>
							<h1>{product.name}</h1>

							<p className={styles.desc}>{product.desc}</p>

							<div className={styles.cost}>
								<p>
									${product.price}{" "}
									{product.oldPrice > 0 ? <span>SALE</span> : ""}
									{product.newItem ? (
										<span className={styles.new_tag}>NEW</span>
									) : (
										""
									)}
								</p>
								<p> {product.oldPrice > 0 ? "$" + product.oldPrice : ""}</p>
							</div>
							<div className={styles.link_wrapper}>
								{cartProductInfo ? (
									<div className={styles.cart_counter}>
										<button
											onClick={() => {
												dispatch(decrementQuantity(product));
											}}
										>
											<RemoveIcon />
										</button>
										<span>
											{cartProductInfo.quantity ? cartProductInfo.quantity : 0}
										</span>
										<button
											onClick={() => dispatch(incrementQuantity(product))}
										>
											<AddIcon />
										</button>
									</div>
								) : (
									<button
										className={styles.add_to_cart}
										onClick={() => {
											dispatch(addToCart(product));
										}}
									>
										Add to Cart
									</button>
								)}
							</div>
							<p className={styles.proceed_to_cart}>
								<Link href="/cart" passHref>
									<a>Go to Cart</a>
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Watch;

export const getServerSideProps = async (context) => {
	const { params } = context;
	const { slug } = params;

	let product = {};
	const mongoDBAvailabilty = await db.connect();
	if (mongoDBAvailabilty) {
		product = await Product.findOne({ slug: slug }).lean();
		await db.disconnect();
	}
	else {
		product = data.products.find((item) => item.slug === slug);
	}
	return {
		props: {
			product: mongoDBAvailabilty ? db.convertDocToObj(product) : (product || null),
		},
	};
};
