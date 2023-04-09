import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export const FullLogo = () => {
	return (<StaticImage
		src="../../images/logo.png"
		alt="Yoseph.tech logo"
		placeholder="blurred"
		layout="fixed"
		width={200}
	/>)
};
