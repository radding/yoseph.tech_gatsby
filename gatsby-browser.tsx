import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, createTheme } from "@mui/material";
import { Navigation } from "./src/components/layout/navigation";

const theme = createTheme({
	spacing: (factor: number) => `${0.25 * factor}rem`, // (Bootstrap strategy)
});

export const wrapRootElement = ({ element }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Navigation />
			<Box sx={{
				minHeight: theme => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
				marginTop: theme => ({
					xs: `calc(1rem + ${theme.mixins.toolbar.minHeight}px)`,
					md: 0,
				})
			}}>
				{element}
			</Box>
		</ThemeProvider>
	);
}