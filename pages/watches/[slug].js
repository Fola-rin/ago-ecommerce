import { useState } from "react";
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

const Watch = () => {
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
	const handleCartAmount = () => {
		cart === 0 ? setCart(1) : "";
	};
	const [show, setShow] = useState([true, false, false, false]);
	return (
		<Layout>
			<div className={styles.watch_container}>
				<div className={styles.main_watch_wrapper}>
					<p className={styles.go_back}>Go Back</p>
					<div className={styles.watch_wrapper}>
						<div className={styles.img_container}>
							<div className={styles.img_showcase}>
								<Image
									src={heroProd}
									alt=""
									objectFit="cover"
									className={show[0] ? styles.showImg : styles.hideImg}
								/>
								<Image
									src={bestPlace}
									alt=""
									objectFit="cover"
									className={show[1] ? styles.showImg : styles.hideImg}
								/>
								<Image
									src={heroProd}
									alt=""
									objectFit="cover"
									className={show[2] ? styles.showImg : styles.hideImg}
								/>
								<Image
									src={bestPlace}
									alt=""
									objectFit="cover"
									className={show[3] ? styles.showImg : styles.hideImg}
								/>
							</div>

							<div className={styles.img_choices}>
								<div
									className={
										styles.img_choice + (show[0] ? " " + styles.selected : "")
									}
									onClick={() => setShow([true, false, false, false])}
								>
									<Image src={heroProd} alt="" objectFit="cover" />
								</div>
								<div
									className={
										styles.img_choice + (show[1] ? " " + styles.selected : "")
									}
									onClick={() => setShow([false, true, false, false])}
								>
									<Image src={bestPlace} alt="" objectFit="cover" />
								</div>
								<div
									className={
										styles.img_choice + (show[2] ? " " + styles.selected : "")
									}
									onClick={() => setShow([false, false, true, false])}
								>
									<Image src={heroProd} alt="" objectFit="cover" />
								</div>
								<div
									className={
										styles.img_choice + (show[3] ? " " + styles.selected : "")
									}
									onClick={() => setShow([false, false, false, true])}
								>
									<Image src={bestPlace} alt="" objectFit="cover" />
								</div>
							</div>
						</div>

						<div className={styles.text_wrapper}>
							<p className={styles.brand}>The Watch Company</p>
							<h1>Carlie Three-Hand White Leather Watch</h1>

							<p className={styles.desc}>
								Irure ea ullamco tempor pariatur incididunt. Est Lorem aliquip
								amet reprehenderit commodo commodo proident adipisicing. Fugiat
								do elit tempor qui sit adipisicing quis dolore aute enim sit non
								occaecat ipsum. Anim tempor velit consequat cupidatat non mollit
								deserunt. Non proident aute nulla enim laboris.
							</p>

							<div className={styles.cost}>
								<p>
									$125.00 <span>SALE</span>
								</p>
								<p>$250.00</p>
							</div>
							<div className={styles.link_wrapper}>
								{cart > 0 ? (
									<div className={styles.cart_counter}>
										<button
											onClick={() => {
												cart === 0 ? setCart(0) : setCart(cart - 1);
											}}
										>
											<RemoveIcon />
										</button>
										<span>{cart}</span>
										<button onClick={() => setCart(cart + 1)}>
											<AddIcon />
										</button>
									</div>
								) : (
									<button
										className={styles.add_to_cart}
										onClick={() => handleCartAmount()}
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
