import Layout from "../components/Layout";
import styles from "../styles/cart.module.scss";
import heroProd from "../public/images/products/third_showcase.jpg";
import bestPlace from "../public/images/products/best-place.jpg";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fixedQuantity, removeFromCart } from "../redux/cart.slice";
import { Delete } from "@mui/icons-material";

const Cart = () => {
	const cartData = useSelector((state) => state.cart);
	const getTotal = () => {
		let totalQuantity = 0;
		let totalPrice = 0;
		cartData.forEach((item) => {
			totalQuantity += item.quantity;
			totalPrice += item.price * item.quantity;
		});
		return { totalPrice, totalQuantity };
	};
	const [selectedQty, setselectedQty] = useState("");
	return (
		<Layout>
			<div className={styles.cart_container}>
				<h1>Cart</h1>
				{cartData.length ? (
					<div className={styles.cart_wrapper}>
						<div className={styles.cart_items_wrapper}>
							{cartData.map((item, id) => (
								<CartItem
									cartData={item}
									key={id}
									selectedQty={selectedQty}
									setselectedQty={setselectedQty}
								/>
							))}
						</div>
						<div className={styles.cart_summary_wrapper}>
							<div className={styles.cart_summary}>
								<h2>Summary</h2>
								<div className={styles.content}>
									<div>
										<p>Subtotal</p>
										<p>${getTotal().totalPrice}</p>
									</div>
									<div>
										<p>Shipping</p>
										<p>FREE</p>
									</div>
									<div>
										<p>Tax</p>
										<p>0</p>
									</div>
								</div>
								<div className={styles.total}>
									<p>Grand Total</p>
									<p>${getTotal().totalPrice}</p>
								</div>
								<div className={styles.checkout_btn}>
									<Link href="/checkout" passHref>
										<a>Checkout</a>
									</Link>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className={styles.empty_cart}>
						<h3>Your cart is empty! 🛒</h3>
						<p>
							<Link href="/">
								<a>Continue shopping</a>
							</Link>
						</p>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Cart;

const CartItem = ({ cartData, selectedQty, setselectedQty }) => {
	const dispatch = useDispatch();
	return (
		<div className={styles.cart_item}>
			<div className={styles.info}>
				<div className={styles.img_wrapper}>
					<Image
						src={`/${cartData.image}/1.png`}
						alt=""
						width={"100%"}
						height="100%"
						objectFit="contain"
					/>
				</div>
				<div className={styles.name}>
					<h4>{cartData.name}</h4>
					<div className={styles.price}>
						<p className={styles.value}>${cartData.price}</p>
					</div>
				</div>
			</div>
			<div className={styles.price}>
				<p className={styles.title}>Price</p>
				<p className={styles.value}>${cartData.price}</p>
			</div>
			<div className={styles.qty}>
				<p className={styles.title}>Qty</p>
				<select
					value={cartData.quantity}
					onChange={(e) => {
						dispatch(
							fixedQuantity({ slug: cartData.slug, quantity: +e.target.value })
						);
					}}
				>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
					<option value={6}>6</option>
					<option value={7}>7</option>
					<option value={8}>8</option>
					<option value={9}>9</option>
					<option value={10}>10</option>
				</select>
			</div>
			<div className={styles.total}>
				<p className={styles.title}>Total</p>
				<p className={styles.value}>${+cartData.quantity * +cartData.price}</p>
			</div>
			<div className={styles.action}>
				<button onClick={() => dispatch(removeFromCart(cartData))}>
					<Delete />
				</button>
				<div className={styles.qty}>
					<select
						value={cartData.quantity}
						onChange={(e) => {
							dispatch(
								fixedQuantity({ slug: cartData.slug, quantity: +e.target.value })
							);
						}}
					>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
						<option value={6}>6</option>
						<option value={7}>7</option>
						<option value={8}>8</option>
						<option value={9}>9</option>
						<option value={10}>10</option>
					</select>
				</div>
			</div>
		</div>
	);
};
