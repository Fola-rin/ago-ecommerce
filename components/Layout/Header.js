import Link from "next/link";
import Logo from "../../public/images/logo.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
	return (
		<div className="header">
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
					<Link href="/" className="transition">
						Watches
					</Link>
				</div>
				<div className="nav-link">
					<Link href="/" className="transition">
						Sun glasses
					</Link>
				</div>
				<div className="nav-link">
					<Link href="/" className="transition">
						Shoes
					</Link>
				</div>
			</div>
			<div className="nav-cta">
				<div className="link">
					<Link className="login transition" href="/">
						Login
					</Link>
				</div>
				<div className="link cart-icon">
					<Link href="/" passHref>
						<a>
							<ShoppingCartIcon />
							<span>2</span>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
