import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { Typography, useTheme, Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

interface LinkProps extends Pick<MuiLinkProps, "sx"> {
	isInternal: boolean;
	text: string;
	link: string;
	[key: string]: any;
}

export const Link = ({ isInternal, link, text, ...rest }: LinkProps) => {
	const theme = useTheme();
	if (isInternal) {
		// return <GatsbyLink to={link} {...rest}>{text}</GatsbyLink>
		return <MuiLink {...rest} component={GatsbyLink} to={link} >{text}</MuiLink>
	}
	return (<MuiLink {...rest} href={link} target="__blank" rel="noopener">
		{text}
	</MuiLink>)
}