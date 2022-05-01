import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>e-choke</title>
				<meta
					name="description"
					content="An ecommerce web app created by Oyeleke Afolarin"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
