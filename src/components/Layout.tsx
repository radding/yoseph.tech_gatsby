import { CssBaseline, Box } from "@mui/material";
import React from "react";
import { Navigation, NavigationProps } from "./layout/navigation";
import { Footer } from "./layout/Footer";

export const Layout = (props: React.PropsWithChildren<NavigationProps>) => {
    return (
        <>
            <CssBaseline />
			<Navigation currentPath={props.currentPath}/>
			<Box sx={{
				minHeight: theme => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
				marginTop: theme => ({
					xs: `calc(1rem + ${theme.mixins.toolbar.minHeight}px)`,
					md: 0,
				}),
				marginBottom: theme => theme.spacing(12),
			}}>
				{props.children}
			</Box>
            <Footer />
        </>
    )
}