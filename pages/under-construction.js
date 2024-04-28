import Layout from "../components/Layout";
import styles from "../styles/cart.module.scss";
import Link from "next/link";

const UnderConstruction = () => {
	return (
		<Layout>
			<div className={styles.cart_container}>
				<h1>Sorry!</h1>

				<div className={styles.empty_cart}>
					<h2 style={{ fontSize: "48px" }}>😢</h2>
					<h3>We cannot find the page you are looking for!</h3>
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

export default UnderConstruction;
