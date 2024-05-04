import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/auth.module.scss";
import Logo from "../public/logoMain.svg";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import FullScreenLogoLoader from "../components/Layout/FullScreenLogoLoader";
import { useRouter } from "next/router";

const SignUp = () => {
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
						<p>Create your e-choke account</p>
					</div>
					<div className={styles.form_div}>
						<form>
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
								Have an account? <Link href="/login">Login</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SignUp;
