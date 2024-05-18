import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>àgò - E-commerce watch store</title>
				<meta
					name="description"
					content="A full stack ecommerce watch store. Created by Afolarin Oyeleke"
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
