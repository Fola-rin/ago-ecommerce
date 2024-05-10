import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";

import heroProd from "../public/images/products/Leather1/1.png";
import showcase1 from "../public/images/products/showcase-06.png";
import showcase2 from "../public/images/products/showcase-07.png";
import showcase3 from "../public/images/products/showcase-08.png";
import twoWatches from "../public/images/products/Silver1/1.png";
import thirdShowcase from "../public/images/products/third_showcase.jpg";
import bestPlace from "../public/images/products/best-place.jpg";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import styles from "../styles/home.module.scss";

export default function Home() {
	return (
		<Layout>
			<div className={styles.home_container}>
				<div className={styles.hero_section}>
					<div
						className={styles.hero_section_wrapper}
						style={{ backgroundImage: `url(${"images/bg-01.svg"})` }}
					>
						<div className={styles.text_wrapper}>
							<p className={styles.sub_heading}>New Product</p>
							<h1>Hector Alcazar Premium Leather Watch</h1>
							<p className={styles.main_desc}>
								I believe a watch can be more helpful than you think. It can
								lift your style and probably your life to a whole new level. So
								if you have not done it yet, WHY NOT START WEARING A WATCH
								TODAY?
							</p>
							<Link
								href="/watches/hector-alcazar-premium-leather-watch"
								passHref
							>
								<a>See Product</a>
							</Link>
						</div>
						<div className={styles.img_wrapper}>
							<div>
								<Image src={heroProd} alt="" />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.categories_section}>
					<div className={styles.wrapper}>
						<div className={styles.card}>
							<div className={styles.img_wrapper}>
								<Image
									src={showcase1}
									alt=""
									height="100%"
									objectFit="contain"
								/>
							</div>
							<div className={styles.text_wrapper}>
								<p>LEATHER</p>
								<Link href='/watches?filterCat=["Leather"]' passHref>
									<a>
										<span>SHOP</span>
										<span className={styles.card_icon}>
											<ChevronRightIcon />
										</span>
									</a>
								</Link>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.img_wrapper}>
								<Image
									src={showcase2}
									alt=""
									height="100%"
									objectFit="contain"
								/>
							</div>
							<div className={styles.text_wrapper}>
								<p>SILVER</p>
								<Link href='/watches?filterCat=["Silver"]' passHref>
									<a>
										<span>SHOP</span>
										<span className={styles.card_icon}>
											<ChevronRightIcon />
										</span>
									</a>
								</Link>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.img_wrapper}>
								<Image
									src={showcase3}
									alt=""
									height="100%"
									objectFit="contain"
								/>
							</div>
							<div className={styles.text_wrapper}>
								<p>GOLD</p>
								<Link href='/watches?filterCat=["Gold"]' passHref>
									<a>
										<span>SHOP</span>
										<span className={styles.card_icon}>
											<ChevronRightIcon />
										</span>
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.showcase_section}>
					<div className={styles.second_showcase}>
						<div
							className={styles.img_wrapper}
							style={{ backgroundImage: `url(${"images/bg-black.svg"})` }}
						>
							<div>
								<Image src={twoWatches} alt="two watches" />
							</div>
						</div>

						<div className={styles.text_wrapper}>
							<h3>The Lure of Adventure Silver Watch</h3>
							<p>
								The Lure of Adventure Silver Watch is a stylish and functional
								timepiece for adventurous individuals. With a durable silver
								design, it is suitable for outdoor exploration and taking on new
								challenges.
							</p>
							<Link href="/watches/the-lure-of-adventure-silver-watch" passHref>
								<a>See product</a>
							</Link>
						</div>
					</div>
					<div className={styles.first_showcase}>
						<div className={styles.text_wrapper}>
							<h3>New Products</h3>
							<p>Check out our large catalog of luxury watches.</p>
							<Link href="/watches" passHref>
								<a>Shop now</a>
							</Link>
						</div>
						<div className={styles.video_wrapper}>
							<video loop autoPlay muted>
								<source src="/video.mp4" type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						</div>
					</div>
					<div className={styles.third_showcase}>
						<div className={styles.img_wrapper}>
							<div>
								<Image
									src={thirdShowcase}
									alt="two watches"
									objectFit="cover"
									objectPosition="center"
								/>
							</div>
						</div>

						<div className={styles.text_wrapper}>
							<h3>Broken Paradise Silver Watch</h3>
							<Link href="/watches/broken-paradise-silver-watch" passHref>
								<a>See product</a>
							</Link>
						</div>
					</div>
					<div className={styles.fourth_showcase}>
						<div className={styles.text_wrapper}>
							<h3>
								The <span>best</span> place to shop for watches
							</h3>
							<p>
								Watches have become more than just a time-telling device, they
								have become a fashion statement and an extension of one&apos;s
								personal style. With so many styles, brands, and features to
								choose from, finding the perfect watch can be a challenging
								task. The right place to purchase a watch can make all the
								difference in the quality of the product you receive and the
								overall shopping experience. One of the best places to shop for
								a watch is <b>e-choke</b>.
							</p>
							<Link href="/watches" passHref>
								<a>Shop Now</a>
							</Link>
						</div>
						<div className={styles.img_wrapper}>
							<div>
								<Image
									src={bestPlace}
									alt="best place to buy watches"
									objectFit="cover"
									objectPosition="center"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
