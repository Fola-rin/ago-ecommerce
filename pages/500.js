import Layout from "../components/Layout";
import styles from "../styles/cart.module.scss";
import Link from "next/link";

const Custom500 = () => {
	return (
		<Layout>
			<div className={styles.cart_container}>
				<h1>500!</h1>

				<div className={styles.empty_cart}>
					<h2 style={{ fontSize: "48px" }}>😱</h2>
					<h3>This product you&apos;re looking for does not exist!</h3>
					<p>
						<Link href="/">
							<a>Continue shopping</a>
						</Link>
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default Custom500;
