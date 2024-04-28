import Link from "next/link";
import Logo from "../../public/images/logo.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { signIn, signOut, useSession } from "next-auth/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Header = () => {
	const { data: session, status } = useSession();
	const cartData = useSelector((state) => state.cart);
	const [profileOptions, setProfileOptions] = useState(false);

	const getTotalQuantity = () => {
		let total = 0;
		cartData.forEach((item) => {
			total += item.quantity;
		});
		return total;
	};

	return (
		<header className="header">
			<div className="header-wrapper">
				<div className="logo-wrapper">
					<Link href="/" passHref>
						<a>
							<Logo />
						</a>
					</Link>
				</div>
				<div className="nav-links">
					<div className="nav-link">
						<Link href="/" className="transition">
							Home
						</Link>
					</div>
					<div className="nav-link">
						<Link href="/watches" className="transition">
							Watches
						</Link>
					</div>
					<div className="nav-link">
						<Link href="/under-construction" className="transition">
							Sun glasses
						</Link>
					</div>
					<div className="nav-link">
						<Link href="/under-construction" className="transition">
							Shoes
						</Link>
					</div>
				</div>
				<div className="nav-cta">
					{!session && status !== "authenticated" ? (
						<div className="link">
							<Link className="login transition" href="/login">
								Login
							</Link>
						</div>
					) : (
						<div className="profile-dropdown">
							<button
								className="profile-trigger"
								onClick={() => setProfileOptions(!profileOptions)}
							>
								<img src={session.user.image} alt={session.user.name} />
								<KeyboardArrowDownIcon />
							</button>
							{profileOptions && (
								<div className="profile-contents">
									<p>Hi, {session.user.name.split(" ")[0]}</p>
									<Link href="/api/auth/signout">
										<a
											className={"signout"}
											onClick={(e) => {
												e.preventDefault();
												signOut("google");
											}}
										>
											Sign Out
										</a>
									</Link>
								</div>
							)}
						</div>
					)}
					<div className="link cart-icon">
						<Link href="/cart" passHref>
							<a>
								<ShoppingCartIcon />
								<span>{getTotalQuantity() || 0}</span>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
