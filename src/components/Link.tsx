import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

interface LinkProps extends Pick<MuiLinkProps, "sx"> {
	isInternal: boolean | null;
	link: string | null;
	altText?: string;
	[key: string]: any;
}

export const Link = ({ isInternal, link, ...rest }: LinkProps & Required<React.PropsWithChildren>) => {
	if (isInternal) {
		return <MuiLink 
			{...rest}
			component={GatsbyLink}
			to={link!}
			title={rest.altText}
			aria-label={rest.altText}
		>
				{rest.children}
			</MuiLink>
	}
	return (<MuiLink {...rest} href={link!} target="__blank" rel="noopener" title={rest.altText} aria-label={rest.altText}>
		{rest.children}
	</MuiLink>)
}