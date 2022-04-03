import { LinkedIn, Twitter } from "@mui/icons-material";
import Link from "next/link";
import Logo from "../../public/images/logo.svg";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
	return (
		<>
			<div className="footer">
				<div className="info">
					<div className="logo-wrapper">
						<Link href="/" passHref>
							<a>
								<Logo />
							</a>
						</Link>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
					<div className="socials">
						<div className="link">
							<Link
								href="https://folarin.netlify.app/"
								target="_blank"
								rel="noreferrer"
							>
								<a>
									<LanguageIcon />
								</a>
							</Link>
						</div>

						<div className="link">
							<Link
								href="https://github.com/Fola-rin"
								target="_blank"
								rel="noreferrer"
							>
								<a>
									<GitHubIcon />
								</a>
							</Link>
						</div>
						<div className="link">
							<Link
								href="https://www.linkedin.com/in/afolarin-oyeleke/"
								target="_blank"
								rel="noreferrer"
							>
								<a>
									<LinkedIn />
								</a>
							</Link>
						</div>
						<div className="link">
							<Link
								href="https://twitter.com/fola_leke"
								target="_blank"
								rel="noreferrer"
							>
								<a>
									<Twitter />
								</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="page-links">
					<div className="wrapper">
						<p>
							<b>Products</b>
						</p>
						<div className="links">
							<div className="link">
								<Link href="/">Watches</Link>
							</div>
							<div className="link">
								<Link href="/">Sun Glasses</Link>
							</div>
							<div className="link">
								<Link href="/">Shoes</Link>
							</div>
						</div>
					</div>

					<div className="wrapper">
						<p>
							<b>Contact</b>
						</p>
						<div className="links">
							<div className="link">
								<Link href="mailto:oyelekefolarin@gmail.com" passHref>
									<a> Get in touch</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
