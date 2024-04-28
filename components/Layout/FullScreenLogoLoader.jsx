import React from "react";
import Logo from "../../public/logoMain.svg";

const FullScreenLogoLoader = () => {
	return (
		<div className="full-screen-loader">
			<div className="container">
				<div className="img">
					<Logo />
				</div>
				<p>Please wait...</p>
			</div>
		</div>
	);
};

export default FullScreenLogoLoader;
