import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/checkout.module.scss";
import heroProd from "../public/images/products/third_showcase.jpg";

const Checkout = () => {
	const [checked, setChecked] = useState(true);
	const [completeOrder, setCompleteOrder] = useState(false);

	const handleOrder = () => {
		setCompleteOrder(true);
	};
	return (
		<Layout>
			<div className={styles.checkout_container}>
				{completeOrder ? (
					<SuccessScreen />
				) : (
					<div className={styles.checkout_wrapper}>
						<p className={styles.go_back}>Go Back</p>
						<h1>Checkout</h1>
						<div className={styles.checkout_contents}>
							<div className={styles.checkout_content}>
								<div className={styles.checkout_btn}>
									<form>
										<div className={styles.joint_input}>
											<div>
												<label> Name</label>
												<input placeholder="Enter your Name" type="text" />
											</div>
											<div>
												<label>Email</label>
												<input placeholder="Enter your email" type="email" />
											</div>
										</div>
									</form>

									<p className={styles.disclaimer}>
										Please note that this is a side project, so I am not
										collecting any billing information.
									</p>
									<div className={styles.opt_out}>
										<input
											type="checkbox"
											id="check"
											checked={checked}
											onChange={() => setChecked(!checked)}
										/>
										<label htmlFor="check">
											I agree to be sent an email containing the cart
											information(this is for simulation purposes only)
										</label>
									</div>
									<button onClick={() => handleOrder()}>Complete Order</button>
								</div>
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
								</div>
								<div className={styles.cart_contents}>
									<p className={styles.no_items}>16 Items</p>
									<CartItem />
									<CartItem />
									<CartItem />
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Checkout;
const SuccessScreen = () => (
	<div
		className={styles.succcess_wrapper}
		data-aos="zoom-in"
		data-aos-easing="ease-in-out"
		data-aos-duration="400"
		data-aos-delay="500"
	>
		<div className={styles.wrapper}>
			<h1>Yay! 🎉</h1>
			<p>Your order has been completed Succesfully! </p>

			<div className={styles.link_wrapper}>
				<Link href="/" passHref>
					<a>Go home</a>
				</Link>
				<Link href="https://bit.ly/congratulations_link" passHref>
					<a>Win a free iphone</a>
				</Link>
			</div>
		</div>
	</div>
);
const CartItem = () => (
	<div className={styles.cart_item}>
		<h4 className={styles.name}>Carlie Three-Hand White Leather Watch</h4>
		<div className={styles.info}>
			<div className={styles.img_wrapper}>
				<Image src={heroProd} alt="" objectFit="cover" />
			</div>
			<div className={styles.desc}>
				<div className={styles.price}>
					<p className={styles.title}>Price</p>
					<p className={styles.value}>$500</p>
				</div>
				<div className={styles.qty}>
					<p className={styles.title}>Qty</p>
					<p className={styles.value}>5</p>
				</div>
				<div className={styles.total}>
					<p className={styles.title}>Total</p>
					<p className={styles.value}>$50000</p>
				</div>
			</div>
		</div>
	</div>
);
