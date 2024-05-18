import React from "react";
import Logo from "../../public/images/logo.svg";

const FullScreenLogoLoader = () => {
	return (
		<div className="full-screen-loader">
			<div className="container">
				<div className="img">
					<Logo />
				</div>
			</div>
		</div>
	);
};

export default FullScreenLogoLoader;
