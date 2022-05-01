import Layout from "../components/Layout";
import styles from "../styles/cart.module.scss";
import heroProd from "../public/images/products/third_showcase.jpg";
import bestPlace from "../public/images/products/best-place.jpg";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const Cart = () => {
	const [selectedQty, setselectedQty] = useState("");

	return (
		<Layout>
			<div className={styles.cart_container}>
				<h1>Cart</h1>
				<div className={styles.cart_wrapper}>
					<div className={styles.cart_items_wrapper}>
						<CartItem
							selectedQty={selectedQty}
							setselectedQty={setselectedQty}
						/>
						<CartItem
							selectedQty={selectedQty}
							setselectedQty={setselectedQty}
						/>
						<CartItem
							selectedQty={selectedQty}
							setselectedQty={setselectedQty}
						/>
						<CartItem
							selectedQty={selectedQty}
							setselectedQty={setselectedQty}
						/>
						<CartItem
							selectedQty={selectedQty}
							setselectedQty={setselectedQty}
						/>
						<CartItem
							selectedQty={selectedQty}
							setselectedQty={setselectedQty}
						/>
						<CartItem
							selectedQty={selectedQty}
							setselectedQty={setselectedQty}
						/>
					</div>
					<div className={styles.cart_summary_wrapper}>
						<div className={styles.cart_summary}>
							<h2>Summary</h2>
							<div className={styles.content}>
								<div>
									<p>Subtotal</p>
									<p>$1,158.00</p>
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
								<p>$1,158.00</p>
							</div>
							<div className={styles.checkout_btn}>
								<Link href="/checkout" passHref>
									<a>Checkout</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Cart;

const CartItem = ({ selectedQty, setselectedQty }) => (
	<div className={styles.cart_item}>
		<div className={styles.info}>
			<div className={styles.img_wrapper}>
				<Image src={heroProd} alt="" objectFit="cover" />
			</div>
			<h4 className={styles.name}>Carlie Three-Hand White Leather Watch</h4>
		</div>
		<div className={styles.price}>
			<p className={styles.title}>Price</p>
			<p className={styles.value}>$500</p>
		</div>
		<div className={styles.qty}>
			<p className={styles.title}>Qty</p>
			<select
				value={selectedQty}
				onChange={(e) => {
					setselectedQty(e.target.value);
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
			<p className={styles.value}>$50000</p>
		</div>
		<div className={styles.action}>
			<button>
				<CloseIcon />
			</button>
		</div>
	</div>
);
