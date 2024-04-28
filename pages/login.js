import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import styles from "../styles/auth.module.scss";
import Logo from "../public/logoMain.svg";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { signIn, signOut, getSession, useSession } from "next-auth/react";
import FullScreenLogoLoader from "../components/Layout/FullScreenLogoLoader";
import { useRouter } from "next/router";

const LoginPage = () => {
	const [loading, setLoading] = useState(true);
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "loading") {
		} else if (status === "authenticated") {
			router.push("/");
		} else {
			setLoading(false);
		}
	}, [status]);
	return loading ? (
		<FullScreenLogoLoader />
	) : (
		<Layout>
			<div className={styles.auth_container}>
				<div className={styles.auth_wrapper}>
					<div className={styles.logo}>
						<Logo />
					</div>
					<div className={styles.title}>
						<h1>Welcome!</h1>
						<p>Log in to your e-choke account</p>
					</div>
					<div className={styles.form_div}>
						<form>
							{/* <div className={styles.email_login}>
								<div>
									<label>Email</label>
									<input
										placeholder="Enter your email"
										type="email"
										name="email"
									/>
								</div>
								<div>
									<label>Password</label>
									<input
										placeholder="Enter your Password"
										type="password"
										name="password"
									/>
								</div>
							</div>
							<button onClick={() => {}}>Continue</button> */}
							<Link href="/api/auth/signin">
								<a
									className={styles.google}
									onClick={(e) => {
										e.preventDefault();
										signIn("google");
									}}
								>
									<GoogleIcon />
									Continue with Google
								</a>
							</Link>
							<p>
								Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
							</p>
						</form>
						{/* <div className={styles.divider}>
							<hr />
							<span>or</span>
						</div> */}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default LoginPage;
