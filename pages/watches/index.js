import { Search } from "@mui/icons-material";
import Layout from "../../components/Layout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import styles from "../../styles/watches.module.scss";
import { useState } from "react";
import Image from "next/image";
import heroProd from "../../public/images/products/hero-prod.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Watches = () => {
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
		setCart(1);
	};
	return (
		<Layout>
			<div className={styles.watches_container}>
				<div className={styles.watches_wrapper}>
					<div className={styles.search_container}>
						<div className={styles.search_wrapper}>
							<input type="text" placeholder="Search for watches" />
							<div>
								<button>
									<Search />
								</button>
							</div>
						</div>
					</div>
					<div className={styles.sort_container}>
						<p className={styles.results}>Showing 85 products</p>
						<div className={styles.sort_wrapper}>
							<div
								className={styles.trigger}
								onClick={() => setOpenSort(!openSort)}
							>
								Sort by: Price(Low to High) <KeyboardArrowDownIcon />
							</div>
							{openSort ? (
								<div className={styles.dropdown}>
									<p>Newest Arrivals</p>
									<p className={styles.selected}>Price(Low to High)</p>
									<p>Price(High to Low)</p>
								</div>
							) : (
								""
							)}
						</div>
					</div>
					<div className={styles.products_container}>
						<div className={styles.filter_wrapper}>
							<div className={styles.filter}>
								<p className={styles.title}>Type</p>
								<div className={styles.contents}>
									<div className={styles.content}>
										<input
											type="checkbox"
											className="checkbox"
											id={`checkbox${1}`}
											onClick={() => handleTypeClick(1)}
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
											onClick={() => handleTypeClick(2)}
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
											onClick={() => handleTypeClick(3)}
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
											id={`checkbox${1}`}
											onClick={() => handleTypeClick(1)}
										/>{" "}
										<label className="checkboxLabel" htmlFor={`checkbox${1}`}>
											Below 100
										</label>
									</div>
									<div className={styles.content}>
										<input
											type="checkbox"
											className="checkbox"
											id={`checkbox${2}`}
											onClick={() => handleTypeClick(2)}
										/>{" "}
										<label className="checkboxLabel" htmlFor={`checkbox${2}`}>
											100 to 200
										</label>
									</div>
									<div className={styles.content}>
										<input
											type="checkbox"
											className="checkbox"
											id={`checkbox${3}`}
											onClick={() => handleTypeClick(3)}
										/>{" "}
										<label className="checkboxLabel" htmlFor={`checkbox${3}`}>
											Above 200
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.products_wrapper}>
							<Card
								cart={cart}
								setCart={setCart}
								handleCartAmount={handleCartAmount}
							/>
							<Card
								cart={cart}
								setCart={setCart}
								handleCartAmount={handleCartAmount}
								sale
								newItem
							/>
							<Card
								cart={cart}
								setCart={setCart}
								handleCartAmount={handleCartAmount}
								sale
							/>
							<Card
								cart={cart}
								setCart={setCart}
								handleCartAmount={handleCartAmount}
							/>
							<Card
								cart={cart}
								setCart={setCart}
								handleCartAmount={handleCartAmount}
							/>
							<Card
								cart={cart}
								setCart={setCart}
								handleCartAmount={handleCartAmount}
							/>
							<Card
								cart={cart}
								setCart={setCart}
								handleCartAmount={handleCartAmount}
							/>
						</div>
					</div>
					<div className={styles.pagination_wrapper}>
						<div className={styles.icon}>
							<Link href="/watches" passHref>
								<a>
									<ChevronLeftIcon />
								</a>
							</Link>
						</div>
						<div className={styles.contents}>
							<Link href="/" passHref>
								<a className={styles.active}>1</a>
							</Link>
							<Link href="/" passHref>
								<a>2</a>
							</Link>{" "}
							<Link href="/" passHref>
								<a>3</a>
							</Link>{" "}
							<div>...</div>
							<Link href="/" passHref>
								<a>4</a>
							</Link>
						</div>
						<div className={styles.icon}>
							<Link href="/watches" passHref>
								<a>
									<ChevronRightIcon />
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Watches;

const Card = ({ cart, setCart, handleCartAmount, newItem, sale }) => {
	return (
		<div className={styles.card}>
			<div className={styles.utility_wrapper}>
				{newItem ? <div className={styles.new}>NEW</div> : ""}
				{sale ? <div className={styles.sale}>SALE</div> : ""}
			</div>
			<div className={styles.img_wrapper}>
				<Link href="/watches/a_beautiful_watch" passHref>
					<a>
						<Image src={heroProd} alt="" />
					</a>
				</Link>
			</div>
			<h3>Carlie Three-Hand White Leather Watch</h3>
			<p className={styles.price}>{sale ? <span>$6,000</span> : ""}$4,000</p>
			<div className={styles.link_wrapper}>
				{cart === 0 ? (
					<button
						className={styles.add_to_cart}
						onClick={() => handleCartAmount()}
					>
						Add to Cart
					</button>
				) : (
					<div className={styles.cart_counter}>
						<button onClick={() => setCart(cart - 1)}>
							<RemoveIcon />
						</button>
						<span>{cart}</span>
						<button onClick={() => setCart(cart + 1)}>
							<AddIcon />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
