import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";

import heroProd from "../public/images/products/hero-prod.png";
import showcase1 from "../public/images/products/showcase-06.png";
import showcase2 from "../public/images/products/showcase-07.png";
import showcase3 from "../public/images/products/showcase-08.png";
import twoWatches from "../public/images/products/two-watches.png";
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
							<h1>Machine Three-Hand Date Brown Leather Watch</h1>
							<p className={styles.main_desc}>
								Minim magna id officia cillum. Irure dolor aliquip non qui velit
								ad officia. Amet irure minim cupidatat sint ut pariatur aute
								dolor adipisicing labore ea reprehenderit eu nostrud.
							</p>
							<Link href="/" passHref>
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
								<p>Watches</p>
								<Link href="/" passHref>
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
								<p>SUN GLASSES</p>
								<Link href="/" passHref>
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
								<p>SHOES</p>
								<Link href="/" passHref>
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
							<h3>Black Silver Luxury Watch</h3>
							<p>
								Minim magna id officia cillum. Irure dolor aliquip non qui velit
								ad officia. Amet irure minim cupidatat sint ut pariatur aute
								dolor adipisicing labore ea reprehenderit eu nostrud
							</p>
							<Link href="/" passHref>
								<a>See product</a>
							</Link>
						</div>
					</div>
					<div className={styles.first_showcase}>
						<div className={styles.text_wrapper}>
							<h3>New Products</h3>
							<p>Check out our large catalog of luxury watches.</p>
							<Link href="/" passHref>
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
							<h3>Black Silver Luxury Watch</h3>
							<Link href="/" passHref>
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
								Irure Lorem sint magna mollit aliqua do aliqua do dolore nulla.
								Ea duis aute elit irure ut sunt fugiat ullamco. Voluptate quis
								est sit deserunt excepteur. Commodo esse tempor tempor velit
								cillum ea anim ex. Pariatur nostrud in minim tempor fugiat et
								incididunt incididunt. Et consequat ipsum est esse enim. Dolor
								aliquip cillum esse laboris exercitation Lorem amet nulla amet
								voluptate sit officia. Nisi cillum commodo minim occaecat in
								dolore voluptate do sint pariatur nulla. Et mollit minim
								proident Lorem.
							</p>
							<Link href="/" passHref>
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
